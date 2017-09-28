const path = require("path");
const glob = require("glob");
const ds = path.sep;
var entities = {};

let input = path.resolve( __dirname + "/**/public/*.ts" ) ;

glob.sync( input ).map(function(file){
    let pathArray = file.split(path.sep);
    let nameArray = pathArray.pop().split(".");
    nameArray.pop();
    let dname = file.replace(/^.*\/(.*)\/public.*$/,"$1");
    let extLessName = dname + ds + nameArray.join(".");
    if(extLessName.substr(-2,2) !== ".d"){
        entities[extLessName] = file;
    }
});
let outdir = path.resolve( __dirname + "/../dist/apps/public/");

module.exports  = {
            entry: entities,
            output: {
                path: outdir ,
                filename: '[name].js',
            },
            resolve: {
                // extensionsに'.ts'を追加
                extensions: ['.js', '.vue', '.json', '.ts'],
                alias: {
                  'vue': '/var/www/node/express-base/node_modules/vue/dist/vue.esm.js',
                  'vue-router': '/var/www/node/express-base/node_modules/vue-router/dist/vue-router.esm.js',
                },
                
            },
            module: {
                loaders:[
                    { test: /\.vue$/, loader: 'vue-loader' },
                    {
                        test: /\.ts$/,
                        loader: 'ts-loader',
                        options: {
                          appendTsSuffixTo: [/\.vue$/],
                          compilerOptions : {
                            "module": "commonjs",
                            "lib" : ["dom", "es2015",  "es5"],
                            "target": "es5",
                            "noImplicitAny": false,
                            "sourceMap": false,
                            "outDir" : "dist",
                            "watch" : false,
                            "allowJs" : true,
                            "pretty" : true,
                            "experimentalDecorators": true,
                            "allowSyntheticDefaultImports": true,
                            "moduleResolution": "node"
                            
                          }
                        },
                        

                      }
                   
                ]
                  
            }
        };
