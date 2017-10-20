"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
/**
 * router loading
 */
const server_router_1 = require("./apps/spa/server_router");
const router_1 = require("./apps/api/tasks/router");
const router_2 = require("./apps/api/users/router");
/**
 * main
 */
class main {
    constructor() {
        this.ready = () => __awaiter(this, void 0, void 0, function* () {
            return this.app;
        });
        this.create = () => {
            return this.app;
        };
        this.router = (app) => {
            app.use("/api/tasks", new router_1.router("/api/tasks"));
            app.use("/api/users", new router_2.router("/api/users"));
            app.use("/", new server_router_1.router("/"));
        };
        this.overrideForm = (req, res) => {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                // look in urlencoded POST bodies and delete it
                var method = req.body._method;
                delete req.body._method;
                return method;
            }
        };
        this.app = express();
        let app = this.app;
        app.use(session(this.session));
        app.use(passport.initialize());
        app.use(passport.session());
        app.set("views", this.views);
        app.set("view engine", this.view_engine);
        // uncomment after placing your favicon in /public
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(express.static(this.webroot));
        app.use(methodOverride('X-HTTP-Method-Override'));
        app.use(methodOverride(this.overrideForm));
        this.router(app);
        this.status404(app);
        this.errorHandler(app);
    }
    get webroot() {
        return path.join(__dirname, 'apps', "public");
    }
    get views() {
        return path.join(__dirname, "apps", 'views');
    }
    get view_engine() {
        return "ejs";
    }
    get session() {
        return {
            secret: 'u59y7hfv8szg0e6t0rf35fr40gva7gzvdtf6',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 30 * 60 * 1000
            }
        };
    }
    get baseViews() {
        return path.join(__dirname, "apps", "views");
    }
    status404(app) {
        app.use((req, res, next) => {
            var err = new Error('Not Found');
            err["status"] = 404;
            next(err);
        });
    }
    errorHandler(app) {
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
}
exports.main = main;
