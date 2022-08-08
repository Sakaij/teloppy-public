<template>
  <div class="m-container">
    <div class="module">
      <img src="~assets/img/pages/about.gif" alt="" width="800" height="400" />
    </div>
    <p class="message">
      テロッピーは、メッセージを入力するだけで
      <br />
      mp4形式、またはGIF形式のオリジナルのメッセージ動画を
      <br />
      簡単に作ることができるサービスです。
    </p>
    <TelopCardItem :pageInfo="page" />
    <PartsM-title theme="4">URLを用いてのテロップ動画</PartsM-title>
    <p class="module">
      テロップの生成と同時にURLが発行されますが、このURLをブラウザで入力するとブラウザ上でテロップ動画を見ることができます。
      <br /><br />このURLを用いてのテロップ動画は、MP4、GIFの動画よりも高画質で、滑らかになるのでMP4、GIFの動画のカクつきが気になる場合はこちらの使用をお勧めします。
    </p>
    
    <PartsM-title theme="4">動画のサイズ</PartsM-title>
    <p class="module">
      動画の大きさは、MP4の場合が横長サイズの1200px × 720pxと縦長サイズの600px × 1000px　の二種類で、GIFの場合は横長が600px × 360pxで、縦長が420px × 700pxになります。
    </p>
    <PartsM-title theme="4">動画ダウンロードのエラーについて</PartsM-title>
    <p class="module">
      テロップによっては、動画が長くなりすぎて動画作成ができずエラーになることがあります。入力するメッセージの字数を減らして再度実行していただくと直ることがあります。
      また、入力するメッセージには文字数制限（基本３０文字）がありますが、この文字数制限以内のメッセージでも動画生成に失敗することがあります。
    </p>
    <PartsM-title theme="4">その他</PartsM-title>
    <p class="module">
      何か問い合わせたいことがある場合は、<a href="https://twitter.com/teloppy_com" target="blank">Twitter</a> のDMまでお願いします。
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "page",
  head:{
    title:'テロッピーについて | Teloppy テロッピー 自分だけのメッセージ動画を送ろう！'
  }
});
</script>


<style scoped lang="scss">
@import "/assets/scss/mixin";
.message {
  font-weight: bold;
  text-align: center;
  margin: 100px 0;
  font-size: 24px;
}


@include touchDevice(){
  .message {
  font-weight: bold;
  text-align: center;
  margin: 60px 0;
  font-size: 16px;
}


};

/* Animation */
</style>