<template>
  <transition name="loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible"
      :style="{ backgroundColor: background || '' }"
      :class="['loading-mask', customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="loading-spinner">
        <spinner v-if="$options.components.spinner" />
        <svg class="circular" viewBox="25 25 50 50" v-else>
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <p v-if="text" v-text="text" class="loading-text" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {
    spinner: null,
  },
  data() {
    return {
      text: '',
      background: null,
      fullscreen: true,
      visible: false,
      customClass: '',
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    setText(text) {
      this.text = text;
    },
  },
};
</script>
<style lang="scss">
.loading-mask {
  position: absolute;
  z-index: 10001;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.4s;
  &.is-fullscreen {
    position: fixed;
  }
  .loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
    .circular {
      height: 42px;
      width: 42px;
      animation: loading-rotate 2s linear infinite;
    }
    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #017aff;
      stroke-linecap: round;
    }
    .loading-text {
      color: #ccc;
    }
  }
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
.loading-parent--relative {
  position: relative !important;
}
.loading-parent--hidden {
  overflow: hidden !important;
}
</style>
