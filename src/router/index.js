import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    //scrollBehavior: () => ({ x: 0, y: 0 }),

    // scrollBehavior:
    // - only available in html5 history mode
    // - defaults to no scroll behavior
    // - return false to prevent scroll
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition;
      }
      else if ((to.path === "/photography" && from.name === "photograph") || (to.path === "/reviews" && from.name !== "photograph")) {
        const position = {};

        return new Promise(resolve => {
          // check if any matched route config has meta that requires scrolling to top
          if (to.matched.some(m => m.meta.scrollToTop)) {
            // coords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0;
            position.y = 0;
          }

          // wait for the out transition to complete (if necessary)
          this.app.$root.$once('triggerScroll', () => {
            // if the resolved position is falsy or an empty object,
            // will retain current scroll position.

            // get object position by href value (object which is being returned from)
            let pos = document.querySelector(`[href='${from.path}']`).getBoundingClientRect();
            position.x = pos.x;
            position.y = pos.y;
            resolve(position);
          })
        })
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}