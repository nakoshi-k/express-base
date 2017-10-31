import * as e from "express"

interface request extends e.Request{
    csrfToken : () => string,
    //isAuthenticated : () => void,
    logIn : (user,callback) => boolean
    logOut: () => void,
    user : {
        id : string,
        name : string,
        mail : string,
        last_login : string,
        toJSON : () => {[prop:string] : any}
    }
}

interface response extends e.Response{

}

interface next extends e.NextFunction{

}

export interface express_extend{
    res : response,
    req : request,
    next : next
}
