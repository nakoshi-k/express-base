

    
module.exports  = {

        context : __dirname,
        entry: { "test" : "./test.ts"},
        output: {
            path: __dirname,
            filename: 'tank.js',
        },
        module: {
            loaders: [
                { test: /\.tsx?$/, loader: 'ts-loader' }
            ]
        }
    };

