<template>
  <div class="article-root">
    <div class="article-wrapper" v-if="detail">
      <div class="article-container" :class="{'fill-container': !needTOC}">
        <header class="article-head"  >
          <label class="article-title" v-text="detail.title" />
          <time :datetime="detail.created_at" class="article-time">{{ detail.created_at | formatDate}}</time>
          <a class="article-author" :href="detail.user.html_url" v-text="detail.user.login" v-if="detail.user" />
        </header>
        <article class="markdown-body" v-html="detail.body_html" />
      </div>
      <div class="toc-box" :style="{zIndex: shouldTocShow?'auto':'-1'}" v-if="needTOC">
        <div class="markdown-toc toc" />
      </div>
    </div>
    <div ref="comments" class="comments-container">
      <Comments class="article-comments" :number="$route.params.id" v-if="detail && detail.body_html" />
    </div>
  </div>  
</template>

<script>
import tocbot from 'tocbot'
import Comments from '@/components/comments'
// util
import { dateFormate } from '@/utils/core/date'
// api
import { getArticleByNumber } from '@/api/github'
import '@/styles/article-theme.scss'

export default {
  name: 'Article',
  components: {
    Comments,
  },
  filters: {
    formatDate: v => v && dateFormate({year: '2-digit'})(v)
  },
  data () {
    return {
      shouldTocShow: true,
      needTOC: false,
      detail: null
    }
  },
  created () {
    const loading = this.$loading({ fullscreen: true, lock: true })
    const number = this.$route.params.id
    getArticleByNumber(number).then(res => {
      this.detail = res
      document.title = res.title
    }).finally(() => {
      loading.close()
    })
  },
  updated() {
    const headerCnt = this.generateHeadingIds()
    this.needTOC = !!headerCnt
    tocbot.init({
      tocSelector: ".markdown-toc",
      contentSelector: ".markdown-body",
      headingSelector: "h1, h2, h3"
    });
  },
  mounted () {
    this.observer = new IntersectionObserver(([entry]) => {
      this.shouldTocShow = !entry.isIntersecting // TODO: improve
    }, {
      root: null, // relative to document viewport 
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: [0, 1.0], // visible amount of item shown in relation to root
      // delay: 100, // set a minimum delay between notifications
      // trackVisibility: true, // Track the actual visibility of the element
    });
    this.observer.observe(this.$refs.comments)
  },
  beforeDestroy () {
    tocbot.destroy()
    this.observer.disconnect()
  },
  methods: {
    generateHeadingIds () {
      let cnt = 0
      for (let i=1; i<=3; ++i) {
        const headers = document.querySelectorAll(`h${i}`)
        cnt += headers.length
        headers.forEach((header, index) => {
          header['id'] = `h_${i}_${index}`
        })
      }
      return cnt
    }
  }
}
</script>

<style lang="scss">
.article-root {
  box-sizing: border-box;
  padding: 2rem;
  .article-wrapper {
    width: 80%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    .article-container {
      width: 50%;
      @media screen and (max-width: 575.98px) {
        width: 100%;
      }
      .article-head {
        padding-bottom: 1rem;
        border-bottom: 1px solid rgb(224, 224, 224);
        margin-bottom: 1rem;
        .article-time {
          @media screen and (max-width: 575.98px) {
            display: none;
          }
        }
      }
      .article-title {
        display: block;
        font-weight: 600;
        font-size: 3rem;
        line-height: 3rem;
        letter-spacing: -.025rem;
        color: rgb(255, 121, 144);
        word-wrap: break-word;
        margin-bottom: 0.5rem;
      }
      .article-author {
        margin-left: 1rem;
        color: rgb(60, 207, 152);
        cursor: pointer;
        &:hover {
          color: rgb(255, 121, 144); 
        }
      }
      .markdown-body {
        font-weight: 400;
        font-size: .9975rem;
        line-height: 1.5rem;
        letter-spacing: .025rem;
        color: rgb(101, 119, 134);
      }
    }
    .fill-container {
      width: 100%;
    }
    .toc-box {
      position: relative;
      width: 30%;
      @media screen and (max-width: 575.98px) {
        display: none;
      }
      @media screen and (max-width: 768px) {
        width: 20%;
      }
      .markdown-toc {
        position: fixed;
        top: 5rem;
        z-index: 999;
      }
    }
  }
  .article-comments {
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 8.25rem auto 3.75rem;
    padding-top: 3.75rem;
    border-top: 1px solid rgb(170, 184, 194);
    p {
      margin: 10px 0;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .article-bottom {
    @media screen and (max-width: 575.98px) {
      display: none;
    }
    margin: 2em 0 0;
    height: 10em;
    display: flex;
    justify-content: center;
  }
}
</style>
