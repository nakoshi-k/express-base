
import * as sequelize from "sequelize";
export class pagination{
    
    private model:sequelize.Model<any,any>;
    
    constructor (model:sequelize.Model<any,any>){
        this.model = model;
    }

    public find = ( findOptions : sequelize.FindOptions<any> , queryPrams = {}) => {
        let pagination = new Promise((resolve,reject) => {
            this.model.findAndCountAll(findOptions)
            .then((res:{rows : any, count :number}) => {
                let pagination :any = { pagination : {totalPage:0,currentPage:1}};
                pagination.pagination.queryPrams = queryPrams;
                let offset :number = ( findOptions.offset ) ? findOptions.offset : 0;
                let limit = ( findOptions.limit ) ? findOptions.limit : 10;
                if(limit > 0){
                    pagination.pagination.totalPage = Math.ceil(res.count / limit);
                    pagination.pagination.currentPage = Math.ceil( offset / limit) + 1;
                }
                pagination = Object.assign(res,pagination);
                resolve(pagination);
            }).catch((e) => {
                console.log(e);
                reject(e);
            })
        });
        return pagination;
    }
}
