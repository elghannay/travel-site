const path= require('path');
// webpack config file does not accept es6 import
// it require absolute paths to work
// loaders allow us to load all kind of code files like images css scss handlebars ...
// look at the entry file
module.exports = {
    entry: './app/assets/scripts/app.js',
    // entry: path.resolve(__dirname, 'app') + '/assets/scripts/app.js',
        output: {
            path: path.resolve(__dirname, './app/temp/scripts'),
            filename: 'bundle.js',
    },
    mode: 'development',
    devtool: 'none',
        
}