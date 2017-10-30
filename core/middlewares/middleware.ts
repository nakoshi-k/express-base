import ee from "../interfaces/express_extends"

export abstract class middleware{

    protected abstract mw : (req:ee.request,res:ee.response,next:ee.next) => void;

    public abstract create = () => {
        return this.mw;
    } 

}