/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import VeeValidate from 'vee-validate';
import vueResource from 'vue-resource';
// Components
import Hello from '@/components/Hello';
import CheckCreation from '@/components/CheckCreation';

Vue.use(Router);
Vue.use(VeeValidate);
Vue.use(vueResource);
Vue.url.options.root = "http://localhost:3000"

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/check-creation',
      name: 'CheckCreation',
      component: CheckCreation,

    },
  ],
});
