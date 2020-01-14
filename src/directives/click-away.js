const ClickawayDirective = {
  bind(el, { value }) {
    if (typeof value !== 'function') {
      throw new Error(`Expect a function, got ${typeof value} ${value}`)
    }
    function documentHandler(e) {
      el.contains(e.target) || value(e)
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

export default {
  install(Vue) {
    Vue.directive('clickaway', ClickawayDirective)
  }
}
