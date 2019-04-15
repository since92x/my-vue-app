<template>
  <div class="track">
    <div class="pacman">
      <div class="loader" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$dotColor: #ff0000;
$pacmanColor: yellow;
.track {
  width: 300px;
  height: 0px;
  border-top: 10px dotted $dotColor;
  display: inline-block;
}
.pacman {
  transform: translateZ(0);
  will-change: transform;
  animation: moveChomp 5s linear infinite;
  width: 0px;
  height: 0px;
  position: relative;
  top: -15px;
  left: -15px;
}
.loader {
  background: none;
  display: inline-block;
  position: relative;
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  height: 0px;
  width: 0px;
  border: 30px solid $pacmanColor;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 50%;
  margin-top: -34px;
  transform: rotate(0deg);
  animation: topchomp 1s ease-in-out infinite reverse;
}
.loader:after {
  transform: rotate(-90deg);
  animation: bottomchomp 1s ease-in-out infinite;
}
@keyframes bottomchomp {
  0%,
  100% {
    transform: rotate(-90deg);
  }
  50% {
    transform: rotate(-134.99deg);
  }
}
@keyframes topchomp {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(44.99deg);
  }
}
@keyframes moveChomp {
  0%,
  100% {
    left: 0%;
  }
  50% {
    left: 100%;
  }
  0% {
    transform: rotateY(90deg);
  }
  3%,
  47.5% {
    transform: rotateY(0deg);
  }
  52.5%,
  98% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
