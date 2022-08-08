<template>
  <div>
    <div class="card-item" v-if="pageInfo">
      <div class="card-item_embed">
        <h4 class="card-item_title">{{ pageInfo.pageTitle }}</h4>
        <div class="card-item_embed_wrap" v-if="pageInfo.type == 'ActivePage'">

          <TelopCardIframeEmbed
            :pageName="pageInfo.pageName"
            :sampleMessage="pageInfo.sampleMessage"
            :cardId="cardId"
          />
        </div>
      </div>
      <div class="card-item_generator" v-if="pageInfo.type == 'ActivePage'">
        <TelopCardLinkGenerate :pageName="pageInfo.pageName" :cardId="cardId" :isBrowserOnly="pageInfo.isBrowserOnly" :characterLimit="pageInfo.characterLimit || 30" />
      </div>
      <div class="card-item_removed" id="removed-message" v-else>
        <p class="card-item_removed_message">既に削除されたテロップです</p>
      </div>
      <div class="card-item_supplement" v-if="pageInfo.supplement">
        <p class="card-item_supplement_message">{{ pageInfo.supplement }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
let uid = 0;

export default Vue.extend({
  props: ["pageInfo"],
  data() {
    uid++;
    return {
      cardId: `cardId-${uid}`,
    };
  },
  mounted() {},
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";
.card-item {
  width: 100%;
  &_title {
    font-size: 20px;
    position: relative;
    box-sizing: border-box;
    line-height: 1.6;
    z-index: 1;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 3px 5px rgba(#333, 0.5);
  }
  &_link {
    margin-bottom: 40px;
  }
  &_embed {
    position: relative;
    line-height: 0;
    overflow: hidden;
    border-radius: 10px;
    background-color: #555;
    margin-bottom: 10px;

    box-shadow: 0 0 10px rgba(#222222, 0.3);
    &_wrap {
      background-color: #ccc;
      position: relative;
      overflow: hidden;
    }
  }
  &_removed {
    &_message {
      color: $error_c;
      font-size: 14px;
    }
  }
  &_supplement {
    &_message {
      font-size: 14px;
      color: #666;
    }
  }

  &_img {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
@include touchDevice() {
  .card-item {
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #ccc;
    &_title {
      font-weight: bold;
      box-sizing: border-box;
      line-height: 1.6;
      font-size: 18px;
      z-index: 1;
      box-shadow: none;
      padding: 5px 20px;
    }
    &_link {
      margin-bottom: 40px;
    }
    &_embed {
      padding: 0;
      border-bottom: 1px solid #ccc;
      margin-bottom: 0;
      border-radius: 0;
      line-height: 0;
      box-shadow: none;
    }
    &_generator {
      padding: 15px;
    }
    &_supplement {
      padding: 0 15px 15px;
      font-size: 12px;
    }
  }
}
</style>
