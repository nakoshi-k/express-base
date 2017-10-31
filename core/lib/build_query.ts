export class build_query{

    public http(query){
        let prts = query;
        if(prts.length === 0){
            return "";
        }
        let q :string = "";
        Object.keys(prts).forEach(function(key) {
            if(!prts[key]){
                return
            }
            q += `&${encodeURIComponent(key)}=${encodeURIComponent(prts[key])}`;
          });
        return q.replace("&","?");
    }


}