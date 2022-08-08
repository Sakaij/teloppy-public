<template>
  <div>
    <Header />
    <div class="content-wrapper">
      <Nuxt />
      <FileDownloadModal />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";

.content-wrapper {
  padding: 122px 0 50px;
}

@include touchDevice() {
  .content-wrapper {
    padding: 78px 0 25px;
  }
}
</style>