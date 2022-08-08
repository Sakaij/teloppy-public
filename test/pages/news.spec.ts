
import news from "@/pages/news.vue";
import {  mount,RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';

jest.mock('axios');


require('dotenv').config();

const stubs = { TelopCardList3: true, PartsInviewTitle1: true, HeadLink: true, 'infinite-loading': true, PartsLoading: true,NuxtLink: RouterLinkStub , FileDownloadModal: true};
const createdAtAllData1 = {
	"Items": [
		{
			"pageName": "sample1",
			"pageTitle": "サンプル1",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1635280792679,
			"encryptedCount": 3,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample2",
			"pageName": "サンプル2",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637140940923,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageName": "sample3",
			"pageTitle": "サンプル3",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1635280725260,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample4",
			"pageName": "サンプル4",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638287144824,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample5",
			"pageName": "サンプル5",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637237393337,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample6",
			"pageName": "サンプル6",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637058210389,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample7",
			"pageName": "サンプル7",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637238161282,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample8",
			"pageName": "サンプル8",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638716252214,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample9",
			"pageName": "サンプル9",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638285774592,
			"encryptedCount": 0,
			"type": "ActivePage"
		}
	],
	"LastEvaluatedKey": { dummy: "dummy" }
}
const createdAtAllData2 = {
	"Items": [{
		"pageName": "sample10",
		"pageTitle": "サンプル10",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}
	]
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
	});
	test('無限スクロールをした時の処理の確認', async () => {
		jest.spyOn(axios, "post").mockResolvedValue({ data: createdAtAllData1 });
		const wrapper = mount(news, {
			mocks: {
				$config: envConfig
			},
			stubs: stubs
		});
		
		/**
		 * 1回目の無限スクロール読み込みでは、配列が９個であることと、未完了である
		 * 2回目の無限スクロール読み込みでは、１つ追加で配列が１０個であることと、完了済みである
		 */
		await (wrapper.vm as any).infiniteHandler({
			loaded: () => { },
			complete: () => { },
			error: () => { },
			reset: () => { }
		});
		expect((wrapper.vm as any).pageArray.length === 9).toBe(true);
		expect((wrapper.vm as any).pageQuery.isCompleted).toBe(false);
		jest.spyOn(axios, "post").mockResolvedValue({ data: createdAtAllData2 });
		await (wrapper.vm as any).infiniteHandler({
			loaded: () => { },
			complete: () => { },
			error: () => { },
			reset: () => { }
		});
		expect((wrapper.vm as any).pageArray.length === 10).toBe(true);
		expect((wrapper.vm as any).pageQuery.isCompleted).toBe(true);
	});
});