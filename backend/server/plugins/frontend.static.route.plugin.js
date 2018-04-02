const path = require('path');
const Boom = require('boom');
const { createBundleRenderer } = require('vue-server-renderer');
const clientManifest = require('../../frontend/dist/vue-ssr-client-manifest.json');

const template = require('fs').readFileSync(path.join(__dirname, '..', '..', 'frontend', 'index.html'), 'utf-8');

const render = (serverBundle, context) => {
  const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  });
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      console.log(html);
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
        const serverBundle = require('../../frontend/dist-server/vue-ssr-server-bundle.json');
        return render(serverBundle, context);
      }
    });
  }
};
