import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import tokenService from './config/tokenService';

Vue.use(Router);

export function createRouter(store) {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/logout',
        name: 'logout',
        beforeEnter: (to, from, next) => {
          store.dispatch('LOGOUT');
          next({
            name: 'login'
          });
        }
      }
    ]
  });

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line
    router.beforeEach((to, from, next) => {
      if (from.name === 'login' && to.name === 'home') {
        return next();
      }
      if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = tokenService.getToken();

        store.dispatch('VERIFY_USER_AUTHENTICATED', token)
          .then(next)
          .catch(() => {
            next({
              name: 'login'
            });
          });
      } else {
        next();
      }
    });
  }

  return router;
}
