// import createjs from 'createjs-easeljs/lib/easeljs-NEXT.combined';
// import txt from 'txtjs/dist/txt';
import Vue from 'vue';
import Router from 'vue-router';
// Components
import Hello from '@/components/Hello';
import CheckCreation from '@/components/CheckCreation';

const createjs = require('createjs-easeljs/lib/easeljs-NEXT.combined');
const txtjs = require('txtjs/dist/txt');

/* eslint-disable no-new */

Vue.use(Router);

window.txt = txtjs;

Vue.prototype.$createjs = createjs;
Vue.prototype.$txt = txtjs;

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
