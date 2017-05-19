import {router_base} from "./router_base";
class tasks extends router_base {
    public name = "tasks";

    public index = (req, res, next) => {
        this.render( res, "index" , {"title":"tanaka"});
    }

    protected bind = () => {
        this.get( "/" , this.index);
    }

}

module.exports  = new tasks().create();