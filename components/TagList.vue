<template>
  <div class="tag-list">
    <div
      class="tag-list_item"
      v-for="(tag, index) in tagsArray"
      :key="index"
    >
      <PartsTag :isCurrent="currentTag == tag.tagName"
        ><nuxt-link :to="'/tag/' + tag.tagName">{{
          tag.tagTitle
        }}</nuxt-link></PartsTag
      >
    </div>
  </div>
</template>
 <script lang="ts">
import Vue from "vue";
import { TagManager } from "~/utils/tagManager";

export default Vue.extend({
  props: ["currentTag"],
  data() {
    return {
      tagsArray: TagManager.instance.tagList,
    };
  },
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";
.tag-list {
  display: flex;
  flex-wrap: wrap;
  &_item {
    margin-right: 10px;
    margin-bottom: 10px;
	&--current{
		&::v-deep{
			.tag a{
				
			}
		}	
	}
  }
}

@include touchDevice() {
  .tag-list {
    &_item {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
} ;
</style>
