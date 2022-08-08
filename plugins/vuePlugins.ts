import Vue from 'vue';
import vueInfinite from 'vue-infinite-loading';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import VueMq from 'vue-mq'

Vue.use(vueInfinite);
Vue.use(PerfectScrollbar);
Vue.use(VueMq, {
	breakpoints: {
		md: 1080,
		lg: Infinity,
	}
})