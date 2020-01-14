import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
// directive
import ClickoutsideDirective from '@/directives/click-away'
import LoadingDirective from '@/directives/loading'
import DragDirective from '@/directives/drag'
import TransferDom from '@/directives/transfer-dom'
import InView from '@/directives/inview'
// service
import LoadingService from '@/services/loading'
import ImageTip from '@/services/imageTip'
// style
import '@/styles/base.scss'

// directive
Vue.use(ClickoutsideDirective)
Vue.use(LoadingDirective)
Vue.use(DragDirective)
Vue.use(TransferDom)
Vue.use(InView)

// service
Vue.prototype.$loading = LoadingService
Vue.prototype.$imageTip = ImageTip

// config
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
