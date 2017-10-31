import ee from "../../core/interfaces/express_extends"

let rbac_config = {
    "/api/tasks" : [
        { type : "get", route : "/" , permission : ["*"] } ,
        { type : "get", route : "/page/:page" , permission : ["*"] } ,
        { type : "get", route : "/:id", permission : ["*"] } ,
        { type : "post", route : "/", permission : ["*"] } ,
        { type : "put", route : "/:id", permission : ["*"] } ,
        { type : "delete", route : "/:id", permission : ["*"] } 
    ],
    "/api/users" : [
        { type : "get", route : "/" , permission : ["*"] } ,
        { type : "get", route : "/page/:page" , permission : ["*"] } ,
        { type : "get", route : "/:id", permission : ["*"] } ,
        { type : "post", route : "/", permission : ["*"] } ,
        { type : "put", route : "/:id", permission : ["*"] } ,
        { type : "delete", route : "/:id", permission : ["*"] } 
    ]
}

interface rbac_mount{
    type:string
    route:string
    permission : string[]
}

export class rbac {
    private _default_access : string = "allow"
    private _role_field = "group_id"

    get role_field(){
        return this._role_field
    }
    
    set role_field(field_name:string){
        this._role_field = field_name
    }

    set default_access(setting : string){
        if(setting === "allow"){
            this._default_access = "allow"
        }
        this._default_access = "deny"
    }

    get default(){
        if(this._default_access === "allow" ){
            return ["*"]
        }
        return ["-"]
    }

    private get_permission : (rbac,mount,route,method) => string[] = ( rbac : { [prop:string] : rbac_mount[] }, mount ,route , method ) => {
        if(!rbac){
            return this.default;
        }
        if(!rbac[mount]){
            return this.default;
        }
        let result = rbac[mount].filter(function(value:rbac_mount,index){
            return (value.type === method) && (value.route === route)
        })
        if(result.length === 0){
            return this.default;
        }
        return result.pop().permission;
    }

    private get_user_level = (req : ee.request ) => {
        if(!req.user){
            return "gest"
        }
        return req.user[this.role_field]
    }

    private check_permission = ( permission : string[] , user_level : string) => {
        if(permission.length === 1){
            if( permission[0] === "*"){
                return true;
            }
            if(permission[0] === "-"){
                return false
            }
        }
        if(permission.indexOf(user_level) > -1 ){
            return true
        }
        return false;
    }

    public mw = (req : ee.request,res : ee.response,next : ee.next) => {
        let mount  = req.baseUrl
        let route = req.route.path
        let method = req.method.toLowerCase()
        let permission = this.get_permission( rbac_config , mount , route , method)        
        let user_level = this.get_user_level(req);
        if(!this.check_permission(permission,user_level)){
            let err = new Error("Permission deny")
            next(err)
            return
        }
        next()
    }

    public create(){
        return this.mw;
    }

}