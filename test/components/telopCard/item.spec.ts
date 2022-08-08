import item from "@/components/telopCard/item.vue";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { cloneDeep, sample, stubObject, wrap } from 'lodash';
import axios from 'axios';
import Vuex from 'vuex'
import history from '@/store/modules/history';
import telopCards from '@/store/modules/telopCards';

require('dotenv').config();

jest.mock('axios');
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

	test('ページ情報の有無による表示される要素の確認', async () => {
		const wrapper = shallowMount(item,{
			stubs:{
				TelopCardIframeEmbed:true,
				TelopCardLinkGenerate:true
			}
		});


		//正常な状態
		const pageInfo = {
			pageName: "sample",
			pageTitle: "サンプルタイトル",
			encryptedCount: 0,
			likes: 0,
			createdAt: 0,
			sampleMessage: "sample",
			type: "ActivePage"
		};
		//ページ情報が存在しないか、InactivePageに指定されている場合
		const pageEmptyInfo = {
			pageName: "delete",
			pageTitle: "No title",
			encryptedCount: 0,
			likes: 0,
			createdAt: 0,
			sampleMessage: "",
			type: "InactivePage"
		};
		expect((wrapper.vm as any).cardId).toBe('cardId-1');
		await wrapper.setProps({
			pageInfo: pageInfo
		});
		expect(wrapper.html()).toMatch(pageInfo.pageTitle);
		expect(wrapper.find('telopcardiframeembed-stub').exists()).toBe(true);
		expect(wrapper.find('telopcardlinkgenerate-stub').exists()).toBe(true);
		expect(wrapper.find('#removed-message').exists()).toBe(false);

		await wrapper.setProps({
			pageInfo: pageEmptyInfo
		});
		expect(wrapper.html()).toMatch(pageEmptyInfo.pageTitle);
		expect(wrapper.find('telopcardiframeembed-stub').exists()).toBe(false);
		expect(wrapper.find('telopcardlinkgenerate-stub').exists()).toBe(false);
		expect(wrapper.find('#removed-message').exists()).toBe(true);
	});
});