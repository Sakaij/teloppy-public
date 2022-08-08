<template>
  <div :class="'m-title m-title--' + theme">
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

.m-title {
  margin-bottom: 30px;
  position: relative;
  h3 {
    font-weight: bold;
    color: #111;
    font-size: 24px;
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
  &--4 {
    h3 {
      color: $main01_c;
      padding-left: 20px;
      border-left: 2px solid $main01_c;
    }
  }
  &--5 {
    h3 {
      color: $main02_c;
      padding-left: 20px;
      border-left: 2px solid $main02_c;
    }
  }
  &--6 {
    h3 {
      background-color: $main01_c;
      color: #fff;
      padding: 10px;
    }
  }
  &--7 {
    h3 {
      background-color: $main02_c;
      color: #fff;
      padding: 10px;
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
