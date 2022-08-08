<template>
  <div :class="'l-title l-title--' + theme">
    <h2>
      <slot></slot>
    </h2>
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

.l-title {
  margin-bottom: 30px;
  position: relative;
  h2 {
    font-weight: bold;
    color: #111;
    font-size: 32px;
  }
  &--2 {
    h2 {
      text-align: center;
    }
  }
  &--3 {
    h2 {
      color: $main01_c;
    }
  }
  &--4 {
    h2 {
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
