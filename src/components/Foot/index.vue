<template>
  <footer>
    <a
      class="emoj"
      href="https://github.com/since92x"
      target="_blank"
      v-text="'（〃｀ 3′〃）'"
    />
  </footer>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
footer {
  background-color: rgb(29, 161, 242);
  padding: 20px 0;
  text-align: center;
}
.emoj {
  cursor: pointer;
  display: inline-block;
  margin: 0 10px;
  font-size: 24px;
  color: rgb(236, 240, 241);
  &:hover {
    transition: all ease-in-out .3s;
    transform: scale(1.3);
  }
}
</style>
