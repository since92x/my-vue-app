import Vue from 'vue';
import { addClass, removeClass, getStyle } from '@/utils/dom/style';
import Loader from '@/components/loading';
import Pacman from '@/components/painting/Pacman.vue';

const Loading = Vue.extend(Loader);
const afterLeave = (instance, callback, speed = 300, once = false) => {
  if (!instance || !callback) { throw new Error('instance & callback is required'); }
  let called = false;
  const afterLeaveCallback = function() {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  };
  if (once) {
    instance.$once('after-leave', afterLeaveCallback);
  } else {
    instance.$on('after-leave', afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
};

const insertDom = (parent, el, binding) => {
  const modifiers = binding.modifiers
  if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
    Object.keys(el.maskStyle).forEach(property => {
      el.mask.style[property] = el.maskStyle[property];
    });

    if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
      addClass(parent, 'loading-parent--relative');
    }
    if (modifiers.fullscreen && modifiers.lock) {
      addClass(parent, 'loading-parent--hidden');
    }
    el.domVisible = true;

    parent.appendChild(el.mask);
    Vue.nextTick(() => {
      if (el.instance.hiding) {
        el.instance.$emit('after-leave');
      } else {
        el.instance.visible = true;
      }
    });
    el.domInserted = true;
  }
};
const toggleLoading = (el, binding) => {
  const modifiers = binding.modifiers
  if (binding.value) {
    Vue.nextTick(() => {
      if (modifiers.fullscreen) {
        el.originalPosition = getStyle(document.body, 'position');
        el.originalOverflow = getStyle(document.body, 'overflow');
        el.maskStyle.zIndex = el.getAttribute('z-index');
        addClass(el.mask, 'is-fullscreen');
        insertDom(document.body, el, binding);
      } else {
        removeClass(el.mask, 'is-fullscreen');
        el.originalPosition = getStyle(el, 'position');
        insertDom(el, el, binding);
      }
    });
  } else {
    afterLeave(
      el.instance,
      () => {
        const modifiers = binding.modifiers
        el.domVisible = false;
        const target = modifiers.fullscreen ? document.body : el;
        removeClass(target, 'loading-parent--relative');
        removeClass(target, 'loading-parent--hidden');
        el.instance.hiding = false;
      },
      300,
      true
    );
    el.instance.visible = false;
    el.instance.hiding = true;
  }
};
const DEFAULT_OPTIONS = {
  spinner: Pacman,
  text: '',
  background: 'rgba(0,0,0,0.5)',
  customClass: '',
  fullscreen: false,
}
export default {
  install(Vue) {
    Vue.directive('loading', {
      bind(el, binding, vnode) { // eslint-disable-line no-unused-vars
        const text = el.getAttribute('loading-text');
        const spinner = el.getAttribute('loading-component');
        const background = el.getAttribute('loading-background');
        const customClass = el.getAttribute('loading-custom-class');
        const modifiers= binding.modifiers;
        const vm = vnode.context;
        const mask = new Loading({
          el: document.createElement('div'),
          components: {
            spinner: vm && vm[spinner] || spinner || DEFAULT_OPTIONS.spinner,
          },
          data: {
            text: vm && vm[text] || text || DEFAULT_OPTIONS.text,
            background: vm && vm[background] || background || DEFAULT_OPTIONS.background,
            customClass: vm && vm[customClass] || customClass || DEFAULT_OPTIONS.customClass,
            fullscreen: !!modifiers.fullscreen || DEFAULT_OPTIONS.fullscreen,
          },
        });
        el.instance = mask;
        el.mask = mask.$el;
        el.maskStyle = {};
        if (binding.value) {
          toggleLoading(el, binding);
        }
      },

      update(el, binding) {
        el.instance.setText(el.getAttribute('loading-text'));
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding);
        }
      },

      unbind(el, binding) {
        if (el.domInserted) {
          if (el.mask && el.mask.parentNode) {
            el.mask.parentNode.removeChild(el.mask);
          }
          toggleLoading(el, {
            value: false,
            modifiers: binding,
          });
        }
      },
    });
  },
};
