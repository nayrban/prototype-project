// import createjs from 'createjs-easeljs/lib/easeljs-NEXT.combined';
// import txt from 'txtjs/dist/txt';
import Vue from 'vue';
import Router from 'vue-router';
// Components
import Hello from '@/components/Hello';
import CheckCreation from '@/components/CheckCreation';

/* eslint-disable no-new */

Vue.use(Router);

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
