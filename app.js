"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");
/**
 * router loading
 */
var tasks_router_1 = require("./apps/tasks/tasks_router");
/**
 * main
 */
var main = /** @class */ (function () {
    function main() {
        var _this = this;
        this.ready = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.app];
            });
        }); };
        this.create = function () {
            return _this.app;
        };
        this.router = function (app) {
            app.use("/tasks", new tasks_router_1.tasks_router().create());
        };
        this.overrideForm = function (req, res) {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                // look in urlencoded POST bodies and delete it
                var method = req.body._method;
                delete req.body._method;
                return method;
            }
        };
        this.app = express();
        var app = this.app;
        app.use(session(this.session));
        app.set("views", this.views);
        app.set("view engine", this.view_engine);
        // uncomment after placing your favicon in /public
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(this.webroot));
        app.use(methodOverride('X-HTTP-Method-Override'));
        app.use(methodOverride(this.overrideForm));
        this.router(app);
        this.status404(app);
        this.errorHandler(app);
    }
    Object.defineProperty(main.prototype, "webroot", {
        get: function () {
            return path.join(__dirname, 'apps', "public");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(main.prototype, "views", {
        get: function () {
            return path.join(__dirname, "apps", 'views');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(main.prototype, "view_engine", {
        get: function () {
            return "ejs";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(main.prototype, "session", {
        get: function () {
            return {
                secret: 'u59y7hfv8szg0e6t0rf35fr40gva7gzvdtf6',
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 30 * 60 * 1000
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(main.prototype, "baseViews", {
        get: function () {
            return path.join(__dirname, "apps", "views");
        },
        enumerable: true,
        configurable: true
    });
    main.prototype.status404 = function (app) {
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err["status"] = 404;
            next(err);
        });
    };
    main.prototype.errorHandler = function (app) {
        var _this = this;
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.app.set('views', _this.baseViews);
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.app.set('views', _this.baseViews);
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    };
    return main;
}());
exports.main = main;
