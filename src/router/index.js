import Vue from 'vue';
import Router from 'vue-router';
import VeeValidate from 'vee-validate';
// Components
import Hello from '@/components/Hello';
import CheckCreation from '@/components/CheckCreation';

Vue.use(Router);
Vue.use(VeeValidate);

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
