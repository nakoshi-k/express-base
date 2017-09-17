"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var core_1 = require("../core");
var ejs = require("ejs");
var fs = require("fs");
var cell_helper = /** @class */ (function (_super) {
    __extends(cell_helper, _super);
    function cell_helper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._templates = {};
        _this._vars = {};
        _this.read = function (name, path) {
            return new Promise(function (resolve, reject) {
                var filePath = path;
                if (path.charAt(0) !== "/" && path.charAt(0) !== "\\") {
                    var ds = core_1.system.ds;
                    filePath = __dirname + ds + ".." + ds + "views" + ds + "tile" + ds + path + ".ejs";
                    console.log(filePath);
                }
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        resolve({ path: filePath, status: false });
                        return;
                    }
                    _this._templates[name]["entity"] = data;
                    resolve({ path: filePath, status: true });
                });
            });
        };
        _this.ready = function () {
            var all = [];
            var templates = _this._templates;
            Object.keys(templates).forEach(function (key) {
                all.push(_this.read(key, templates[key].path));
            });
            return Promise.all(all);
        };
        _this.render = function (name, vars) {
            if (name === void 0) { name = ""; }
            if (vars === void 0) { vars = {}; }
            if (name === "") {
                return "";
            }
            var templateEntity = _this._templates[name].entity;
            if (typeof templateEntity === "undefined") {
                return "";
            }
            return ejs.render(templateEntity, vars);
        };
        return _this;
    }
    Object.defineProperty(cell_helper.prototype, "templates", {
        get: function () {
            return this._templates;
        },
        set: function (paths) {
            this._templates = paths;
        },
        enumerable: true,
        configurable: true
    });
    cell_helper.prototype.add = function (name, path) {
        if (path === void 0) { path = ""; }
        this._templates[name] = { path: path };
        if (path === "") {
            this._templates[name] = { path: name };
        }
    };
    return cell_helper;
}(core_1.helper));
exports.cell_helper = cell_helper;
