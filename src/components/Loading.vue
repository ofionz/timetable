<template>
  <div class="preloader">
    <span class="circle">
      <span class="circle__left"><span class="anim"></span></span>
      <span class="circle__right"><span class="anim"></span></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isPreloaderActive: { required: true }
  }
};
</script>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  background: #e9e9e9;
  align-items: CENTER;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.circle {
  position: relative;
  display: inline-block;
  height: 46px;
  width: 46px;
  margin: 1em;
  border-radius: 50%;
  background: none repeat scroll 0 0 #dddddd;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 25px rgba(0, 0, 255, 0.075);
}

.circle:after {
  content: '';
  position: absolute;
  top: 9px;
  left: 9px;
  display: block;
  height: 28px;
  width: 28px;
  background: none repeat scroll 0 0 #e9e9e9;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.circle > span {
  position: absolute;
  height: 100%;
  width: 50%;
  overflow: hidden;
}
.circle__left {
  left: 0;
}
.circle__right {
  left: 50%;
}

.anim {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: none repeat scroll 0 0 #508ec3;
  opacity: 0.8;
  -webkit-animation: ui-spinner-rotate-left 3s infinite;
  animation: ui-spinner-rotate-left 3s infinite;
  -webkit-transform-origin: 0 50% 0;
  transform-origin: 0 50% 0;
}
.circle__left .anim {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.circle__right .anim {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  left: -100%;
  -webkit-transform-origin: 100% 50% 0;
  transform-origin: 100% 50% 0;
}

.circle .anim {
  -webkit-animation-delay: 0s;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  animation-delay: 0s;
  animation-duration: 3s;
  animation-timing-function: linear;
}
.circle .circle__right .anim {
  -webkit-animation-name: ui-spinner-rotate-right;
  -webkit-animation-delay: 0s;
  -webkit-animation-delay: 1.5s;
  animation-name: ui-spinner-rotate-right;
  animation-delay: 0s;
  animation-delay: 1.5s;
}

@-webkit-keyframes ui-spinner-rotate-right {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(180deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes ui-spinner-rotate-left {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
