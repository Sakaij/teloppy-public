<template>
  <div class="top-container">
    <div class="top-header--sp">
      <h1 class="top-header_logo">
        <nuxt-link to="/">TeloppyでGIF、MP4のメッセージ動画を作成。</nuxt-link>
      </h1>
    </div>

    <div class="top-catch">
      <div class="top-catch_icon">
        <img src="~/assets/img/pages/logo1.png" width="100" alt="" />
      </div>
      <div class="top-catch_flex">
        <div class="top-catch_right">
          <div class="top-catch_browser" v-if="$mq !== 'md'">
            <div class="top-catch_browser_main">
              <transition name="fade">
                <iframe
                  :src="sampleMessageUrl"
                  frameborder="0"
                  height="300"
                  v-show="sampleMessageUrl"
                ></iframe>
              </transition>
            </div>
            <img
              src="~assets/img/pages/smartphone-bg.png"
              width="300"
              height="606"
              alt=""
            />
          </div>
        </div>
        <div class="top-catch_left" >
          <div class="top-catch_sub">メッセージ動画(GIF・MP4)作成サイト</div>
          <div class="top-catch_main">
            <h1>
              <img
                src="~assets/img/pages/catch-logo2.png"
                alt="TeloppyでGIF、MP4のメッセージ動画を作成。"
              />
            </h1>
          </div>
          <div class="top-catch_link">
            <div class="view-more">
              <nuxt-link to="about">Teloppyとは？</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-main">
      <div class="top-main_head">
        <HeadLink currentCategory="top" />
      </div>

      <div class="top-main_flex">
        <div class="top-main_flex_left">
          <div class="top-cards" v-show="isReffringTelop" ref="refferingTelop">
            <PartsM-Title theme="2">{{
              isSharingTelop ? "紹介のテロップ" : "今見たテロップ"
            }}</PartsM-Title>
            <PartsLoading v-if="!referringPage" />
            <div class="top-cards_single">
              <TelopCardItem :pageInfo="referringPage" />
            </div>
          </div>
          <div class="top-cards">
            <h2 class="top-cards_title top-cards_title--1">新着テロップ</h2>
            <PartsLoading v-if="newsArray.length == 0" />
            <hooper :settings="hooperMiddleSettings" class="top-cards_slider">
              <slide
                class="top-cards_slider_item"
                v-for="(page, index) in newsArray"
                :key="index"
              >
                <TelopCardItem :pageInfo="page" />
              </slide>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
              <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
            <div class="view-more">
              <nuxt-link to="news">もっと見る</nuxt-link>
            </div>
          </div>
        </div>
        <div class="top-main_flex_right" v-if="$mq === 'lg'">
          <div class="side-twitter">
            <h3 class="side-twitter_title">テロッピーTwitter</h3>
            <PartsTwitterIframe />
          </div>
        </div>
      </div>
      <div class="spside" v-if="$mq === 'md'">
        <div class="spside-twitter">
          <h3 class="spside-twitter_title">テロッピーTwitter</h3>
          <PartsTwitterIframe />
        </div>
      </div>
      <div class="top-cards">
        <h2 class="top-cards_title top-cards_title--2">人気のテロップ</h2>
        <PartsLoading v-if="popularArray.length == 0" />
        <hooper :settings="hooperLargeSettings" class="top-cards_slider">
          <slide
            class="top-cards_slider_item"
            v-for="(page, index) in popularArray"
            :key="index"
          >
            <TelopCardItem :pageInfo="page" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
        <div class="view-more">
          <nuxt-link to="popular">もっと見る</nuxt-link>
        </div>
      </div>

      <div class="top-cards">
        <h2 class="top-cards_title top-cards_title--3">使用したテロップ</h2>
        <PartsLoading v-if="historyArray.length == 0 && isHistoryExist" />
        <hooper
          :settings="hooperLargeSettings"
          v-if="isHistoryExist"
          class="top-cards_slider"
        >
          <slide
            class="top-cards_slider_item"
            v-for="(page, index) in historyArray"
            :key="index"
          >
            <TelopCardItem :pageInfo="page" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
        <div class="view-more" v-if="isHistoryExist">
          <nuxt-link to="history">もっと見る</nuxt-link>
        </div>

        <p class="top-cards_history_notelop" v-if="!isHistoryExist">
          まだ使用したテロップはありません。
        </p>
      </div>

      <FileDownloadModal />
    </div>
    <div class="top-side">
      <div class="container">
        <div class="top-side_text">
          テロップは、GIF・MP4動画を生成する方法と、発行されたURLを使いブラウザにて表示する方法があります。URLの場合は、テロップを生成し「URLをコピー」ボタンを押すとURLがコピーされますので、そのURLを送りたい相手に送ってご利用ください。
        </div>
        <div class="top-side_text">
          GIF動画はファイルサイズが大きくなりやすいので、サイズの大きさを小さくしたい場合はMP4にて動画を作成してください。
        </div>
        <div class="top-side_text">
          テロップの特性や都合により、GIF・MP4動画の生成はできないテロップがありますが、発行されたURLをコピーしブラウザにて表示する方法でご利用ください。
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
/**@ts-ignore */
import {
  PageListQueryByCreatedAt,
  PageListQueryByEncryptedCount,
  PageListQueryByHistory,
  getPageByPageName,
} from "~/utils/pageQuery";

