// const path = require('path');
// const webpack = require('webpack');
// const CompressionPlugin = require('compression-webpack-plugin');

// // const hotPath = path.join(__dirname, 'client', 'public', 'hot');


// module.exports = {
//   devtool: 'cheap-module-source-map',
//   entry: [
//     path.join(__dirname, 'client/src/index.jsx')
//   ],
//   output: {
//     path: path.join(__dirname, 'client', 'public'),
//     filename: 'app.bundle.js',
//     hotUpdateChunkFilename: './hot/hot-update.js',
//     hotUpdateMainFilename: './hot/hot-update.json'
//   },
//   devServer: {
//     publicPath: '/',
//     contentbase: path.join(__dirname, 'client', 'public'),
//     watchContentBase: true,
//     hot: true,
//     inline: true,
//     historyApiFallback: true
//   },
//   plugins: [
//     new webpack.NoEmitOnErrorsPlugin(),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         unused: true,
//         dead_code: true, // big one--strip code that will never execute
//         warnings: false, // good for prod apps so users can't peek behind curtain
//         drop_debugger: true,
//         conditionals: true,
//         evaluate: true,
//         // drop_console: true, // strips console statements
//         sequences: true,
//         booleans: true,
//       },
//       comments: false,
//       sourceMap: true,
//       minimize: false
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     new CompressionPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: /\.js$|\.css$|\.html$/,
//       threshold: 10240,
//       minRatio: 0
//     })
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.(js|jsx|es6)$/,
//         loader: 'babel-loader',
//         exclude: path.join(__dirname, 'node_modules'),
//         query: {
//           presets: ['es2015', 'react', 'stage-2']
//         }
//       },
//       {
//         test: /\.scss$/,
//         loaders: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//       {
//         test: /\.css$/,
//         loaders: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.html$/,
//         loader: 'file-loader?name=[name].[ext]'
//       },
//       {
//         test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
//       },
//       {
//         test: /\.(png|jp(e*)g|svg)$/,
//         use: [{
//           loader: 'file-loader',
//           options: {
//             limit: 700000, // Convert images < 8kb to base64 strings
//             name: 'images/[name].[ext]'
//           }
//         }]
//       },
//       { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
//       { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff2' },
//       { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
//       { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
//       { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   }
// };
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const hotPath = path.join(__dirname, 'client', 'public', 'hot');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, 'client/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: 'app.bundle.js',
    hotUpdateChunkFilename: './hot/hot-update.js',
    hotUpdateMainFilename: './hot/hot-update.json'
  },
  devServer: {
    publicPath: '/',
    contentbase: path.join(__dirname, 'client', 'public'),
    watchContentBase: true,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        // drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
      },
      comments: false,
      sourceMap: true,
      minimize: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 700000, // Convert images < 8kb to base64 strings
            name: 'images/[name].[ext]'
          }
        }]
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
