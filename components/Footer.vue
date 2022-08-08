<template>
  <div class="footer">
    <div class="container">
      <ul class="footer-link">
        <li class="footer-link__item">
          <nuxt-link to="/">HOME</nuxt-link>
        </li>
        <li class="footer-link__item">
          <a href="https://twitter.com/teloppy_com" target="blank">テロッピーTwitter</a>
        </li>
        <li class="footer-link__item">
          <nuxt-link to="/privacy">プライバシーポリシー</nuxt-link>
        </li>
        <li class="footer-link__item">
          <nuxt-link to="/terms">利用規約</nuxt-link>
        </li>
        <li class="footer-link__item">
          <nuxt-link to="/about">テロッピーについて</nuxt-link>
        </li>
      </ul>
      <p class="footer-copy">&copy; <nuxt-link to="/">Teloppy</nuxt-link></p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Auth } from "aws-amplify";
export default Vue.extend({
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
});
</script>
<style lang="scss">
@import "/assets/scss/mixin";
.footer {
  background-color: $main01_c;
  padding: 20px 0;
}

.footer-link {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__item {
    position: relative;
    padding-left: 20px;
    margin-left: 20px;
    &::before {
      position: absolute;
      border-top: 1px solid #ffffff;
      border-left: 1px solid #ffffff;
      width: 5px;
      height: 5px;
      content: "";
      transform: rotate(135deg);
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
    a {
      color: #ffffff;
      font-size: 14px;
    }
  }
}

.footer-catch {
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  margin-bottom: 5px;
}
.footer-logo {
  margin-bottom: 20px;
}

.footer-link {
  margin-left: 40px;
  &__item {
    margin-bottom: 10px;
  }
}

.footer-sns {
  margin-bottom: 20px;
  a {
    color: #ffffff;
  }
}
.footer-copy {
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  a {
    color: #ffffff;
  }
}

@include touchDevice() {
  .footer {
    background-color: $main01_c;
    padding: 30px 0;
  }


  .footer-link {
    margin-left: 0;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
      box-sizing: border-box;
      width: 49%;
      margin-left: 0;
      margin-bottom: 0;
    }
  }

  .footer-copy {
    text-align: center;
  }
} ;
</style>
