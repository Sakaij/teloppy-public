<template>
  <header class="global-header">
    <nav class="global-header_nav"></nav>
    <h1 class="global-header_logo"><nuxt-link to="/">TeloppyでGIF、MP4のメッセージ動画を作成。</nuxt-link></h1>
  </header>
</template>

<style scoped lang="scss">
@import "/assets/scss/mixin";
.global-header {
  width: 100%;
  //background: linear-gradient(125deg, $main01_c, #B06AB3);
  box-shadow: 0 0 2px #ccc;
  box-sizing: border-box;
  z-index: 2;
  background-color: #ffffff;
  padding: 15px 4%;
  position: fixed;
  top: 0;
  left: 0;
  &_logo {
    background: url(~assets/img/fix/logo.png) no-repeat;
    width: 169px;
    height: 42px;
    text-indent: -9999px;
    display: block;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

@include touchDevice() {
  .global-header {
    padding: 10px 4%;
    &_logo{
      background-size: 100% auto;
      
      width: 130px;
      height: 33px;
    }
  }
}
</style>
