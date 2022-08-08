<template>
  <div class="backnumber-container">
    <div class="backnumber-link">
    <HeadLink currentCategory="history" />
    </div>
    <PartsInviewTitle1 theme="7">使用したテロップ</PartsInviewTitle1>
    <div class="backnumber-list">
      <ul class="page-list3">
        <li
          class="page-list3_item"
          v-for="(page, index) in pageArray"
          :key="index"
        >
          <button
            class="history-delete"
            @click="deletePageFromHistory(page.pageName)"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </button>
          <TelopCardItem :pageInfo="page" />
        </li>
      </ul>
    </div>

    <infinite-loading @infinite="infiniteHandler">
      <span slot="spinner"><PartsLoading /></span>
      <span slot="no-more"></span>
      <span slot="no-results">使用したテロップはありません</span>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PageListQueryByHistory } from "~/utils/pageQuery";

export default Vue.extend({
  layout: "backnumber",
  data() {
    const queryCreatedAt = new PageListQueryByHistory({
      apiUrl: this.$config.apiUrl,
      pagesString: this.$store.getters.encryptedPages,
    });
    return {
      pageArray: Array(),
      pageQuery: queryCreatedAt,
    };
  },
  head: {
    title:
      "使用したテロップ | Teloppy テロッピー 自分だけのメッセージ動画を送ろう！",
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
    //使用履歴から指定のテロップを削除
    deletePageFromHistory(pageName: string) {
      this.$store.dispatch("removeEncryptedPage", pageName);
      this.pageArray = this.pageArray.filter((v) => v.pageName != pageName);
    },
  },

  mounted() {},
});
</script>


<style scoped lang="scss">
@import "/assets/scss/mixin";
.history-delete {
  right: 10px;
  top: 10px;
  z-index: 2;
  border: none;
  background-color: transparent;
  position: absolute;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
}
/* Animation */
</style>