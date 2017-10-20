import * as express from "express"
import * as path from "path"
import {router as app_router} from "../router"
import {service} from "./service"
import * as helpers  from "../../base/helper"
import {input_error} from "../../base/core"
import * as Vue from "vue"
import * as Router from "vue-router"
import * as Request from "request"
import * as serialize from "serialize-javascript"

Vue.use(Router)

import * as VueRender from "vue-server-renderer"
import {default as BundleServer}  from "../spa/bundle-server"

export class router extends app_router {
    public name = "users"
    public service:service
    
    constructor(mount){
        super(mount)
        this.mount = mount
        this.service = new service(this.name)
        return this.create()
    }
    
    protected beforeRender = (req,res) => {
        this.helper("form" ,new helpers.form())
        this.helper("pagination" , new helpers.pagination() )
        this.csrfReady(req)
    }


    private ssr(context){
        const renderer = VueRender.createRenderer()
        let server : any = BundleServer
        let ssr = (resolve,reject) => {
            server( context ).then( (app : Vue) => {
                let stateTag =`<script>window.__INITIAL_STATE__=${ serialize(app.$store.state, { isJSON: true }) }</script>` 
                renderer.renderToString( app , (err:any,html)  => {
                    console.log(err)
                    if (err) {
                        if (err.code === 404) {
                          reject(404)
                        } 
                       reject(500)
                       return
                    }
                    resolve( html + stateTag)
              })
            });
        }
        return new Promise(ssr)
    }

    private spa = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        const context = {
            url: `${this.mount}${req.url}`,
            server : {
                host : req.protocol + '://' + req.headers.host ,
                request : Request,
                service : this.service,
                mount : this.mount
            }
        }
        this.ssr(context).then(ssr => {
            let viewDir = path.resolve(__dirname + '/../views/spa')
            this.setData( {ssr : ssr} )
            this.render( req , res ,viewDir)
        }).catch(err => {
            console.log(err);
            if ( err.code == 404){
                res.status(404)
            }
            res.render('error', {
                message: err.code,
                error: {}
              })
        })
    }

    private search = (req : express.Request,res: express.Response, next : express.NextFunction) => {
        console.log(req["user"]["group_id"])
        if(!this.isXhr(req)){
            this.spa( req , res , next )
            return; 
        }

        let pagination = this.service.pagination()
        let conditions = this.service.conditions( req )
        let entities = pagination.find( conditions , req.query)
        let data = {}
        
        entities.then( (result : {rows : any, count :number,pagination:any}) => {
            data[this.entities_name] = result.rows
            data["page"] = result.pagination
            res.status(201)
            res.json(data)
        }).catch((error) => { 
            data[this.entities_name] = {}
            data["page"] = {}
            res.status(400)
            res.json(data)
        })
    }
   
    private entity = (req:express.Request,res:express.Response,next:express.NextFunction) => {
        
        if(!this.isXhr(req)){
            this.spa( req , res , next )
            return; 
        }

        let model = this.model
        let data = {}
        model.findById( req.params.id ).then((result) => {
            if(!result){
                throw Error
            }
            res.status(201)
            res.json(result)
        }).catch((err) => {
            data[this.entities_name] = {}
            res.status(401)
            res.json(data)
        })        
    }
   
    private delete = (req:express.Request,res:express.Response) => {
        let model = this.model
        model.findById( req.params.id ).then((result) => {
            if(result){
                result.destroy().then( () => {
                    res.status(204)
                    res.json( {} )
                }).catch(e => {
                   res.status(500)
                   res.json({})
                })
            }else{
                res.status(500)
                res.json({})
            }
        })
    }

    private insert = (req: express.Request,res:express.Response,next:express.NextFunction) => {

        if(!this.isXhr(req)){
            this.spa( req , res , next )
            return; 
        }

        let entity = this.model.build(req.body)
        entity.save().then( (result) => {
            res.status(201)
            res.json(entity.dataValues)
        }).catch((err) => {
            res.status(400)
            res.json(this.service.validationError(err))
        })
    }

    private update = (req:express.Request,res:express.Response,next:express.NextFunction) => {

        if(!this.isXhr(req)){
            this.spa( req , res , next )
            return; 
        }

        let model = this.model
        model.findById( req.params.id ).then((entity) => {
            entity.update(req.body).then( (result) => {
                res.status(201)
                res.json(result)
            }).catch((err) => {
                console.log(this.service.validationError(err));
                res.status(400)
                res.json(this.service.validationError(err))
            })
        }).catch((err) => {
            res.status(400)
            res.json(err)
        })
    }

    public login = ( req:express.Request,res:express.Response,next:express.NextFunction ) => {
        const passport = this.passport;
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err);}
            if (!user) { return next(err); }
            req["logIn"](user, (err) => {
                if (err) {return next(err)}
                if(!this.isXhr(req)){
                    return res.redirect('/users/')
                }
            });
        })(req, res, next);
    }

    public failedLoginAction = ( err ,req:express.Request,res:express.Response,next:express.NextFunction ) => {
        if(!this.isXhr(req)){
            res.redirect('/users/login');
        }
    }

    public logout = ( req:express.Request,res:express.Response,next:express.NextFunction ) => {
        req["logOut"]();
        if(!this.isXhr(req)){
            res.redirect('/users');
            this.spa( req , res , next )
            return; 
        }
    }


    public bind  = (router : express.Router) : express.Router => {
        let csrfProtection = this.csrfProtection
        let auth = this.isAuthenticated;
        let map = [ auth , csrfProtection ]
        router.get("/", csrfProtection , ...map , this.search)
        router.get("/page/:page", ...map , this.search)
        router.get("/login", csrfProtection ,this.spa);
        router.post("/login", csrfProtection , this.login , this.failedLoginAction);
        router.get("/logout", ...map , this.logout);
        router.get("/:id", ...map , this.entity)
        router.get("/*", ...map , this.spa)
        router.post("/",  ...map , this.insert)
        router.put("/:id",...map ,this.update)
        router.delete("/:id", ...map , this.delete)
        return router
    }

}
