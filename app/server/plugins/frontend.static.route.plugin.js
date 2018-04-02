const path = require('path');
const Boom = require('boom');
const { createBundleRenderer } = require('vue-server-renderer');

const devServer = require('../../frontend/build/dev-server');

const isProduction = process.env.NODE_ENV === 'production';

const createRenderer = (serverBundle, opts, context) => {
  const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: opts.template,
    clientManifest: opts.clientManifest
  });
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          return reject(Boom.notFound('Page not found'));
        }
        return reject(Boom.internal('Internal Server Error'));
      }

      return resolve(html);
    });
  });
};

exports.plugin = {
  name: 'frontend-static-route',
  version: '1.0.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/static/{path*}',
      config: {
        auth: false
      },
      handler: {
        directory: {
          path: path.join(__dirname, '..', '..', 'frontend', 'dist', 'static'),
          listing: false,
          redirectToSlash: true
        }
      }
    });
    server.route({
      method: 'GET',
      path: '/{path*}',
      config: {
        auth: false
      },
      handler: (request) => {
        const context = { url: request.url };

        if (isProduction) {
          const serverBundle = require('../../frontend/dist/vue-ssr-server-bundle.json');
          const template = require('fs').readFileSync(path.resolve(__dirname, '../../frontend/index.html'), 'utf-8');
          const clientManifest = require('../../frontend/dist/vue-ssr-client-manifest.json');
          const opts = { clientManifest, template };
          return createRenderer(serverBundle, opts, context);
        }

        return new Promise((resolve) => {
          devServer(request.server, {
            bundleUpdated: (bundle, opts) => {
              return resolve(Promise.resolve(createRenderer(bundle, opts, context)));
            },
            templatePath: path.resolve(__dirname, '../../frontend/index.html')
          });
        });
      }
    });
  }
};
