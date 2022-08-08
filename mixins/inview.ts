import Vue from "vue";
/**@ts-ignore */
import inview from 'in-view';



export default Vue.extend({
	mounted() {
		inview('.inview').on('enter', (e: Element) => {
			e.classList.add("inview--active");
		});
	}
});


