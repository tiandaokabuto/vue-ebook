import Vue from 'vue'
import Router from 'vue-router'
import Ebook from './views/ebook/Index'
import EbookReader from './components/ebook/EbookReader'
import Store from './views/store/Index'
import StoreHome from './views/store/StoreHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: Ebook,
      children: [
        {
          path: ':fileName',
          component: EbookReader
        }
      ]
    },
    {
      path: '/store',
      component: Store,
      redirect: '/store/home',
      children: [
        {
          path: 'home',
          component: StoreHome
        }
      ]
    }
  ]
})
