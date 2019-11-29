<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="blog-root"
  >
    <div class="aside">
      <div class="calendar">
        <Calendar />
      </div>
      <ul
        class="tags"
        caption="tag"
      >
        <li
          v-if="labels.length"
          class="tag-row"
          :class="{selected: !labels.filter(i => i.selected).length}"
        >
          <div
            class="tag-cell"
            @click="handleTagUpdate('clear')"
          >
            <span
              class="tag"
              style="background-color: #009688"
              v-text="'All'"
            />
          </div>
        </li>
        <li
          v-for="(label, index) in labels"
          :key="index"
          class="tag-row"
          :class="{selected: label.selected}"
          @click="handleTagUpdate(label)"
        >
          <div class="tag-cell">
            <span
              class="tag"
              :style="{'background-color': '#'+label.color}"
              v-text="label.name"
            />
          </div>
        </li>
      </ul>
    </div>
    <transition-group
      name="fade"
      tag="ul"
      class="container"
    >
      <li
        v-for="item in items"
        :key="item.number"
        class="list"
      >
        <h3
          @click="handleViewArticle(item.number)"
          v-text="item.title"
        />
        <div class="cover">
          <transition name="slide">
            <div
              v-if="briefShow"
              class="preview"
              v-html="item.body_html"
            />
          </transition>
        </div>
        <a
          class="access"
          @click="handleViewArticle(item.number)"
          v-text="'阅读全文'"
        />
      </li>
      <li
        key="more"
        class="more"
      >
        <a
          v-if="!hasLoadAll && items.length"
          href="javascript:;"
          @click="loadMore"
          v-text="'See more'"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import { getLabels, getArticles } from '@/api/github'
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
      labels: [],
      items: []
    }
  },
  async created() {
    await getLabels().then(res => {
      this.labels = res
    }).catch(err => {
      console.debug(err)
    })
    this.handlePageUpdate()
  },
  methods: {
    handleTagUpdate(tag) {
      if (tag === 'clear') {
        this.labels = this.labels.map(label => ({ ...label, selected: false }))
      } else {
        this.labels = this.labels.map(label => ({ ...label, selected: label.name === tag.name ? !label.selected : false }))
      }
      this.hasLoadAll = false
      this.page = 1
      this.handlePageUpdate(true)
    },
    loadMore() {
      this.page += 1
      this.handlePageUpdate()
    },
    handlePageUpdate(clear = false) {
      if (this.hasLoadAll) return
      if (!this._isNotInit) {
        this.loading = true;
      }
      const labels = this.labels.filter(i => i.selected).map(i => i.name).join()
      getArticles({ page: this.page, per_page: this.per_page, labels }).then(res => {
        this._isNotInit = true
        if (clear) {
          this.items = res
          return
        }
        if (res.length) {
          if (res.length < this.per_page) {
            this.hasLoadAll = true
          }
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
    .tags {
      user-select: none;
      display: table;
      table-layout: fixed;
      width: 100%;
      max-width: 500px;
      min-width: 300px;
      margin: 0 auto;
      border: 1px solid rgb(234, 236, 239);
      &::before {
        content: attr(caption);
        text-transform: uppercase;
        display: table-caption;
        padding: 5px 10%;
        line-height: 40px;
        color: rgb(56, 183, 234);
      }
      .tag-row {
        cursor: pointer;
        list-style: none;
        display: table-row;
        .tag-cell{
          display: table-cell;
          border-top: 1px solid rgb(234, 236, 239);
          .tag {
            display: inline-block;
            margin: 5px 10%;
            padding: 8px;
            border-radius: 8px;
          }
        }
      }
      .selected {
        & .tag-cell::after {
          content: '\2714';
          margin: 0 8px;
          display: inline-block;;
          vertical-align: middle;
          color: #4DCB6D;
          font-size: 2em;
        }
      }
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
    margin-left: 9%;
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
