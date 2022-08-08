<template>
  <div :class="'s-title s-title--' + theme">
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["theme"],
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";

.s-title {
  margin-bottom: 30px;
  position: relative;
  h3 {
    font-weight: bold;
    color: #111;
    font-size: 18px;
  }
  &--2 {
    h3 {
      color: $main01_c;
    }
  }
  &--3 {
    h3 {
      color: $main02_c;
    }
  }

}
@include touchDevice() {
  .ib-title {
    box-sizing: border-box;
    margin-bottom: 20px;
    font-size: 32px;
    padding-left: 60px;
    &::before {
      left: 10px;
      width: 40px;
      height: 46.5px;
      background-size: 40px auto;
    }
  }
} ;
</style>
