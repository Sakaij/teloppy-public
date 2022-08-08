<template>
  <div
    class="tag"
    v-bind:class="{
      'tag--current': isCurrent,
    }"
  >
    <slot></slot>
  </div>
</template>
 <script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["isCurrent"],
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";
.tag {
  display: inline-block;
  a {
    display: block;
    border: 1px solid $main01_c;
    border-radius: 50px;
    padding: 4px 30px 4px 15px;
    font-weight: bold;
    font-size: 14px;
    color: $main01_c;
    text-decoration: none;
    position: relative;
    transition: all 0.3s;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      width: 5px;
      height: 5px;
      transform: rotate(45deg);
      margin: auto 0;
      display: block;
      border-top: 1.5px solid $main01_c;
      border-right: 1.5px solid $main01_c;
      transition: inherit;
    }
    &:hover {
      background-color: $main01_c;
      color: #ffffff;
      &::after {
        border-color: #ffffff;
      }
    }
  }
  &--current {
    a {
      color: #fff;
	  background-color: $main01_c;
      &::after {
        content: "";
		border-color: #fff;
      }

    }
  }
}

@include touchDevice() {
  .tag {
    a {
      padding: 3px 20px 3px 10px;
      font-size: 12px;
      &::after {
        right: 8px;
        width: 3px;
        height: 3px;
      }
    }
  }
} ;
</style>
