"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("./router_base");
class tasks extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.rname = "tasks";
        this.search = (req, res, next) => {
            this.setData({ "title": "search" });
            this.render(req, res, "index");
        };
        this.add = (req, res, next) => {
            //スキーマを取得してセットする。
            this.setData({ "task": { title: "title", priod: "2016-10-18" } });
            if (this.isPost(req)) {
                this.models.tasks.build(req.body);
                this.setData({ "task": req.body });
            }
            this.render(req, res, "add");
        };
        this.edit = (req, res, next) => {
        };
        this.test = (req, res, next) => {
            this.send(res, req, 'data is being processed');
        };
        this.delete = (req, res, next) => {
        };
        this.beforeRender = (req, res) => {
            this.loadHelper("form");
            this.csrfReady(req);
        };
        this.bind = () => {
            let router = this.router;
            let csrfProtection = this.csrfProtection;
            let parseForm = this.parseForm;
            router.get("/", csrfProtection, this.search);
            router.get("/add", csrfProtection, this.add);
            router.post("/add", parseForm, csrfProtection, this.add);
        };
    }
}
exports.tasks = tasks;
exports.router = new tasks().create();
