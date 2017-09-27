const path = require("path");
const glob = require("glob");
var entries = {}

function resolve (dir) {
    return "/var/www/node/express-base/node_modules/vue/dist/vue.esm.js"
  }



module.exports  = {
            entry: "/var/www/node/express-base/apps/test.vue",
            output: {
                path: "/var/www/node/express-base/apps/" ,
                filename: 'test.js',
            },
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                  'vue$': 'vue/dist/vue.esm.js',
             //     '@': resolve('src'),
                }
              },
            module: {
                loaders: [
                    { test: /\.vue$/, loader: 'vue-loader' },
                    { test: /\.ts$/, loader: 'awesome-typescript-loader' }
                ]
            }

        };
