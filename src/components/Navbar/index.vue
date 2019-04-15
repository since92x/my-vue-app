<template>
  <nav class="head-root">
    <a class="nav-header" href="javascript:window.location.reload(true);" v-text="'（〃｀ 3′〃）'" />
    <input type="checkbox" id="nav-check" />
    <label for="nav-check" class="nav-btn">
      <span /><span /><span />
    </label>
    <div class="nav-links">
      <router-link class="nav-item" active-class="nav-active" v-for="(item, index) in items" :key="index" :to="item.to" v-text="item.name" />
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        name: 'Home', to: '/home'
      }, {
        name: 'Blog', to: '/blog'
      }, {
        name: 'About', to: '/about'
      }]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$navHeight: 3rem;
.head-root {
  min-height: $navHeight;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: rgb(29, 161, 242);
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5rem;
  letter-spacing: .025rem;
  .nav-btn, #nav-check {
    display: none;
  }
  .nav-header {
    margin-right: auto;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    &:hover {
      transition: all ease-in-out .3s;
      transform: scale(1.3);
    }
  }
  .nav-item {
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    min-width: 80px;
    max-width: 200px;
    height: $navHeight;
    line-height: $navHeight;
    color: #fff;
    text-align: center;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 5px;
      border-radius: 2.5px;
      background-color: rgb(255, 152, 0);
      transition: all ease-in-out .5s;
    }
    &:hover {
      color: #fff;
      border: none;
      &::after {
        width: 100%;
        left: 0;
      }
    }
    &:not(:hover) {
      color: #fff;
      &::after {
        width: 0!important;
        left: 50%!important;
      }
    }
  }
  .nav-active {
    color: rgb(255, 152, 0)!important;
    border: none;
    position: relative;
    &::after {
      width: 100%!important;
      left: 0!important;
    }
  }
  @media screen and (max-width: 575.98px) {
    .nav-btn {
      display: inline-block;
      padding: 13px;
      span {
        display: block;
        width: 25px;
        height: 1px;
        background-color: #fff;
        & + span {
          margin-top: 9px;
        }
      }
    }
    .nav-links {
      display: block;
      width: 100%;
      background-color: rgb(29, 161, 242);
      height: 0;
      transition: all 0.3s ease-in;
      overflow-y: auto;
      position: absolute;
      top: calc(#{$navHeight} - 1px);
      left: 0;
      z-index: 999;
      .nav-item {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        &::after {
          display: none;
        }
      }
    }
    #nav-check {
      &:not(:checked) ~ .nav-links {
        height: 0;
      }
      &:checked  ~ .nav-links {
        display: block;
        width: 100%;
        height: 3*$navHeight;
        overflow-y: auto;
      }
      &:checked + .nav-btn span {
        transition: all 0.3s;
        width: 35.35px;
        margin: 0;
        &:nth-child(1) {
          transform: rotate3d(0, 0, 1, 45deg);
        }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          transform: rotate3d(0, 0, 1, -45deg);
        }
      }
      &:not(:checked) + .nav-btn span {
        transition: all 0.3s;
      }
    }
  }
}
</style>
