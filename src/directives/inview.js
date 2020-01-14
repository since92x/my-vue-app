const throttle = (func, limit = 500) => {
  let lastFunc, lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const isElementInViewport = el => {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;
  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  const bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };
  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
};

export const InViewDirective = {
  inserted(el, { value }) {
    if (typeof value !== 'function') return;
    const inviewDelay = el.dataset.inviewDelay
    const delay = Number.isNaN(Number(inviewDelay)) ? 500 : Number(inviewDelay)
    const scrollHandler = throttle(() => value(isElementInViewport(el)), delay)
    el.__vueIsInView__ = scrollHandler
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
  },
  unbind(el) {
    document.removeEventListener('scroll', el.__vueIsInView__)
    delete el.__vueIsInView__
  }
};

export default {
  install(Vue) {
    Vue.directive("inview", InViewDirective);
  }
};
