import { createApp } from './createApp';

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => { // eslint-disable-line
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 }); // eslint-disable-line
      }

      Promise.all(matchedComponents.map((Component) => { // eslint-disable-line
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          });
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
};

