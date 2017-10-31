import * as e from "express"

export interface request extends e.Request{
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

export interface response extends e.Response{

}

export interface next extends e.NextFunction{

}

export interface router extends e.Router{
    
}