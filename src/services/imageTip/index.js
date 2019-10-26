import Vue from 'vue'
import Tooltip from './tooltip.vue'

const COTR = Vue.extend(Tooltip)
const instance = new COTR({
    el: document.createElement('div'),
})
document.body.appendChild(instance.$el)

export default {
  show: instance.open,
  close: instance.close
}
