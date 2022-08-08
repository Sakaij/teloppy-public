<template>
  <div class="head-link">
    <div class="head-link_category">
      <CategoryLink :currentCategory="currentCategory" />
    </div>
    <div class="head-link_tag">
      <TagList :currentTag="currentTag" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["currentCategory","currentTag"],
  data() {
    return {};
  },
  mounted() {},
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";

.head-link {
  &_category {
    margin-bottom: 20px;
  }
}
@include touchDevice() {
  .head-link {
    &_category {
      margin-bottom: 15px;
    }
    &_tag {
      &::v-deep {
        .tag-list {
          flex-wrap: nowrap;
          overflow: auto;
          padding: 0 10px 10px;
          box-sizing: border-box;
          &_item {
            margin-bottom: 0;
            flex: 0 0 auto;
          }
        }
      }
    }
  }
} ;
</style>
