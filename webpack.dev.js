const merge = require('webpack-merge'); // eslint-disable-line
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    inline: true,
    contentBase: '/client/public/',
    historyApiFallback: true,
    compress: true,
  },
});
