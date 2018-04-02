const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chokidar = require('chokidar');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.dev.conf');
const serverConfig = require('./webpack.server.conf');

const readFile = (fss, file) => {
  try {
    return fss.readFileSync(path.join(__dirname, '..', 'dist', file), 'utf-8');
  } catch (e) {
    console.log(e);
  }
};

module.exports = function devServer(server, { bundleUpdated, templatePath }) {
  let bundle;
  let clientManifest;
  let template;

  const update = () => {
    if (bundle && clientManifest) {
      bundleUpdated(bundle, {
        template,
        clientManifest
      });
    }
  };

  template = fs.readFileSync(templatePath, 'utf-8');
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    console.log('index.html template updated.');
    update();
  });

  clientConfig.context = path.join(__dirname, '..');
  clientConfig.entry = {
    app: ['webpack-hot-middleware/client', './src/entrypoint-client.js']
  };

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  const clientCompiler = webpack(clientConfig);

  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });
  const hotMiddleware = webpackHotMiddleware(clientCompiler, {
    noInfo: true,
    reload: true
  });

  server.ext({
    type: 'onRequest',
    method: async (request, h) => {
      const { req, res } = request.raw;
      try {
        const setupWebpackDevMiddleware = new Promise((resolve, reject) => {
          devMiddleware(req, res, (error) => {
            if (error) reject(error);
            resolve();
          });
        });

        await setupWebpackDevMiddleware;
        return h.continue;
      } catch (err) {
        throw err;
      }
    }
  });

  server.ext({
    type: 'onRequest',
    method: async (request, h) => {
      const { req, res } = request.raw;
      try {
        const setupWebpackHotMiddleware = new Promise((resolve, reject) => {
          hotMiddleware(req, res, (error) => {
            if (error) reject(error);
            resolve();
          });
        });

        await setupWebpackHotMiddleware;
        return h.continue;
      } catch (err) {
        throw err;
      }
    }
  });

  clientCompiler.plugin('done', (stats) => {
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ));
    update();
  });

  serverConfig.context = path.join(__dirname, '..');

  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  const outputPath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    bundle = JSON.parse(mfs.readFileSync(outputPath, 'utf-8'));
    update();
  });
};
