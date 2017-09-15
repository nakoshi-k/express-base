import {app_error} from "../core/app_error";
interface helper_interface{
    load ():Promise<any>;
}
export abstract class helper implements helper_interface {

    public load : () => Promise<any> = () => {
        return Promise.resolve();
    }

}