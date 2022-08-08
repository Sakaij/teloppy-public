<template>
  <h2 :class="'ib-title inview ib-title--theme' + theme">
    <slot></slot>
  </h2>
</template>
<script lang="ts">
import Vue from "vue";
import inview from "~/mixins/inview";

export default Vue.extend({
  mixins: [inview],
  props: ["theme"],
});
</script>
<style scoped lang="scss">
@import "/assets/scss/mixin";

@-webkit-keyframes animation {
  0% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -500,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -500, 0, 0, 1);
  }
  1.78% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.621,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -282.728,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.621,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -282.728,
      0,
      0,
      1
    );
  }
  3.56% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.829,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -149.309,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.829,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -149.309,
      0,
      0,
      1
    );
  }
  5.34% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.695,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -72.484,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.695,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -72.484,
      0,
      0,
      1
    );
  }
  7.06% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.477,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.997,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.477,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.997,
      0,
      0,
      1
    );
  }
  7.12% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.47,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.079,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.47,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.079,
      0,
      0,
      1
    );
  }
  10.51% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.146,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.766,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.146,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.766,
      0,
      0,
      1
    );
  }
  10.68% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.135,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.214,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.135,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.214,
      0,
      0,
      1
    );
  }
  14.01% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.003,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.88,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, -0.003, 1, 0, 0, 0, 0, 1, 0, 2.88, 0, 0, 1);
  }
  14.24% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.007,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.886,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.007,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.886,
      0,
      0,
      1
    );
  }
  17.46% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.033,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1.99,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, -0.033, 1, 0, 0, 0, 0, 1, 0, 1.99, 0, 0, 1);
  }
  31.36% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.002,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.01,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0.002, 1, 0, 0, 0, 0, 1, 0, 0.01, 0, 0, 1);
  }
  36.48% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.001,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.003,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.001,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.003,
      0,
      0,
      1
    );
  }
  44.34% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.001,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1);
  }
  44.44% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.001,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1);
  }
  45.27% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -7.992,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -7.992, 0, 1);
  }
  46.45% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -15.312,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -15.312,
      0,
      1
    );
  }
  48.45% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -19.275,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -19.275,
      0,
      1
    );
  }
  50.95% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -15.606,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -15.606, 0, 1);
  }
  53.4% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -9.111,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -9.111, 0, 1);
  }
  55.56% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -4.058,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -4.058, 0, 1);
  }
  55.9% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -3.395,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -3.395, 0, 1);
  }
  58.35% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.013,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.013, 0, 1);
  }
  62.35% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -1.622,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1.622, 0, 1);
  }
  72.25% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.002,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.002, 0, 1);
  }
  76.25% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.137,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.137, 0, 1);
  }
  86.15% {
    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  90.16% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.011,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.011, 0, 1);
  }
  100% {
    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes animation {
  0% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -500,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -500, 0, 0, 1);
  }
  1.78% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.621,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -282.728,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.621,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -282.728,
      0,
      0,
      1
    );
  }
  3.56% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.829,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -149.309,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.829,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -149.309,
      0,
      0,
      1
    );
  }
  5.34% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.695,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -72.484,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.695,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -72.484,
      0,
      0,
      1
    );
  }
  7.06% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.477,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.997,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.477,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.997,
      0,
      0,
      1
    );
  }
  7.12% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.47,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.079,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.47,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -31.079,
      0,
      0,
      1
    );
  }
  10.51% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.146,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.766,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.146,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.766,
      0,
      0,
      1
    );
  }
  10.68% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.135,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.214,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.135,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -1.214,
      0,
      0,
      1
    );
  }
  14.01% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.003,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.88,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, -0.003, 1, 0, 0, 0, 0, 1, 0, 2.88, 0, 0, 1);
  }
  14.24% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.007,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.886,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.007,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      2.886,
      0,
      0,
      1
    );
  }
  17.46% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      -0.033,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1.99,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, -0.033, 1, 0, 0, 0, 0, 1, 0, 1.99, 0, 0, 1);
  }
  31.36% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.002,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.01,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0.002, 1, 0, 0, 0, 0, 1, 0, 0.01, 0, 0, 1);
  }
  36.48% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0.001,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.003,
      0,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0.001,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.003,
      0,
      0,
      1
    );
  }
  44.34% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.001,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1);
  }
  44.44% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      -0.001,
      0,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1);
  }
  45.27% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -7.992,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -7.992, 0, 1);
  }
  46.45% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -15.312,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -15.312,
      0,
      1
    );
  }
  48.45% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -19.275,
      0,
      1
    );
    transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0.001,
      -19.275,
      0,
      1
    );
  }
  50.95% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -15.606,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -15.606, 0, 1);
  }
  53.4% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -9.111,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -9.111, 0, 1);
  }
  55.56% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -4.058,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -4.058, 0, 1);
  }
  55.9% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -3.395,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -3.395, 0, 1);
  }
  58.35% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.013,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.013, 0, 1);
  }
  62.35% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -1.622,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1.622, 0, 1);
  }
  72.25% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.002,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.002, 0, 1);
  }
  76.25% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.137,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.137, 0, 1);
  }
  86.15% {
    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  90.16% {
    -webkit-transform: matrix3d(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      -0.011,
      0,
      1
    );
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.011, 0, 1);
  }
  100% {
    -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

.ib-title {
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 32px;
  color: #333;
  position: relative;
  padding-left: 80px;
  &::before {
    position: absolute;
    content: "";
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 50px;
    height: 58px;
    background-repeat: no-repeat;
    opacity: 0;
  }

  &--theme1 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo1.png);
    }
  }
  &--theme2 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo2.png);
    }
  }
  &--theme3 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo3.png);
    }
  }
  &--theme4 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo4.png);
    }
  }
  &--theme5 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo5.png);
    }
  }
  &--theme6 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo6.png);
    }
  }
  &--theme7 {
    &::before {
      background-image: url(~/assets/img/pages/title-logo7.png);
    }
  }

  &.inview.inview--active {
    &::before {
      animation: animation 1s 0.3s linear both;
      opacity: 1;
    }
  }
}
@include touchDevice() {
  .ib-title {
    box-sizing: border-box;
    margin-bottom: 20px;
    font-size: 24px;
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
