var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var __f7Path = __dirname + '/node_modules/framework7/dist';
//var __f7Path = __dirname + '/bower_components/framework7/dist';
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var post = 8080;
module.exports = {
  //配置热替换服务器,每次改变JS文件都会自动AJAX刷新浏览器
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      //contentBase: './dist', //将其运行目录设置为打包后的目录
      port: post
  },
  //devtool: 'source-map',
  entry: [
      //'webpack/hot/dev-server',
      //'webpack-dev-server/client?http://localhost:' + post,
      //上面2个是开发的时候用的热替换服务器
      path.resolve(__dirname, 'src/app/index')
  ],
  output: {
    path: __dirname + '/dist/',
    contentBase: 'dist/',
    filename: 'app.js'
  },
  // f7 alias
  resolve: {
    alias: {
        'framework7': __f7Path + '/js/framework7.js',
        'framework7.material.css': __f7Path + '/css/framework7.material.css',
        'framework7.material.color.css': __f7Path + '/css/framework7.material.colors.css'
    }
  },
  // how modules should be transformed
  module: {
    loaders: [
        {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
        {test: /\.less$/, loader: ExtractTextPlugin.extract( "style-loader", 'css-loader?sourceMap!less-loader!autoprefixer-loader')},
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
        {test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg'},
        {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
    ]
  },
  // configure babel-loader.
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
      //热替换插件
      //new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new ExtractTextPlugin("style.css", {
          allChunks: true
      }),
      //输出文件插件,最顶上有引入
      new CopyWebpackPlugin([
          { from: 'src/index.html', to: 'index.html' },
          { from: 'src/page', to: 'page' }
      ]),
      //以下代码为压缩代码插件,在打包的时候用,开发环境下会减慢编译速度
      new webpack.optimize.UglifyJsPlugin({
         //这里是去除错误提示的配置
         compress: {
             warnings: false
         }
      })
  ]
}
