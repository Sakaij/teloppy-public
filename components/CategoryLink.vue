<template>
  <div class="category">
    <ul class="category_list">
      <li
        class="category_item category_item--top"
        v-bind:class="{ 'category_item--current': currentCategory == 'top' }"
      >
        <nuxt-link to="/">TOP</nuxt-link>
      </li>
      <li
        class="category_item category_item--news"
        v-bind:class="{ 'category_item--current': currentCategory == 'news' }"
      >
        <nuxt-link to="/news">新着テロップ</nuxt-link>
      </li>
      <li
        class="category_item category_item--popular"
        v-bind:class="{
          'category_item--current': currentCategory == 'popular',
        }"
      >
        <nuxt-link to="/popular">人気テロップ</nuxt-link>
      </li>
      <li
        class="category_item category_item--history"
        v-bind:class="{
          'category_item--current': currentCategory == 'history',
        }"
      >
        <nuxt-link to="/history">使用したテロップ</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["currentCategory"],
  data() {
    return {};
  },
  mounted() {},
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";
.category {
  position: relative;
  border-bottom: 3px solid #ccc;
  &_list {
    display: flex;
  }
  &_item {
    position: relative;
    &--top {
      color: $main01_c;
      &::after {
        background-color: $main01_c;
      }
    }
    &--news {
      color: $main02_c;
      &::after {
        background-color: $main02_c;
      }
    }
    &--popular {
      color: $main04_c;
      &::after {
        background-color: $main04_c;
      }
    }
    &--history {
      color: $main05_c;
      &::after {
        background-color: $main05_c;
      }
    }
    a {
      font-weight: bold;
      display: block;
      font-size: 16px;
      padding:15px 20px;
      color: #888;
      transition: all 0.3s;
      text-decoration: none;
    }
    &::after {
      width: 100%;
      height: 3px;
      content: "";
      display: block;
      left: 0;
      bottom: -3px;
      position: absolute;
      opacity: 0;
      transition: all 0.3s;
      pointer-events: none;
    }

    &--current,
    &:hover {
      a {
        color: inherit;
      }
      &::after {
        opacity: 1;
      }
    }
  }
}
@include touchDevice() {
  .category {
    padding: 0 10px;
    box-sizing: border-box;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &_list {
      display: flex;
    }
    &_item {
      flex-shrink: 0;
      position: relative;
      a {
        font-weight: bold;
        display: block;
        font-size: 14px;
        padding: 10px 15px;
        transition: all 0.3s;
        text-decoration: none;
      }
      &::after {
        bottom: 0;
      }
      &--current,
      &:hover {
        a {
        }
        &::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
