export class resource{
    is_server(){
        if(typeof window === "undefined"){
            return true;
        }
        return false
    }
}