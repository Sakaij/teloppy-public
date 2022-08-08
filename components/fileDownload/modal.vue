<template>
  <transition name="fade">
    <div class="download-modal" v-if="this.$store.getters.isModalOpen">
      <transition name="upfade">
        <div
          class="download-modal__wrapper download-modal__wrapper--loading"
          v-if="isDownloading"
          key="loading"
        >
          <h3 class="download-modal__title">
            {{
              this.$store.getters.modalFileType.toUpperCase()
            }}動画を生成中・・・
          </h3>
          <h3 class="download-modal__sub">この処理は20秒~30秒ほどかかります</h3>
          <PartsLoading />
        </div>
        <div
          class="download-modal__wrapper download-modal__wrapper--confirm"
          v-else-if="!this.resultFileName && !this.isError"
          key="start"
        >
          <h3 class="download-modal__title">
            {{
              this.$store.getters.modalFileType.toUpperCase()
            }}動画を生成しますか？
          </h3>
          <h3 class="download-modal__checkbox">
            <label>
              <input type="checkbox" v-model="isVertical" /> 縦長にする
            </label>
          </h3>
          <div class="download-modal__buttons">
            <div
              class="
                download-modal__buttons__item
                download-modal__buttons__item--start
              "
            >
              <button @click="start()">はい</button>
            </div>
            <div
              class="
                download-modal__buttons__item
                download-modal__buttons__item--close
              "
            >
              <button @click="close()">キャンセル</button>
            </div>
          </div>
        </div>
        <div
          class="download-modal__wrapper download-modal__wrapper--result"
          v-else-if="this.resultFileName && !this.isError"
          key="donwload"
        >
          <h3 class="download-modal__title download-modal__title--result">
            {{
              this.$store.getters.modalFileType.toUpperCase()
            }}動画が生成されました！
          </h3>
          <div class="download-modal__buttons">
            <div
              class="
                download-modal__buttons__item
                download-modal__buttons__item--download
              "
            >
              <a
                :href="'https://teloppy.com/download/' + this.resultFileName"
                :download="this.resultFileName"
                target="black"
                >ダウンロード</a
              >
            </div>
            <div
              class="
                download-modal__buttons__item
                download-modal__buttons__item--close
              "
            >
              <button @click="close()">閉じる</button>
            </div>
          </div>
        </div>
        <div
          class="download-modal__wrapper download-modal__wrapper--error"
          v-else
          key="error"
        >
          <h3 class="download-modal__title download-modal__title--error">
            エラーが発生しました
          </h3>
          <h3 class="download-modal__sub download-modal__sub--error">
            時間をおいてリトライしてください。<br />文字数を減らすと解決する場合があります。
          </h3>
          <div class="download-modal__buttons">
            <div
              class="
                download-modal__buttons__item
                download-modal__buttons__item--close
              "
            >
              <button @click="close()">閉じる</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>


<style scoped lang="scss">
@import "/assets/scss/mixin";

.download-modal {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(#000000, 0.2);
  width: 100%;
  height: 100%;
  z-index: 10;
  &__wrapper {
    background-color: #ffffff;
    width: 400px;
    height: 250px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    box-shadow: 0 2px 4px rgba(#999999, 0.5);
    z-index: 1;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &--confirm {
      padding-top: 100px;
    }
    &--loading {
      padding-top: 80px;
    }
    &--result {
      padding-top: 100px;
    }
    &--error {
      padding-top: 100px;
    }
  }
  &__checkbox {
    font-size: 14px;
    margin-top: 10px;
    color: $main01_c;
    text-align: center;
  }

  &__title {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: $main01_c;
    &--error {
      color: $error_c;
    }
  }
  &__sub {
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
    color: #999999;
  }
  &__buttons {
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    &__item {
      margin: 0 5px;
      a,
      button {
        cursor: pointer;
        border-radius: 2px;
        background-color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 15px;
        box-sizing: border-box;
        line-height: 1.6;
        display: block;
        transition: opacity 0.3s;
        border: none;
        text-decoration: none;
        &:hover {
          opacity: 0.8;
        }
      }
      &--close {
        button {
          border: 1px solid $main01_c;
          color: $main01_c;
        }
      }
      &--download,
      &--start {
        a,
        button {
          background-color: $main01_c;
          color: #ffffff;
        }
      }
    }

    &__item {
    }
  }
}

@include touchDevice() {
  .download-modal {
    &__wrapper {
      max-width: 90%;
    }
  }
} ;
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  methods: {
    close() {
      this.isVertical = false;
      this.isDownloading = false;
      this.isError = false;
      this.resultFileName = "";
      this.$store.dispatch("closeModal");
    },
    async start() {
      if (
        !this.$store.getters.modalPageName ||
        !this.$store.getters.modalMessage ||
        !this.$store.getters.modalFileType
      ) {
        this.close();
        return;
      }
      this.isDownloading = true;
      try {
        const result = await axios.post<string>(
          "https://9ahoq973r7.execute-api.ap-northeast-1.amazonaws.com/Prod/recorder",
          {
            isVertical: this.isVertical,
            pageName: this.$store.getters.modalPageName,
            message: this.$store.getters.modalMessage,
            fileType: this.$store.getters.modalFileType,
          }
        );
        this.resultFileName = result.data;
      } catch (e) {
        this.isError = true;
      }
      this.isDownloading = false;
    },
  },
  data() {
    return {
      isVertical: false,
      isDownloading: false,
      isError: false,
      resultFileName: "",
    };
  },
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";
</style>
