import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import i18n from './lang/index'
import './mock'
import './assets/style/icon.css'
import './assets/style/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
