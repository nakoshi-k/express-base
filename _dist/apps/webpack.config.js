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
                extensions: [ ".ts" , '.js', '.vue', '.json'],
                alias: {
                  'vue$': '/var/www/node/express-base/node_modules/vue/dist/vue.esm.js',
                  "vue-router$" : "/var/www/node/express-base/node_modules/vue-router/dist/vue-router.esm.js"
                }
              },
            module: {
                loaders: [
                    { test: /\.vue$/, loader: 'vue-loader' }
                ]
            }

        };
