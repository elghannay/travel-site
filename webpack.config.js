const path= require('path');
// webpack config file does not accept es6 import
// it require absolute paths to work
// loaders allow us to load all kind of code files like images css scss handlebars ...
// look at the entry file
module.exports = {
  entry: {
    app: './app/assets/scripts/app.js',
    vendor:'./app/assets/scripts/vendor.js'
  },
    // entry: path.resolve(__dirname, 'app') + '/assets/scripts/app.js',
    output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './app/temp/scripts'),
    },
    mode: 'development',
    devtool: 'none',
  //   devServer: {
  //     contentBase: 'app',
  //      port: 3000
  // }
  
    module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
}