import iframeEmbed from "@/components/telopCard/iframeEmbed.vue";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { cloneDeep} from 'lodash';
import Vuex from 'vuex'
import telopCards from '@/store/modules/telopCards';

require('dotenv').config();

const localVue = createLocalVue()
localVue.use(Vuex);



const sampleEncrypted = "U2FsdGVkX1+tVTV8nzZ9MC8ciDqampyxDTdrfRx45re2NQj6hIyXbJA31Cb1Pz65";
const sampleEncrypted2 = "U2FsdGVkX19SNhECf31Ks2FHjJXKdrDMTtmLN9bOimT8SNIBu+hWpOU/pqbSgMFg";
const envConfig = {
	googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
	apiUrl: process.env.API_DEVELOPMENT_URL,
	encryptApiUrl: process.env.API_DEVELOPMENT_URL + 'encrypt',
	decryptApiUrl: process.env.API_DEVELOPMENT_URL + 'decrypt',
	s3ResourceUrl: process.env.S3_RESOURCE_URL
}
describe('iframeEmbed.vue', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('デモを見るボタンの処理', async () => {
		const store = new Vuex.Store({
			'modules': {
				'telopCards': cloneDeep(telopCards)
			}
		})

		const wrapper = shallowMount(iframeEmbed, {
			stubs: ["font-awesome-icon"],
			store: store,
			mocks: {
				$config: envConfig
			},
			localVue: localVue
		});
		await wrapper.setProps({ cardId: "cardId-1", pageName: "sample", sampleMessage: sampleEncrypted });
		expect((wrapper.vm as any).isCurrent).toBe(false);
		(wrapper.vm as any).selectDemoPage();
		expect((wrapper.vm as any).isCurrent).toBe(true);//カレントになったかどうか
		expect(store.getters.telopCardId).toBe('cardId-1');//storeにちゃんと保存されているか
		expect(store.getters.demoMessage).toBe("");//storeにちゃんと保存されているか
		expect((wrapper.vm as any).iframeUrl).toContain(`/telops/sample/?message=${sampleEncrypted}`);
		store.dispatch('setDemoMessage',sampleEncrypted2);
		expect((wrapper.vm as any).iframeUrl).toContain(`/telops/sample/?message=${sampleEncrypted2}`);
	});


	test('ボタンの発火確認', async () => {
		const wrapper = shallowMount(iframeEmbed, {
			stubs: ["font-awesome-icon"],
			mocks: {
				$config: envConfig
			},
			computed: {
				isCurrent: () => true,
				iframeUrl: () => 'sample'
			}
		});

		/**
		 * ボタンが、ちゃんとハンドラを呼んでいるかどうか
		 * */
		//「デモを見る」ボタン
		const selectDemo = jest.spyOn((wrapper.vm as any), "selectDemoPage").mockReturnValue(null);
		wrapper.find('#select-demo-button').trigger('click');
		await wrapper.vm.$nextTick();
		expect(selectDemo).toHaveBeenCalled();
		//リロードボタン
		const iframeReload = jest.spyOn((wrapper.vm as any), "iframeReload").mockReturnValue(null);
		wrapper.find('#iframe-reload-button').trigger('click');
		await wrapper.vm.$nextTick();
		expect(iframeReload).toHaveBeenCalled();
	})
});