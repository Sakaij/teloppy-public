<template>
  <div class="twitter-iframe">
    <div class="twitter-iframe_widget">
      <a
        class="twitter-timeline"
        data-lang="ja"
        data-width="100%"
        :data-height="$mq === 'lg' ? 450 : 600"
        href="https://twitter.com/teloppy_com?ref_src=twsrc%5Etfw"
        >Tweets by teloppy_com</a
      >
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
    <div class="twitter-iframe_follow">
      <a
        href="https://twitter.com/teloppy_com?ref_src=twsrc%5Etfw"
        class="twitter-follow-button"
        data-show-count="false"
        data-lang="ja"
        data-show-screen-name="false"
        data-size="large"
        >Follow @teloppy_com</a
      >
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "/assets/scss/mixin";
.twitter-iframe {
  &_widget {
	  box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
  &_follow {
    text-align: center;
  }
}
</style>
