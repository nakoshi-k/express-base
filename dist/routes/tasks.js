"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_base_1 = require("./router_base");
class tasks extends router_base_1.router_base {
    constructor() {
        super(...arguments);
        this.name = "tasks";
        this.search = (req, res, next) => {
            this.render(res, "index", { "title": "tanaka" });
        };
        this.add = (req, res, next) => {
            //dbからスキーマを取得してセットする。
            this.setData({ "task": { "title": "title" } });
            if (!this.isPost(req)) {
                this.setData({ "task": req.body });
            }
            this.csrf(req);
            this.render(res, "add");
        };
        this.edit = (req, res, next) => {
        };
        this.test = (req, res, next) => {
            this.send(res, 'data is being processed');
        };
        this.delete = (req, res, next) => {
        };
        this.bind = () => {
            let router = this.router;
            let csrfProtection = this.csrfProtection;
            let parseForm = this.parseForm;
            router.get("/", this.search);
            router.get("/add", csrfProtection, this.add);
            router.post("/add", parseForm, csrfProtection, this.add);
        };
    }
}
module.exports = new tasks().create();
