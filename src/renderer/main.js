import Vue from 'vue'
import axios from 'axios'
import 'quasar-framework/dist/quasar.mat.css'
import Quasar from 'quasar-framework'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Quasar)

// /* eslint-disable no-new */
// new Vue({
//   components: { App },
//   router,
//   store,
//   template: '<App/>',
// }).$mount('#app');

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
  }).$mount('#q-app')
})
