const path = require('path');
const webpack = require('webpack');
const express = require('express');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.dev.conf');
const serverConfig = require('./webpack.server.conf');

module.exports = function setupDevServer(opts) {
  const app = express();
  // modify client config to work with hot middleware
  clientConfig.context = path.join(__dirname, '..');
  clientConfig.entry = {
    app: ['./build/dev-client.js', './src/entrypoint-client.js']
  };

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  const clientCompiler = webpack(clientConfig);
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    quiet: true
  });
  const hotMiddleware = require('webpack-hot-middleware')(clientCompiler);

  app.use(devMiddleware);
  app.use(hotMiddleware);

  serverConfig.context = path.join(__dirname, '..');

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  const outputPath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    opts.bundleUpdated(JSON.parse(mfs.readFileSync(outputPath, 'utf-8')));
  });
};
