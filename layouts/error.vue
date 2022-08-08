<template>
  <div class="container">
    <div class="error" v-if="error.statusCode === 404">
      <h2 class="error_title_main">404 Not Found</h2>
      <h2 class="error_title_sub">
        お探しのページは存在しないか、既に削除されました。
      </h2>
    </div>
    <div class="error" v-else>
      <h2 class="error_title_main">500 Internal Server Error</h2>
      <h2 class="error_title_sub">
        エラーが発生しました。
      </h2>
    </div>
    <p class="link"><a href="/">TOPページへ移動する</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["error"],
  layout: "page",
});
</script>


<style scoped lang="scss">
@import "/assets/scss/mixin";
.error {
  &_title {
    &_main,
    &_sub {
      color: #666666;
    }
    &_main {
      font-size: 52px;
    }
    &_sub {
      font-size: 28px;
    }
  }
}
.link {
  margin-top: 60px;
  text-align: center;
  a {
    box-shadow: 0 3px 3px #ccc;
    max-width: 100%;
    font-size: 24px;
    box-sizing: border-box;
    border-radius: 10px;
    display: inline-block;
    padding: 10px 50px;
    color: #ffffff;
    transition: all 0.3s;
    background: linear-gradient(to left, $main01_c, $main02_c);
    text-decoration: none;
    &:hover {
      opacity: 0.8;
      box-shadow: none;
    }
  }
}
</style>