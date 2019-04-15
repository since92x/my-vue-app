<template>
  <div class="comments-root">
    <div class="comments" :id="selectorId" />
  </div>
</template>

<script>
import github from '@/constants/github.config'

const renderComments = (number, selectorId) => {
  const config = {
    clientID: github.CLIENT_ID,
    clientSecret: github.CLIENT_SECRET,
    repo: github.COMMENT_REPO,
    owner: github.OWNER,
    admin: [github.OWNER],
    id: number, // Ensure uniqueness and length less than 50
    distractionFreeMode: true // Facebook-like distraction free mode
  }
  const comment = new window.Gitalk({
    ...config
  })
  comment.render(selectorId)
}

export default {
  name: 'Comments',
  props: {
    number: {
      type: [String, Number],
      default: null
    },
    selectorId: {
      type: [String, Number],
      default: 'comments'
    }
  },
  mounted() {
    renderComments(this.number, this.selectorId)
  }
}
</script>

<style lang="scss" scope>
.comments {
  width: 100%;
}
</style>
