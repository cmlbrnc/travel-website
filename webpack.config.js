var path = require('path');


module.exports = 

{
    entry: "./app/assets/scripts/App.js",
    output : {
        path:path.resolve(__dirname,"./app/assets/temp/scripts"),
        filename: "App.js"
    },
    module:{
        loaders: [
            {
                loader:'babel-loader',
                query: {
                    presets:['es2015']
                },
                test:/\.jd$/,
                exclude:/node_modules/
            }
        ]
    }
}