import { TagManager } from "~/utils/tagManager";

import fullHeight from "~/mixins/fullHeight";
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from "hooper";

const catchTelopsArray = [
  {
    message:
      "U2FsdGVkX19SNhECf31Ks2FHjJXKdrDMTtmLN9bOimT8SNIBu%2BhWpOU%2FpqbSgMFg",
    pageName: "9xm3vvih",
  },
  {
    message: "U2FsdGVkX1%2BRBZhJJPo%2FsaCzAMLbb75dAtVrIShKt88%3D",
    pageName: "mdwjkk5i",
  },
  {
    message:
      "U2FsdGVkX19URP5X9FsOEF0rTB3MzizNcqGAIePs0yBO56XC5BqZ%2FaiMUW0%2BKfqqI0Mq14yPHUGNFTFa3sC86Q%3D%3D",
    pageName: "fxrc44hu",
  },
];

export default Vue.extend({
  mixins: [fullHeight],
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
  },
  data() {
    return {
      sampleMessageUrl: "",
      referringPage: {},
      newsArray: Array(),
      popularArray: Array(),
      historyArray: Array(),
      isHistoryExist: true, //使用履歴が存在するかどうか
      isReffringTelop: false, //TOPページにテロップを見てからきたかどうか
      isSharingTelop: false, //共有テロップかどうか
      hooperMiddleSettings: {
        itemsToShow: 1.07,
        centerMode: true,
        wheelControl: false,
        breakpoints: {
          1080: {
            itemsToShow: 1.5,
            centerMode: false,
          },
          1500: {
            itemsToShow: 1.868,
            centerMode: false,
          },
        },
      },
      hooperLargeSettings: {
        itemsToShow: 1.07,
        centerMode: true,
        wheelControl: false,
        breakpoints: {
          1080: {
            itemsToShow: 2.2,
            centerMode: false,
          },
          1500: {
            itemsToShow: 2.67,
            centerMode: false,
          },
        },
      },
    };
  },
  async created() {
    if(window.innerWidth > 1080) this._sampleMessage();
    this._referenceProcess();
    this._newsProcess();
    this._popularProcess();
    this._historyProcess();
  },
  mounted() {
    const tag = TagManager.instance;
    const $telop = this.$refs.refferingTelop;
    if (
      this.isSharingTelop &&
      this.isReffringTelop &&
      $telop instanceof Element
    ) {
      window.scroll({
        top: $telop.getBoundingClientRect().top - 15,
        behavior: "smooth",
      });
    }
  },
  methods: {
    /**
     * サンプルメッセージを流す処理
     * ・8周したら止める
     */
    _sampleMessage() {

      const catchTelopsUrls = catchTelopsArray.map((v, i) => {
        let url = `/telops/${v.pageName}/?message=${v.message}`;
        if (process.env.NODE_ENV == "development")
          url =
            "http://test.teloppy.com.s3-website-ap-northeast-1.amazonaws.com" +
            url;
        return url;
      });
      let turnCount = 0;
      const messageReplace = async (array: Array<string>) => {
        turnCount++;
        await array.reduce(
          async (p: Promise<void>, e: string, index: number) => {
            await p;
            this.sampleMessageUrl = e;
            await new Promise<void>((resolve) => setTimeout(resolve, 7500));
            this.sampleMessageUrl = "";
            await new Promise<void>((resolve) => setTimeout(resolve, 2000));
            if (array.length == index + 1 && turnCount < 8)
              messageReplace(array);
            return p;
          },
          Promise.resolve()
        );
      };
      messageReplace(catchTelopsUrls);
    },
    /**
     * 新着クエリに係る処理
     * ・APIにアクセスして、newsArrayに配列を格納
     * ・新着上位３件テロップのURLをsampleMessageUrlに時間差で入れ替えて、サンプルテロップのスライドショーを実現（メモリリーク防止のため最大で８周まで）
     */
    async _newsProcess() {
      try {
        const queryCreatedAt = new PageListQueryByCreatedAt({
          apiUrl: this.$config.apiUrl,
        });
        const result = await queryCreatedAt.getTopItems();
        this.newsArray = result;
      } catch (e) {
        this.newsArray = [];
        console.warn(e);
      }
    },
    /**
     * 人気順クエリに係る処理
     * ・APIにアクセスして、popularに配列を格納
     */
    async _popularProcess() {
      try {
        const queryEncryptedCount = new PageListQueryByEncryptedCount({
          s3Url: this.$config.s3ResourceUrl,
        });
        const result = await queryEncryptedCount.getTopItems();
        this.popularArray = result;
      } catch (e) {
        this.popularArray = [];
        console.warn(e);
      }
    },
    /**
     * 履歴処理に係る処理
     * ・APIにアクセスして、historyに配列を格納
     */
    async _historyProcess() {
      try {
        const queryHistory = new PageListQueryByHistory({
          pagesString: this.$store.getters.encryptedPages,
          apiUrl: this.$config.apiUrl,
        });

        const result = await queryHistory.getTopItems();
        this.historyArray = result;
        if (this.historyArray.length == 0) this.isHistoryExist = false;
      } catch (e) {
        this.historyArray = [];
        this.isHistoryExist = false;
        console.warn(e);
      }
    },
    /**
     * 参照テロップに関わる処理
     */
    async _referenceProcess() {
      try {
        const ref = this.$route.query.reference_telopid,
          isSharing = this.$route.query.is_sharing;
        if (typeof ref === "string") {
          this.isReffringTelop = true;
          this.isSharingTelop = isSharing == "true";
          const result = await getPageByPageName(ref, this.$config.apiUrl);
          if (result != null) {
            this.referringPage = result;
          } else {
            this.isReffringTelop = false;
            this.isSharingTelop = false;
          }
        }
      } catch (e) {
        this.isReffringTelop = false;
        this.isSharingTelop = false;
        console.warn(e);
      }
    },
  },
});
</script>


