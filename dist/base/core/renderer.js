"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class renderer {
    constructor() {
        this._name = "renderer";
        this._before = [(res, self) => Promise.resolve()];
        this.before_regist = (before) => {
            this._before.push(before);
        };
        this.set_vars = (data = {}) => {
            let locals = this._response.locals;
            Object.assign(locals, data);
        };
        this.async_before = async (res) => {
            let asyncBefore = this._before;
            for (let k in asyncBefore) {
                await asyncBefore[k](res, this);
            }
            return;
        };
        this._views = {
            common: "",
            typical: ""
        };
        this.view_dir = (view) => {
            let f = view.substring(0, 1);
            let ds = core_1.system.ds;
            if (f !== "." && f !== ds) {
                let dir = [this.views.typical, this.name, "views"].join(ds);
                this._response.app.set('views', dir);
                return view;
            }
            let sp = view.split(core_1.system.ds);
            let view_name = sp.pop();
            this._response.app.set('views', sp.join(core_1.system.ds));
            return view_name;
        };
        this.res_render = (view) => {
            let res = this._response;
            let resRender = (resolve, reject) => {
                res.render(view, (err, html) => {
                    if (!err) {
                        res.send(html);
                        return;
                    }
                    res.app.set('views', this.views.common);
                    res.status = err.status;
                    if (res.app.get('env') === 'development') {
                        res.render("error", { "message": err.message, "error": err });
                        return;
                    }
                    res.render("error", { "message": err.message, "error": {} });
                });
            };
            return new Promise(resRender);
        };
        this.render = (view) => {
            let res = this._response;
            let v = this.view_dir(view);
            let before = this.async_before(res);
            before.then(r => this.res_render(v)).catch(e => {
                res.status(500);
                res.send({ error: e });
            });
        };
        this.json = (values = {}) => {
            let res = this._response;
            let before = this.async_before(res);
            before.then(r => {
                res.json(values);
            }).catch(e => {
                res.status(500);
                res.send({ error: e });
            });
        };
        this.status = (state) => {
            let res = this._response;
            res.status(state);
        };
        this.create = (res) => {
            this._response = res;
            return Object.assign({}, this);
        };
    }
    set name(name) {
        this.name = name;
    }
    get name() {
        return this._name;
    }
    get views() {
        return this._views;
    }
    set views(paths) {
        this._views.common = paths.common;
        this._views.typical = paths.typical;
    }
}
exports.renderer = renderer;
