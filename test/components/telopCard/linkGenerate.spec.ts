import linkGenerate from "@/components/telopCard/linkGenerate.vue";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { cloneDeep, sample } from 'lodash';
import axios from 'axios';
import Vuex from 'vuex'
import history from '@/store/modules/history';
import telopCards from '@/store/modules/telopCards';

require('dotenv').config();

jest.mock('axios');
const localVue = createLocalVue()
localVue.use(Vuex);

const sampleEncrypted = "U2FsdGVkX1+tVTV8nzZ9MC8ciDqampyxDTdrfRx45re2NQj6hIyXbJA31Cb1Pz65";
const envConfig = {
	googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
	apiUrl: process.env.API_DEVELOPMENT_URL,
	encryptApiUrl: process.env.API_DEVELOPMENT_URL + 'encrypt',
	decryptApiUrl: process.env.API_DEVELOPMENT_URL + 'decrypt',
	s3ResourceUrl: process.env.S3_RESOURCE_URL
}

describe('linkGenerate.vue', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	test('URL発行の挙動', async () => {
		const store = new Vuex.Store({
			'modules': {
				'history': cloneDeep(history)
			}
		})
		const wrapper = shallowMount(linkGenerate, {
			mocks: {
				$config: envConfig
			},
			stubs: ["font-awesome-icon"],
			store: store,
			localVue: localVue
		});
		const notice = jest.spyOn((wrapper.vm as any), "_generateUrlCompleteNotice");
		(axios.get as any).mockResolvedValue({ data: sampleEncrypted })
		await wrapper.setProps({ pageName: "sample" });
		await wrapper.setData({ message: "sample" });
		await (wrapper.vm as any).generateUrl();
		expect((wrapper.vm as any).messageParameter).toBe(sampleEncrypted);//ちゃんと、axiosの戻り値を、messageParameterに格納しているかどうか
		expect(notice).toBeCalledTimes(1);//コピーが終わったという通知が呼ばれたかどうか
		expect(store.getters.encryptedPages).toBe('sample$');//storeにちゃんと保存されているか
		expect((wrapper.vm as any).fullURL).toBe(`https://teloppy.com/telops/sample/?message=${encodeURIComponent(sampleEncrypted)}`);
		await wrapper.setProps({ pageName: "sample2" });
		await (wrapper.vm as any).generateUrl();//2個目
		expect(store.getters.encryptedPages).toBe('sample2$sample$');//storeにちゃんと保存されているか
	});

	test('クリップボード処理の挙動', async () => {
		Object.defineProperty(navigator, "clipboard", {
			value: {
				writeText: () => { },
			}
		});
		const wrapper = shallowMount(linkGenerate, {
			stubs: ["font-awesome-icon"],
		});
		const notice = jest.spyOn((wrapper.vm as any), "_copyClipboardCompleteNotice");
		await wrapper.setProps({ pageName: "sample" });
		await wrapper.setData({ message: "sample" });
		navigator.clipboard.writeText = jest.fn().mockResolvedValue(null);
		await (wrapper.vm as any).copyClipboard();
		expect(notice).toHaveBeenCalled();//コピーが終わったという通知が呼ばれたかどうか
	});


	test('デモ再生ボタンの挙動', async () => {
		const store = new Vuex.Store({
			'modules': {
				'telopCards': cloneDeep(telopCards)
			}
		})

		const wrapper = shallowMount(linkGenerate, {
			stubs: ["font-awesome-icon"],
			store: store,
			localVue: localVue
		});
		await wrapper.setData({ messageParameter: sampleEncrypted });
		await wrapper.setProps({ cardId: "cardId-1" });
		(wrapper.vm as any).playDemoByInputMessage();
		expect(store.getters.telopCardId).toBe('cardId-1');//storeにちゃんと保存されているか
		expect(store.getters.demoMessage).toBe(encodeURIComponent(sampleEncrypted));//storeにちゃんと保存されているか
	})

	test('ボタンの発火確認', async () => {
		const wrapper = shallowMount(linkGenerate, {
			stubs: ["font-awesome-icon"]
		});
		await wrapper.setData({ messageParameter: sampleEncrypted });

		const generateUrl = jest.spyOn((wrapper.vm as any), "generateUrl").mockReturnValue(null);;
		wrapper.find('#generate-url-button').trigger('click');
		await wrapper.vm.$nextTick();
		expect(generateUrl).toHaveBeenCalled();

		const copyClipboard = jest.spyOn((wrapper.vm as any), "copyClipboard").mockReturnValue(null);
		wrapper.find('#copy-clipboard-button').trigger('click');
		await wrapper.vm.$nextTick();
		expect(copyClipboard).toHaveBeenCalled();

		const playDemo = jest.spyOn((wrapper.vm as any), "playDemoByInputMessage").mockReturnValue(null);
		wrapper.find('#play-demo-button').trigger('click');
		await wrapper.vm.$nextTick();
		expect(playDemo).toHaveBeenCalled();

	})
});