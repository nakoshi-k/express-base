import {middleware} from "./middleware"
import ee from "../interfaces/express_extends"

export class search extends middleware{
    
    protected mw : (req:ee.request,res : ee.response,next : ee.next) => void = (req,res,next) => {

    }

    create = () => {
        return this.mw
    }
}