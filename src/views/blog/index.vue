<template>
  <div class="blog-root" v-loading.fullscreen.lock="loading">
    <div class="aside">
      <div class="calendar">
        <Calendar />
      </div>
    </div>
    <transition-group name="fade" tag="ul" class="container">
      <li class="list" v-for="item in items" :key="item.number">
        <h3 v-text="item.title" @click="handleViewArticle(item.number)" />
        <div class="cover">
          <transition name="slide">
            <div class="preview" v-if="briefShow" v-html="item.body_html" />
          </transition>
        </div>
        <a class="access" v-text="'阅读全文'" @click="handleViewArticle(item.number)" />
      </li>
      <li key="more" class="more">
        <a href="javascript:;" v-if="!hasLoadAll && items.length" v-text="'See more'" @click="loadMore"/>
      </li>
    </transition-group>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import { getArticles } from '@/api/github'
import { setTimeout } from 'timers';
export default {
  name: 'Blog',
  components: {
    Calendar
  },
  data() {
    return {
      loading: false,
      briefShow: false,
      per_page: 5,
      page: 1,
      hasLoadAll: false,
      items: []
    }
  },
  watch: {
    page: {
      immediate: true,
      handler: 'handlePageUpdate'
    }
  },
  methods: {
    loadMore() {
      this.page += 1
    },
    handlePageUpdate() {
      if (this.hasLoadAll) return
      if (this.page === 1) {
        this.loading = true;
      }
      getArticles(this.page, this.per_page).then(res => {
        if (res.length) {
          this.items = [...this.items, ...res]
        } else {
          this.page -= 1
          this.hasLoadAll = true
        }
      }).catch(err => {
        console.debug(err)
      }).finally(() => {
        this.loading = false;
        setTimeout(() => { // hack loading component stuck
          this.briefShow = true;
        }, 500)
      })
    },
    handleViewArticle(number) {
      this.$router.push({
        name: 'article',
        params: { id: number }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-active {
  transition-delay: 0.4s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.slide-enter-active {
  transition: all 0.4s;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  transition: all 0.4s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
  max-height: 100%;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.blog-root {
  .aside {
    padding: 3rem 0;
    display: inline-block;
    vertical-align: top;
    width: 25%;
    margin-left: 5%;
    .calendar {
      text-align: center;
    }
    @media (max-width: 992px) {
      display: block;
      width: 90%;
      margin: 0 auto;
    }
    @media screen and (max-width: 575.98px) {
      display: none;
    }
  }
  .container {
    display: inline-block;
    vertical-align: top;
    width: 52%;
    margin: 0 9%;
    @media (max-width: 992px) {
      display: block;
      width: 90%;
      margin: 0 auto;
    }
  }
  .list {
    position: relative;
    max-width: 100%;
    width: 100%;
    padding: 3rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid rgb(170, 184, 194);
    }
    h3 {
      cursor: pointer;
      position: relative;
      display: inline-block;
      text-overflow: ellipsis;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
      overflow: hidden;
      vertical-align: middle;
      transition: all ease-in-out .3s;
      font-weight: 700;
      font-size: 2.25rem;
      line-height: 2.25rem;
      @media screen and (max-width: 575.98px) {
        font-size: 1.5rem;
        line-height: 1;
      }
      letter-spacing: -.025rem;
      color: rgb(101, 119, 134);
      &::after{
        content: '';
        position: absolute;
        width: 0px;
        height: 5px;
        left: 50%;
        bottom: -4px;
        border-radius: 2.5px;
        background-color: pink;
        transition: all ease-in-out .3s;
      }
      &:hover {
        color: pink;
        border: none;
        &::after{
          width: 100%;
          left: 0;
        }
      }
    }
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
    .cover {
      margin: 1.25rem 0 .25rem;
      box-sizing: border-box;
      height: 100px;
    }
    .preview {
      height: 100%;
      box-sizing: border-box;
      white-space: pre-line;
      letter-spacing: .025rem;
      position: relative;
      overflow: hidden;
      & /deep/ * {
        display: inline;
        display: contents;
        white-space: pre-line;
        font-size: 14px;
        color: rgb(170, 184, 194);
        background: #fff;
        pointer-events: none;
        font-weight: 400;
        font-size: .9975rem;
        line-height: 1.5rem;
      }
      & /deep/ br {
        display: none;
      }
    }
    .access {
      position: absolute;
      bottom: 15px;
      right: 2px;
      cursor: pointer;
      display: block;
      color: #FF9800;
      text-align: right;
      &:hover {
        color: rgb(224, 112, 103);
      }
    }
  }
  .more {
    height: 100px;
    line-height: 100px;
    a {
      color: rgb(29, 161, 242);
      font-size: 2em;
      font-weight: bold;
    }
  }
}
</style>
