
module.exports  = {
            entry: __dirname + "/spa/server_pack.ts",
            target : "node",
            externals: [ /^(vue|vue\-router)$/],
            output: {
                libraryTarget : "commonjs",
                path: __dirname + "/spa/"  ,
                filename: 'bundle-server.js',
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
