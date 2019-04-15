import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
// filter
import { dateFormate } from '@/utils/core/date'
// directive
import SmoothScrollDirective from  '@/directives/smooth-scroll'
import ClickoutsideDirective from '@/directives/click-away'
import LoadingDirective from '@/directives/loading'
// service
import LoadingService from '@/services/loading'
import '@/styles/base.scss'

// filter
Vue.filter('formatDate', v => v && dateFormate(v))

// directive
Vue.use(SmoothScrollDirective)
Vue.use(ClickoutsideDirective)
Vue.use(LoadingDirective)

// service
Vue.prototype.$loading = LoadingService

// config
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
