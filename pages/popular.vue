<template>
  <div class="backnumber-container">
    <div class="backnumber-link">
    <HeadLink currentCategory="popular" />
    </div>
    <PartsInviewTitle1 theme="4"
      >人気のテロップ</PartsInviewTitle1
    >

    <div class="backnumber-list">
      <TelopCardList3 :pageArray="pageArray" />
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="spinner"><PartsLoading /></span>
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  PageListQueryByCreatedAt,
  PageListQueryByEncryptedCount,
  getPageByPageName,
} from "~/utils/pageQuery";

export default Vue.extend({
  layout: "backnumber",
    head:{
    title:'人気テロップ | Teloppy テロッピー 自分だけのメッセージ動画を送ろう！'
  },
  data() {
    const queryCreatedAt = new PageListQueryByEncryptedCount({
      s3Url: this.$config.s3ResourceUrl,
    });
    return {
      pageArray: Array(),
      pageQuery: queryCreatedAt,
    };
  },

  methods: {
    async infiniteHandler($state: {
      loaded: () => void;
      complete: () => void;
      error: () => void;
      reset: () => void;
    }) {
      if (this.pageQuery.isCompleted) {
        $state.complete();
        return;
      }
      const add = await this.pageQuery.getNextItems();
      if (add.length > 0) {
        this.pageArray = this.pageArray.concat(add);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
  mounted() {},
});
</script>


<style scoped lang="scss">
@import "/assets/scss/mixin";

/* Animation */
</style>