<template>
  <div class="link-generate">
    <div
      class="link-generate_input"
      v-bind:class="{
        'link-generate_input--error': message.length > characterLimit,
      }"
    >
      <input
        type="text"
        :placeholder="
          'テキストを入力してください(最大' + characterLimit + '文字)'
        "
        v-model="message"
      />
      <button
        @click="generateUrl()"
        id="generate-url-button"
        class="link-generate_input_button"
        v-bind:class="{
          'link-generate_input_button--disable':
            !message || message.length > characterLimit,
          'link-generate_input_button--loading': isUrlGenerateWating,
        }"
      >
        テロップを生成
      </button>
    </div>
    <transition name="downfade">
      <p class="link-generate_error" v-show="message.length > characterLimit">
        (※)このテロップの文字数は最大{{ characterLimit }}文字までです
      </p>
    </transition>
    <transition name="downfade">
      <div class="link-generate_url" v-show="messageParameter">
        <transition name="upfade">
          <p
            class="link-generate_url_message"
            v-if="isUrlGenerateCompleteNotifing"
          >
            テロップを生成しました！
          </p>
        </transition>
        <div class="link-generate_url_link">
          <input type="text" readonly :value="fullURL" />
        </div>
        <div
          class="link-generate_url_buttons link-generate_url_buttons--action"
        >
          <button
            class="
              link-generate_url_buttons_item
              link-generate_url_buttons_item--demo
            "
            id="play-demo-button"
            @click="playDemoByInputMessage()"
          >
            <font-awesome-icon :icon="['fas', 'play-circle']" />
            <span style="font-size: 14px">デモで見る</span>
          </button>
          <button
            class="
              link-generate_url_buttons_item
              link-generate_url_buttons_item--copy
            "
            id="copy-clipboard-button"
            @click="copyClipboard()"
          >
            <transition name="upfade">
              <span class="baloon baloon--pc" v-if="isCopyCompleted"
                >コピーしました！</span
              >
            </transition>
            <font-awesome-icon :icon="['fas', 'copy']" />
            <span style="font-size: 14px">URLをコピー</span>
          </button>
          <button
            class="
              link-generate_url_buttons_item link-generate_url_buttons_item--mp4
            "
            id="gif-button"
            @click="generateFile('mp4')"
            v-if="!isBrowserOnly"
          >
            <span style="font-size: 14px">MP4を生成</span>
          </button>

          <button
            class="
              link-generate_url_buttons_item link-generate_url_buttons_item--gif
            "
            id="gif-button"
            @click="generateFile('gif')"
            v-if="!isBrowserOnly"
          >
            <span style="font-size: 14px">GIFを生成</span>
          </button>
        </div>
        <transition name="fade">
          <span class="baloon baloon--sp" v-if="isCopyCompleted"
            >コピーしました！</span
          >
        </transition>
        <div class="link-generate_url_buttons link-generate_url_buttons--sns">
          <a
            class="
              link-generate_url_buttons_item
              link-generate_url_buttons_item--line
            "
            :href="`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
              fullURL
            )}`"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'line']" />
          </a>
          <a
            class="
              link-generate_url_buttons_item
              link-generate_url_buttons_item--facebook
            "
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              fullURL
            )}`"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              fullURL
            )}%0a%0a&hashtags=Teloppy,テロッピー`"
            class="
              link-generate_url_buttons_item
              link-generate_url_buttons_item--twitter
            "
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'twitter']"
          /></a>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "/assets/scss/mixin";
.link-generate {
  &_input {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    position: relative;

    input {
      width: 100%;
      display: block;
      flex: 1 1 auto;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 20px;
      border-radius: 5px;
      outline: none;
      border: 2px solid $main01_c;
    }
    &--error {
      input {
        border-color: $error_c;
      }
    }
    &_button {
      display: block;
      position: relative;
      font-weight: bold;
      cursor: pointer;
      border: none;
      color: #ffffff;
      font-size: 16px;
      flex: 0 0 auto;
      padding: 0 10px;
      margin-left: 5px;
      background-color: $main01_c;
      transition: all 0.3s;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-position: center;
      border-bottom: 4px solid darken($main01_c, 20%);
      &:hover {
        opacity: 0.8;
      }
      &--loading {
        transition: none;
        color: transparent;
        background-image: url("~assets/img/fix/loading3.gif");
        background-size: 48px auto;
      }
      &--disable {
        cursor: not-allowed;
        color: #cccccc;
        background-color: #999999;
        opacity: 1 !important;
        pointer-events: none;
        border-bottom: 4px solid darken(#999999, 20%);
      }
    }
  }
  &_url {
    position: relative;
    text-align: center;
    &_message {
      padding: 5px 20px;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      text-align: center;
      border-radius: 6px;
      border: 2px solid $main02_c;
      bottom: calc(100% + 10px);
      left: 0;
      background-color: $main02_c;
      margin: 0 auto;
      &::after {
        position: absolute;
        left: 10px;
        bottom: -5px;
        margin: 0 auto;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        background-color: $main02_c;
        content: "";
        display: block;
      }
    }
    &_link {
      input {
        border-radius: 7px;
        padding: 10px 10px;
        border: 2px solid #dddddd;
        width: 100%;
        box-sizing: border-box;
        flex: 1 1 auto;
        outline: none;
        color: #666666;
      }
      margin-bottom: 10px;
    }
    &_buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &--sns {
        margin-top: 10px;
        * {
          font-size: 22px;
        }
      }
      &_item {
        padding: 0;
        line-height: 1;
        display: block;
        background: none;
        border: 1px solid #cccccc;
        border: none;
        cursor: pointer;
        flex: 0 0 auto;
        border: none;
        font-size: 18px;
        transition: all 0.3s;
        margin-left: 10px;
        color: #999999;
        &--twitter {
          &:hover {
            color: #1da1f2;
          }
        }
        &--line {
          &:hover {
            color: #00b900;
          }
        }
        &--facebook {
          &:hover {
            color: #4867aa;
          }
        }
        &--copy {
          font-weight: bold;
          &:hover {
            color: $main03_c;
          }
        }
        &--mp4,
        &--gif {
          font-weight: bold;
          &:hover {
            color: $main01_c;
          }
        }
        &--mp4,
        &--gif {
          vertical-align: middle;
          font-weight: bold;
          position: relative;
          &::before {
            padding: 4px 3px;
            border-radius: 3px;
            background-color: #999;
            display: inline-block;
position: relative;
            font-size: 8px;
top:-2px;
            color: #ffffff;
            margin-right: 5px;
            font-weight: bold;
            content: "";
            transition: all 0.3s;
          }
          &:hover {
            &::before {
              color: #fff;
              background-color: $main01_c;
            }
          }
        }
        &--mp4 {
          &::before {
            content: "MP4";
          }
        }
        &--gif {
          &::before {
            padding: 4px 5px;
            content: "GIF";
          }
        }
        &--demo {
          font-weight: bold;
          &:hover {
            color: #e60026;
          }
        }
        position: relative;
      }
    }
  }
  &_error {
    color: $error_c;
  }
}

.baloon {
  bottom: calc(100% + 10px);
  background-color: $main03_c;
  position: absolute;
  width: 120px;
  right: -50%;
  margin: 0 auto;
  color: #666666;
  text-align: center;
  background: #dddddd;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  z-index: 1;

  &--sp {
    display: none;
  }
}

@include touchDevice() {
  .link-generate {
    &_input {
      margin-bottom: 0;
      display: block;
      flex-wrap: nowrap;
      position: relative;
      input {
        width: 100%;
        font-size: 14px;
        padding: 10px 10px;
        margin-bottom: 15px;
      }
      &_button {
        width: 100%;
        margin: 0 auto;
        padding: 10px 30px;
        box-sizing: border-box;
        max-width: 100%;
        display: block;
      }
    }
    &_url {
      margin-top: 20px;
      &_link {
        input {
          border-radius: 7px;
          padding: 10px 10px;
          border: 2px solid #dddddd;
          width: 100%;
          box-sizing: border-box;
          flex: 1 1 auto;
          outline: none;
          color: #666666;
        }
        margin-bottom: 10px;
      }
      &_buttons {
        &--action {
          justify-content: space-between;
          flex-wrap: wrap;
          box-sizing: border-box;
          overflow: auto;
          width: 100%;
          padding: 5px 0 15px;
          svg {
            margin-top: 2px;
          }
          .link-generate_url_buttons_item {
            width: 50%;
            margin: 0 0 3px;
            text-align: left;
          }
        }
        &--sns {
        }
        &_item {
          color: #666666;
          &--line {
            color: #00b900;
          }
          &--facebook {
            color: #4867aa;
          }
          &--twitter {
            color: #1da1f2;
          }
          &--gif,
          &--mp4 {
            &::before {
              background-color: #666666;
            }
          }
        }
      }
    }
  }
  .baloon {
    bottom: auto;
    position: relative;
    width: 100%;
    right: auto;
    box-sizing: border-box;

    &--pc {
      display: none;
    }
    &--sp {
      display: block;
    }
  }
} ;
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

const domain = "https://teloppy.com";

export default Vue.extend({
  props: {
    pageName: String,
    characterLimit: Number,
    cardId: String,
    isBrowserOnly: Boolean,
  },
  data() {
    return {
      message: "",
      messageParameter: "",
      isCopyCompleted: false,
      isUrlGenerateWating: false, //URLの生成待ち
      isUrlGenerateCompleteNotifing: false, //URLの生成完了の通知中かどうか
    };
  },
  computed: {
    fullURL(): String {
      return (
        domain +
        "/telops/" +
        this.pageName +
        "/?message=" +
        encodeURIComponent(this.messageParameter)
      );
    },
  },
  methods: {
    /**URLの生成ボタンが押されたとき */
    async generateUrl() {
      if (!this.message || this.isUrlGenerateCompleteNotifing) return;
      try {
        this.messageParameter = "";
        this.isUrlGenerateWating = true;
        const result = await axios.get(
          `${this.$config.encryptApiUrl}/?message=${encodeURIComponent(
            this.message
          )}&pageName=${this.pageName}`
        );
        this.isUrlGenerateWating = false;
        this.messageParameter = result.data;
        this.$store.dispatch("addEncryptedPage", this.pageName); //テロップの使用履歴を保存する
        await this._generateUrlCompleteNotice();
      } catch (e) {
        console.warn(e);
      }
    },
    /**URLの生成が終わったことを通知する */
    async _generateUrlCompleteNotice() {
      this.isUrlGenerateCompleteNotifing = true;
      await new Promise<void>((r) => setTimeout(r, 1500));
      this.isUrlGenerateCompleteNotifing = false;
    },
    /**クリップボードにコピーボタンが押されたとき */
    async copyClipboard() {
      if (this.isCopyCompleted) return;
      try {
        await navigator.clipboard.writeText(
          domain +
            "/telops/" +
            this.pageName +
            "/?message=" +
            encodeURIComponent(this.messageParameter)
        );
        this._copyClipboardCompleteNotice();
      } catch (e) {
        window.alert("コピーに失敗しました");
        console.warn(e);
      }
    },
    /**クリップボードにコピーしたことを通知する */
    async _copyClipboardCompleteNotice() {
      this.isCopyCompleted = true;
      await new Promise<void>((r) => setTimeout(r, 1500));
      this.isCopyCompleted = false;
    },
    /**デモを再生する */
    playDemoByInputMessage() {
      this.$store.dispatch("setTelopCardId", this.cardId);
      this.$store.dispatch(
        "setDemoMessage",
        encodeURIComponent(this.messageParameter)
      );
    },
    /**GIF画像を生成し、 */
    async generateFile(fileType: string) {
      this.$store.dispatch("openModal", {
        pageName: this.pageName,
        message: encodeURIComponent(this.messageParameter),
        fileType: fileType,
      });
    },
  },
});
</script>
