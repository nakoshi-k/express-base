const path = require("path");
const glob = require("glob");
var entries = {}
glob.sync( __dirname + "/*.ts").map(function(file){
    let pathArray = file.split(path.sep);
    let nameArray = pathArray.pop().split(".");
    nameArray.pop();
    let extLessName = nameArray.join(".");
    entries[extLessName] = file;
});

let outdir = __dirname.replace("/apps/" , "/dist/apps/");
module.exports  = {
            entry: entries,
            output: {
                path: outdir ,
                filename: '[name].js',
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'ts-loader' }
                ]
            }
        };
