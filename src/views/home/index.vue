<template>
  <div class="root">
    <div class="container">
      <div
        v-for="(item, index) in 30"
        :key="index"
        class="item"
        @mouseover="e => show(e, index)"
        @mouseout="$imageTip.close"
        v-text="index+1"
      />
    </div>
    <!-- <div v-loading.fullscreen.lock="loading" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // loading: true,
    }
  },
  created() {
    // this.loading = this.$loading({ fullscreen: true, lock: true })
  },
  mounted() {
  //  this.loading.close()
  },
  methods: {
    show(e) {
      let url = e.target.dataset.src
      if (url) {
        this.$imageTip.show(e, url)
      } else {
        url = 'http://pic2.sc.chinaz.com/Files/pic/pic9/201910/zzpic20341_s.jpg'
        e.target.setAttribute("data-src", url);
        this.$imageTip.show(e, url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
}
.container {
  border: 1px solid #000;
  width: 90%;
  margin: 300px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  display: inline-block;
  background: blue;
  width: 20%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  border: 1px solid #000;
}
</style>
