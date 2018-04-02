const path = require('path');
const merge = require('webpack-merge');
// const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.conf.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  entry: './src/entrypoint-server.js',
  output: {
    path: path.resolve(__dirname, '../dist-server'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  devtool: 'source-map',
  // externals: nodeExternals({
  //   whitelist: [/\.css$/]
  // }),
  plugins: [
    new VueSSRServerPlugin()
  ]
});
