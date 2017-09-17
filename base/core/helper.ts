import {app_error} from "../core/app_error";
interface helper_interface{
    loading ():Promise<any>;
}
export abstract class helper implements helper_interface {

    public loading : () => Promise<any> = () => {
        return Promise.resolve();
    }

}