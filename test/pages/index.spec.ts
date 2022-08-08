
import index from "@/pages/index.vue";
import item from "@/components/telopCard/item.vue";
import { shallowMount, createLocalVue, mount ,RouterLinkStub} from '@vue/test-utils';
import flushPromises from 'flush-promises'

import * as PageList from "~/utils/pageQuery";

require('dotenv').config();


const localVue = createLocalVue()
localVue.component('TelopCardItem', item);
const stubs = { PartsTwitterIframe:true,Header: true, HeadLink: true, PartsInviewTitle1: true, PartsLoading: true, TelopCardItem: true,Hooper: false, FileDownloadModal: true,NuxtLink: RouterLinkStub};
const sampleTopData = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 0,
		"type": "ActivePage"
	}]
}


const envConfig = {
	googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
	apiUrl: process.env.API_DEVELOPMENT_URL,
	encryptApiUrl: process.env.API_DEVELOPMENT_URL + 'encrypt',
	decryptApiUrl: process.env.API_DEVELOPMENT_URL + 'decrypt',
	s3ResourceUrl: process.env.S3_RESOURCE_URL
}
describe('index.vue', () => {
	afterEach(() => {
		jest.resetAllMocks();
		jest.restoreAllMocks();
		jest.spyOn(console, "error").mockImplementation()
	});

	test('マウント時の処理のテスト', async () => {
		const referenceProcess = jest.spyOn((index as any).options.methods, "_referenceProcess").mockReturnValue(null),
			newsProcess = jest.spyOn((index as any).options.methods, "_newsProcess").mockReturnValue(null),
			popularProcess = jest.spyOn((index as any).options.methods, "_popularProcess").mockReturnValue(null),
			historyProcess = jest.spyOn((index as any).options.methods, "_historyProcess").mockReturnValue(null);
		const wrapper = shallowMount(index, {
			stubs: stubs
		});
		/**
		 * createdの時点で、呼ぶべきメソッドを呼んでいるかどうか
		 */
		expect(referenceProcess).toHaveBeenCalled();
		expect(newsProcess).toHaveBeenCalled();
		expect(popularProcess).toHaveBeenCalled();
		expect(historyProcess).toHaveBeenCalled();
	});

	test('新着テロップに係る処理のテスト', async () => {
		jest.spyOn((index as any).options.methods, "_referenceProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_popularProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_historyProcess").mockReturnValue(null);
		jest.spyOn(PageList.PageListQueryByCreatedAt.prototype, "getTopItems").mockResolvedValue(sampleTopData.Items);
		const wrapper = mount(index, {
			mocks: {
				$config: envConfig
			},
			localVue: localVue,
			stubs: stubs
		});
		await flushPromises();
		//配列に格納していることを確認
		expect(JSON.stringify((wrapper.vm as any).newsArray[0]) === JSON.stringify(sampleTopData.Items[0])).toBe(true);
	});
	test('人気テロップに係る処理のテスト', async () => {
		jest.spyOn((index as any).options.methods, "_newsProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_historyProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_referenceProcess").mockReturnValue(null);
		jest.spyOn(PageList.PageListQueryByEncryptedCount.prototype, "getTopItems").mockResolvedValue(sampleTopData.Items);
		const wrapper = shallowMount(index, {
			stubs: stubs,
			mocks: {
				$config: envConfig
			}
		});
		await flushPromises();
		//配列に格納していることを確認
		expect(JSON.stringify((wrapper.vm as any).popularArray[0]) === JSON.stringify(sampleTopData.Items[0])).toBe(true);
	});
	test('履歴テロップに係る処理のテスト', async () => {
		jest.spyOn((index as any).options.methods, "_newsProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_popularProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_referenceProcess").mockReturnValue(null);
		jest.spyOn(PageList.PageListQueryByHistory.prototype, "getTopItems").mockResolvedValue(sampleTopData.Items);

		const wrapper = shallowMount(index, {
			stubs: stubs,
			mocks: {
				$config: envConfig,
				$store: {
					getters: {
						encryptedPages: 'sample1$'
					}
				}
			}
		});
		await flushPromises();
		//配列に格納していることを確認
		expect(JSON.stringify((wrapper.vm as any).historyArray[0]) === JSON.stringify(sampleTopData.Items[0])).toBe(true);
	});
	test('参照テロップに係る処理のテスト', async () => {

		const refTelop = {
			"pageName": "sample1",
			"pageTitle": "サンプル1",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1635280792679,
			"encryptedCount": 0,
			"type": "ActivePage"
		}
		jest.spyOn((index as any).options.methods, "_newsProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_popularProcess").mockReturnValue(null);
		jest.spyOn((index as any).options.methods, "_historyProcess").mockReturnValue(null);
		jest.spyOn(PageList, "getPageByPageName").mockResolvedValue(refTelop);
		const wrapper = shallowMount(index, {
			stubs: stubs,
			mocks: {
				$config: envConfig,
				$route: {
					query: {
						reference_telopid: "sampleId"
					}
				}
			}
		});
		const wrapper2 = shallowMount(index, {
			stubs: stubs,
			mocks: {
				$config: envConfig,
				$route: {
					query: {
					}
				}
			}
		});
		jest.spyOn(PageList, "getPageByPageName").mockResolvedValue(null);
		const wrapper3 = shallowMount(index, {
			stubs: stubs,
			mocks: {
				$config: envConfig,
				$route: {
					query: {
						reference_telopid: "sampleId"
					}
				}
			}
		});

		/**
		 * ・クエリにreference_telopidが含まれており、かつDB上にもデータが存在する場合は、referringPageに格納されておりisReffringTelopもtrue
		 * ・クエリにreference_telopidが含まれてるが、DB上にデータが存在しない場合は、referringPageは空であり、isReffringTelopはfalse
		 * ・クエリにreference_telopidが含まれていない場合は、watchdPageは空であり、isReffringTelopはfalse

		 * */
		await flushPromises();
		expect(JSON.stringify((wrapper.vm as any).referringPage) === JSON.stringify(refTelop)).toBe(true);
		expect((wrapper.vm as any).isReffringTelop).toBe(true);
		expect(JSON.stringify((wrapper2.vm as any).referringPage) === JSON.stringify({})).toBe(true);
		expect((wrapper2.vm as any).isReffringTelop).toBe(false);
		expect(JSON.stringify((wrapper3.vm as any).referringPage) === JSON.stringify({})).toBe(true);
		expect((wrapper3.vm as any).isReffringTelop).toBe(false);
	});
});