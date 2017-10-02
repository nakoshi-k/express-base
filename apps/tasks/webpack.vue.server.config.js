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

let outdir = path.resolve( __dirname + "/../../dist/apps/tasks/" );

module.exports  = {
            entry: __dirname + "/spa/server.ts",
            target : "node",
            externals: [ /^(vue|vue\-router)$/],
            output: {
                libraryTarget : "commonjs",
                path: outdir ,
                filename: 'spa/server.js',
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
                            "module": "es2015",
                            "lib" : ["dom", "es2015",  "es5"],
                            "target": "es2015",
                            "noImplicitAny": false,
                            "sourceMap": false,
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
