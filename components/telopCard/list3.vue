<template>
  <div>
    <ul class="page-list3">
      <li
        class="page-list3_item"
        v-for="(page, index) in pageArray"
        :key="index"
      >
        <TelopCardItem :pageInfo="page" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["pageArray"],
});
</script>