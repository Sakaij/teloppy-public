<template>
  <div class="backnumber-container">
    <div class="backnumber-link">
      <HeadLink :currentTag="tagName"/>
    </div>
    <div class="sp-container">
      <PartsM-title theme="1">タグ　>　{{ tagTitle }}</PartsM-title>
    </div>

    <div class="backnumber-list">
      <TelopCardList3 :pageArray="pageArray" />
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="spinner"><PartsLoading /></span>
      <span slot="no-more"></span>
      <span slot="no-results"
        >タグ - {{ tagTitle }} のテロップはまだありません。</span
      >
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TagManager } from "~/utils/tagManager";
import { PageListQueryByTagName } from "~/utils/pageQuery";

export default Vue.extend({
  layout: "backnumber",
  head() {
    return {
      title: `タグ - ${this.$data.tagTitle} | Teloppy テロッピー 自分だけのメッセージ動画を送ろう！`,
    };
  },
  data() {
    const tagName = this.$route.params.tagName;
    const queryTagName = new PageListQueryByTagName({
      apiUrl: this.$config.apiUrl,
      tagName: tagName,
    });
    return {
      tagTitle: TagManager.instance.getTagTitle(this.$route.params.tagName),
      tagName:tagName,
      pageArray: Array(),
      pageQuery: queryTagName,
    };
  },
  created() {},
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