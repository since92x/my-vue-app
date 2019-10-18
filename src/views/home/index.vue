<template>
  <div class="root">
    <!-- <div v-loading.fullscreen.lock="loading" /> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    // this.loading = this.$loading({ fullscreen: true, lock: true })
  },
  mounted() {
  //  this.loading.close()
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.root {
}
</style>
