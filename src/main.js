// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
// import createjs from 'createjs-easeljs';
import Vue from 'vue';
import vueResource from 'vue-resource';
// import lodash from 'lodash';
import App from './App';
import router from './router';

Vue.use(vueResource);

// require('createjs-easeljs');
window._ = require('lodash');

Vue.config.productionTip = false;
window.jQuery = jQuery;
window.$ = jQuery;

require('what-input');
require('foundation-sites');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  http: {
    root: 'http://localhost:3000',
    headers: {
      ContentType: 'application/json',
    },
  },
});
