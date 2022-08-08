<template>
  <div class="loading" :class="position?'loading--'+position:''"></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["position"],
});
</script>

<style scoped lang="scss">
@import "/assets/scss/mixin";
.loading {
  background: url("~assets/img/fix/loading.gif") no-repeat center;
  height: 50px;
  
  &--left {
    background-position: center left;
  }
  &--right {
    background-position: center right;
  }
}
</style>
