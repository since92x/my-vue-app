<template>
  <transition name="fade-transform" mode="out-in">
    <div class="layout-root">
      <div class="head">
        <Navbar />
      </div>
      <div class="content">
        <Main />
      </div>
      <div class="foot">
        <Foot />
      </div>
    </div>
  </transition>
</template>

<script>
import Navbar from '@/components/navbar'
import Foot from '@/components/foot'
import Main from './Main'
export default {
  components: {
    Navbar,
    Foot,
    Main
  }
}
</script>

<style lang="scss" scoped>
.layout-root {
  background-color: rgb(170, 184, 194);
  .head {
    max-width: 1600px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    margin: auto;
  }
  .content {
    padding-top: 3rem;
    padding-bottom: 30px;
    @media screen and (max-width: 575.98px) {
      padding-bottom: 0;
    }
  }
  .foot {
    border: none;
  }
}
</style>
