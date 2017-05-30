// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
// require('createjs-easeljs');
window._ = require('lodash');

window.jQuery = jQuery;
window.$ = jQuery;

require('what-input');
require('foundation-sites');
// require('yuki-createjs/lib/easeljs-0.8.2.combined');

// require('yuki-createjs');

/* eslint-disable */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
