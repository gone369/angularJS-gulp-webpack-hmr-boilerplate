var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var config = require(path.join(__dirname, "config.js"));

module.exports = {
  entry: config.client_entry,
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '..','build','static'),
    filename: 'client.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    timings: true,
  },
  plugins: [
    //new webpack.optimize.OccurenceOrderPlugin(),
    new HTMLWebpackPlugin({
      title: 'react framework',
      //filename: 'assets/admin.html'
    })
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, "..","node_modules/compass-mixins/lib")]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: [path.resolve(__dirname, "../node_modules")],
      },
      {
        test: /\.html?$/,
        include: [
          path.resolve(__dirname, '../src/client/view')
        ],
        loader: 'html'
      },
      {
        test:/\.css$/,
        loaders: ["css"]
      },
      {
        test:/\.(scss|sass)$/,
        loaders: ["style","css","sass"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
      }
    ]
  }
};
