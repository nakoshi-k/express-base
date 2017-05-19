

export class router_base{
    private router:express.router;
    
    constructor(){
        let express = require('express');
        let router = express.Router();
        let path = require("path");
        this.path = path;
        this.router = router;
    }
    protected bind(){
        let router = this.router;
    }

    public create = () => {
        this.bind(); 
        return this.router;
    }

    public render( res , view = "index",vars = {}){
        let f = view.substring(1,1);
        let sep = this.path.sep;
        if(f !== "." && f !== "/" ){
            //完全なファイルパスが指定されていない場合はname をディレクトリフォルダとする
            view = this.name + sep + view;
        }
        console.log(view);
        res.render( view ,{vars});
    } 

    public get = (rute : string , func) => {
        this.router.get(rute,func)
    }

    public post = (rute : string , func) => {
        this.router.post(rute,func)
    }

}

