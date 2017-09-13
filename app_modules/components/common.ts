
class common_config{
        
    constructor () {
        let path = require("path");
        this._sep = path.sep;
    }
    private _sep = "";
    
    get sep () {
        return this._sep;
    }
    
}

export let config = new common_config();