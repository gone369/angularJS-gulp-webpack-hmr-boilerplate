const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require(path.join(__dirname, "config.js"));
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  entry: config.client_entry,
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '..','build','static'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    timings: true
  },
  sassLoader: {
    includePaths: config.sass_include_paths
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['html'] 
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel','import-glob-loader'], 
        exclude: [path.resolve(__dirname, "../node_modules")]
      },
      {
        test:/\.css$/,
        loaders: ["style-loader","css-loader","resolve-url"]
      },
      {
        test:/\.(scss|sass)$/,
        loaders: ["style-loader","css-loader","sass-loader","resolve-url","sass?sourceMap",'import-glob-loader']
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url?limit=8192&mimetype=image/png&name=images/[name].[ext]'
      },
      {
        test: /\.(woff2|woff|eot|ttf)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file?name=sounds/[name].[ext]'
      }

    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, config.sprite.src),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, config.sprite.dest.image),
        css: [
          path.resolve(__dirname, config.sprite.dest.css),
          [
            path.resolve(__dirname, config.sprite.dest.json),
            {
              format: 'json_texture'
            }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HTMLWebpackPlugin({
      title: 'react framework',
      template : config.html_index_template_path,
      inject: 'body'
    })
  ]
};
