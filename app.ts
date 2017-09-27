import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as methodOverride from 'method-override';

/**
 * router loading
 */
import { router as tasks_router} from "./apps/tasks/router";
import {users_router} from "./apps/users/users_router";

/**
 * main
 */
export class main{
  
  private app:express.Application;
    
  get webroot() {
    return path.join(__dirname, 'apps' , "public");
  }

  get views() {
    return  path.join(__dirname , "apps" ,  'views');
  }

  get view_engine () {
    return "ejs";
  }

  get session () {
    return {
      secret: 'u59y7hfv8szg0e6t0rf35fr40gva7gzvdtf6',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 1000
      }
    }
  }
 
  get baseViews(){
    return path.join(__dirname , "apps" , "views");
  }
  
  ready = async () => {
    return this.app;
  }
  
  create = () => {
    return this.app;
  }

  constructor () {
    this.app = express();  
    let app = this.app;
    app.use( session(this.session));
    app.set("views",this.views);    
    app.set("view engine",this.view_engine);
    // uncomment after placing your favicon in /public
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(cookieParser());
    app.use(express.static( this.webroot ));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(methodOverride(this.overrideForm));
    this.router(app);
    this.status404(app); 
    this.errorHandler(app);
  }
  
  private router = (app) => {
    app.use("/tasks" , new tasks_router() );
    app.use("/users" , new users_router().create() );
  }
  
  private status404(app:express.Application){
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err["status"] = 404;
      next(err);
    });
  }
  private errorHandler(app:express.Application){
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
        res.app.set('views', this.baseViews);
        res.status = err.status || 500;
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
      res.app.set('views', this.baseViews);
      res.status = err.status || 500;
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

  } 
  
  private overrideForm = (req,res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
  }
}