<style scoped lang="scss">
@import "/assets/scss/mixin";

.top-catch {
  overflow: hidden;
  box-sizing: border-box;
  padding: 50px 0 50px;
  position: relative;
  width: 100%;
  z-index: 0;
  background: linear-gradient(125deg, $main01_c, #b06ab3);
  position: relative;
  transition: all 0.3s linear;
  &_main,
  &_sub {
    z-index: 1;
    position: relative;
  }
  &_main {
    margin-bottom: 60px;
  }
  &_sub {
    margin-bottom: 25px;
    font-weight: bold;
    color: #fff;
    font-size: 24px;
    
  }
  &_link {
    .view-more{
      a {
        background-color:#ffffff;
        color:$main01_c;
        width: 100%;
        box-sizing: border-box;
        font-size: 20px;
        padding-top:10px;
        padding-bottom: 10px;
        font-weight: bold;
        &::after{
          border-color:$main01_c;
        }
      }
    }
  }
  &_flex {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row-reverse;
  }
  &_left {
    flex: 0 1 auto;
    text-align: center;
  }
  &_right {
    margin-left: 10%;
    flex: 0 0 auto;
  }
  &_browser {
    margin: auto 0;
    border-radius: 60px;
    overflow: hidden;
    width: 300px;
    height: 606px;
    box-shadow: 0 0 20px rgba(#000000, 0.2);
    background-size: 100% auto;
    position: relative;
    box-sizing: border-box;
    padding: 10px 15px;
    &_main {
      border-radius: 30px;
      background-color: #ffffff;
      width: 100%;
      height: 100%;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &_sp {
    display: none;
  }
  &_icon {
    img {
      z-index: 1;
      position: absolute;
      left: 21%;
      bottom: 355px;
      display: none;
      height: auto;
    }
  }
}

.top-main {
  padding: 40px 0 40px;
  width: 1500px;
  max-width: 96%;
  margin: 0 auto;
  &_flex {
    display: flex;
    justify-content: space-between;
    &_left {
      width: 70%;
    }
    &_right {
      width: 27%;
    }
  }
  &_head {
    &_categorylist {
      margin-bottom: 25px;
    }
    margin-bottom: 40px;
  }
}

.top-cards {
  margin-bottom: 40px;
  &_slider {
    margin-bottom: 20px;
  }
  &_title {
    box-sizing: border-box;
    margin-bottom: 20px;
    padding-left: 25px;
    position: relative;
    color: #333;
    font-size: 22px;
    &::after {
      content: "";
      display: block;
      border-radius: 5px;
      background-color: $main02_c;
      position: absolute;
      bottom: 0;
      top: 0;
      width: 5px;
      height: 100%;
      margin: auto 0;

      left: 0;
    }
    &--1 {
      &::after {
        background-color: $main02_c;
      }
    }
    &--2 {
      &::after {
        background-color: $main04_c;
      }
    }
    &--3 {
      &::after {
        background-color: $main05_c;
      }
    }
  }
  ::v-deep {
    .hooper {
      height: auto;
      padding-bottom: 40px;
    }
    .hooper-prev,
    .hooper-next {
      background: linear-gradient($main01_c, #3e5bfe);
      background: $main01_c;
      border-radius: 50%;
      box-shadow: 0 0 3px #666;
      padding: 7px;
      line-height: 1;
      transition: opacity 0.3s;
      svg {
        fill: #fff;
      }
      button {
        margin-top: 3px;
      }
    }
    .hooper-prev {
      left: 10px;
    }
    .hooper-next {
      right: 10px;
    }
    .hooper-slide {
      padding-right: 20px;
      .link-generate_url {
        display: none;
      }
      .card-item_supplement {
        display: none;
      }
      &.is-active {
        .link-generate_url {
          display: block;
        }
        .card-item_supplement {
          display: block;
        }
      }
    }
    .hooper-indicators {
      li {
        line-height: 1;
        button {
          border-radius: 50%;
          background-color: #fff;
          border: 1px solid #ccc;
          width: 13px;
          height: 13px;
          margin: 0 4px;

          &.is-active {
            border-color: $main01_c;
            background-color: $main01_c;
          }
          span {
            display: none;
          }
        }
      }
    }

    .ps {
      width: 100%;
    }
  }
  &_single {
    width: 550px;
    max-width: 100%;
  }
  &_history {
    &_notelop {
      text-align: center;
      padding: 30px 0;

      font-weight: bold;
      color: #666666;
      font-size: 18px;
    }
  }
}

.top-header {
  &--sp {
    display: none;
  }
}

.side-twitter {
  &_title {
    font-weight: bold;
    margin-bottom: 20px;
  }
}
.view-more {
  text-align: center;
  a {
    background-color: $main01_c;
    color: #fff;
    font-weight: bold;
    border-radius: 50px;
    padding: 5px 50px 5px 30px;
    text-decoration: none;
    position: relative;
    transition: all 0.3s;
    display: inline-block;
    &::after {
      content: "";
      display: block;
      right: 15px;
      top: 0;
      bottom: 0;
      position: absolute;
      width: 7px;
      height: 7px;
      border-top: 2px solid #ffffff;
      border-right: 2px solid #ffffff;
      transform: rotate(45deg);
      margin: auto 0;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}

.top-side {
  background: rgba($main01_c, 0.1);
  padding: 50px 0;
  &_text {
    font-weight: bold;
    min-height: 30px;
    padding-left: 35px;
    background: url(~/assets/img/pages/title-logo5.png) no-repeat top 3px left;
    background-size: 20px auto;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

@include touchDevice() {
  .top-header {
    &--pc {
      display: none;
    }
    &--sp {
      display: block;
    }
    &_logo {
      position: absolute;
      top: 0;
      left: 0;
      background: url(~assets/img/pages/top-logo.png) no-repeat;
      width: 130px;
      height: 31px;
      text-indent: -9999px;
      display: block;
      transition: all 0.3s;
      left: 4%;
      text-indent: -9999px;
      top: 10px;
      z-index: 1;
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
  .top-catch {
    overflow: hidden;
    padding: 80px 3% 50px;
    box-sizing: border-box;
    height: auto;
    &::after {
      background-size: 429px 123px;
      height: 123px;
    }
    &_main,
    &_sub {
    
    }
    &_link{
      .view-more{
        a{
          max-width: 100%;
          width:auto;
          padding: 5px 75px;
          font-size: 14px;
        }
      }
    }
    &_sub{
      font-size: 14px;
      margin-bottom: 20px;
    }
    &_main{
      margin-bottom: 30px;
      img{
        width: 50%;
        height: auto;
      }
    }
    &_sp {
      z-index: 1;
      display: block;
      position: absolute;
      padding: 15px;
      box-sizing: border-box;
      background-color: rgba(#ffffff, 0.5);
      left: 0;
      right: 0;
      margin: 0 auto;
      font-size: 16px;
      border-radius: 10px;
      text-align: left;
      font-weight: bold;
      color: #666666;
      bottom: 2%;
      width: 92%;
    }
    &_flex {
      display: block;
    }
    &_right {
      margin-left: 0;
      display: none;
    }
    &_left{

    }
    &_browser {
      width: 300px;
      height: 606px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      @media screen and (max-height: 600px) {
        border-radius: 45px;
        width: 250px;
        height: 505px;
      }
    }
    &_icon {
      img {
        left: 10px;
        width: 50px;
        bottom: 26px;
        height: auto;
      }
    }
  }

  .top-main {
    padding: 20px 0 40px;
    max-width: 100%;
    width: 100%;
    &_flex {
      display: block;
      justify-content: space-between;
      &_left {
        width: 100%;
      }
      &_right {
        width: 100%;
      }
    }
    &_head {
      &_categorylist {
        margin-bottom: 15px;
      }
      &_taglist {
        padding: 0 10px;
        box-sizing: border-box;
        overflow: auto;
        ::v-deep {
          .tag-list {
            flex-wrap: nowrap;
            &_item {
              flex: 0 0 auto;
            }
          }
        }
      }
    }
  }
  .top-cards {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 40px;
    &_title {
      width: 94%;
      margin-left: auto;
      margin-right: auto;
    }
    &_scroll {
      width: 100%;
      overflow: hidden;
    }
    &_single {
      width: 100%;
      padding: 0 3%;
      box-sizing: border-box;
    }
    ::v-deep {
      .hooper {
        height: auto;
        padding-bottom: 40px;
      }
      .hooper-prev,
      .hooper-next {
        padding: 5px;
      }
      .hooper-prev {
        left: 0px;
      }
      .hooper-next {
        right: 0px;
      }
      .hooper-slide {
        padding: 0 3px;
        .link-generate_url {
          display: none;
        }
        .card-item_supplement {
          display: none;
        }
        &.is-active {
          .link-generate_url {
            display: block;
          }
          .card-item_supplement {
            display: block;
          }
        }
      }
      .hooper-indicators {
        li {
          button {
            width: 10px;
            height: 10px;
          }
        }
      }

      .ps {
        width: 100%;
      }
    }
  }
  .top-side {
    &_text {
      font-size: 14px;
      line-height: 1.4;
    }
  }
  .spside {
    padding: 0 3%;
    margin-bottom: 40px;
  }

  .spside-twitter {
    &_title {
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
/* Animation */
</style>