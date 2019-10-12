import Vue from 'vue'
import Router from 'vue-router'
import Ebook from './views/ebook/Index'
import EbookReader from './components/ebook/EbookReader'

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
    }
  ]
})
