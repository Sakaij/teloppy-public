import Vue from "vue";


export default Vue.extend({
	mounted() {
		const $el =this.$el.classList.contains('full-height') ? this.$el as HTMLElement :this.$el.querySelector<HTMLElement>('.full-height');
		if ($el && window.innerWidth <= 1080) $el.style.height = window.innerHeight + 'px';
	}
});