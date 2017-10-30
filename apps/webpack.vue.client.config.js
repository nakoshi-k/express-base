let path =require("path");
let outdir = path.resolve( __dirname + "/../dist/apps/public/scripts/");

module.exports  = {
            entry: __dirname + "/spa/client_pack.ts",
            target : "web",
            output: {
                path: outdir ,
                filename: 'client.js',
                publicPath: "/scripts/"
            },
            resolve: {
                // extensionsに'.ts'を追加
                extensions: ['.js', '.vue', '.json', '.ts'],
                alias: {
                  'vue$': 'vue/dist/vue.esm.js',
                  'vue-router$': 'vue-router/dist/vue-router.esm.js',
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
                            "module": "esnext",
                            "lib" : ["dom", "es2015",  "es5"],
                            "target": "es2015",
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
