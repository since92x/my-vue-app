<template>
  <img
    v-show="visible"
    ref="dialog"
    class="dialog"
    :src="src"
    :style="style"
    @mouseover="visible=true"
    @mouseout="close"
  >
</template>

<script>
export default {
  data() {
    return {
      useAlign: true,
      visible: false,
      src: null,
      style: {
        top: 0,
        left: 0
      }
    };
  },
  methods: {
    open(e, payload) {
      this.src = payload
      // 智能定位
      this.$nextTick(() => {
        let { pageX: elPosLeft, pageY: elPosTop } = e;
        const { width, height } = window.getComputedStyle(this.$refs.dialog)
        const [elWidth, elHeight] = [parseInt(width), parseInt(height)]
        if (this.useAlign) {
          const {
            left: targetLeft,
            top: targetTop,
            height: targetHeight,
            width: targetWidth
          } = e.target.getBoundingClientRect();
          elPosTop = targetTop + targetHeight / 2;
          elPosLeft = targetLeft + targetWidth / 2;
        }
        // 越界检测
        const overflowTop = elHeight - elPosTop;
        const overflowBottom = elHeight + elPosTop - window.innerHeight;
        const overflowLeft = elWidth - elPosLeft;
        const overflowRight = elWidth + elPosLeft - window.innerWidth;
        if (overflowBottom > 0) {
          elPosTop -= overflowTop < 0 ? elHeight : elHeight - overflowTop;
        }
        if (overflowRight > 0) {
          elPosLeft -= overflowLeft < 0 ? elWidth : elWidth - overflowLeft;
        }
        this.style = {
          top: `${elPosTop}px`,
          left: `${elPosLeft}px`
        };
        this.visible = true;
      });
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  width: 300px;
  height: 400px;
  position: fixed;
  z-index: 999;
  border-radius: 4px;
}
</style>
