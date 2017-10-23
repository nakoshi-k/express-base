class route_parse{
    public parse(route){
        let params = route.params;
        let paramsStr = "";
        for(let key in params){
            paramsStr = `${key}/${params[key]}`
        }
        return paramsStr;
    }
}

export default new route_parse();