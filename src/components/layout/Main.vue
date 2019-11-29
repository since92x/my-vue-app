<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  background-color: rgb(255, 255, 255);
  max-width: 1600px;
  min-height: 90vh;
  margin: 0 auto;
}
</style>
