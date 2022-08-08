<template>
  <div class="iframe-embed" :style="'height:' + boxHeight + 'px'" ref="box">
    <div class="iframe-embed_active" v-show="isCurrent">
      <iframe
        :src="iframeUrl"
        ref="iframe"
        frameborder="0"
        :height="boxHeight"
      ></iframe>
      <button
        class="iframe-embed_reload"
        id="iframe-reload-button"
        @click="iframeReload()"
      >
        <font-awesome-icon :icon="['fas', 'redo-alt']" />
      </button>
    </div>
    <div
      class="iframe-embed_inactive"
      :style="`background-image:url(${this.$config.s3ResourceUrl}img/thumbnails/${pageName}.jpg)`"
      v-show="!isCurrent"
    >
      <p class="iframe-embed_submit">
        <button @click="selectDemoPage()" id="select-demo-button">
          デモを見る <font-awesome-icon :icon="['fas', 'play-circle']" />
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
<script lang="ts">
import Vue from "vue";
import { API } from "aws-amplify";

export default Vue.extend({
  props: ["pageName", "sampleMessage", "cardId"],
  data() {
    return {
      boxWidth: 0,
    };
  },
  methods: {
    selectDemoPage() {
      this.$store.dispatch("setDemoMessage", "");
      this.$store.dispatch("setTelopCardId", this.cardId);
    },
    iframeReload() {
      const $iframe = this.$refs.iframe;
      if ($iframe instanceof Element) {
        const src = $iframe.getAttribute("src");
        $iframe.setAttribute("src", "");
        $iframe.setAttribute("src", src || "");
      }
    },
  },
  mounted() {
    const $box = this.$refs.box;
    if ($box instanceof Element) this.boxWidth = $box.clientWidth;
  },
  computed: {
    boxHeight():number{
      return this.boxWidth * 0.567;
    },
    isCurrent(): boolean {
      return this.$store.getters.telopCardId == this.cardId;
    },
    iframeUrl(): String {
      if (this.$store.getters.telopCardId != this.cardId) return "";
      let url = `/telops/${this.pageName}/?message=${
        this.$store.getters.isDemoMessageExit
          ? this.$store.getters.demoMessage
          : this.sampleMessage
      }`;
      if (process.env.NODE_ENV == "development")
        url =
          "http://test.teloppy.com.s3-website-ap-northeast-1.amazonaws.com" +
          url;
      return url;
    },
  },
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";

.iframe-embed {
  height: 300px;
  iframe {
    pointer-events: none;
    width: 100%;
  }
  &_inactive {
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      background-color: rgba(#000000, 0.3);
      display: block;
      left: 0;
      top: 0;
    }
  }
  &_reload {
    position: absolute;
    display: block;
    top: 10px;
    left: 10px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s;
    border-radius: 3px;
    opacity: 0.7;
    padding: 10px;
    background-color: #333333;
    svg {
      font-size: 18px;
      color: #ffffff;
    }
    &:hover {
      opacity: 1;
    }
  }
  &_submit {
    z-index: 1;
    left: 0;
    right: 0;
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
    button {
      border: 2px solid #ffffff;
      font-weight: bold;
      font-size: 18px;
      background: none;
      border-radius: 100vh;
      transition: all 0.3s;
      cursor: pointer;
      padding: 8px 60px 8px 30px;
      position: relative;
      color: #ffffff;
      svg {
        pointer-events: none;
        position: absolute;
        right: 20px;
        bottom: 0;
        top: 0;
        margin: auto 0;
        transition: right 0.3s;
      }
      &:hover {
        border-color: $main02_c;
        color: $main02_c;
        svg {
          right: 15px;
        }
      }
    }
  }
}

@include touchDevice() {
  .iframe-embed {
    iframe {

    }
  }
} ;
</style>
