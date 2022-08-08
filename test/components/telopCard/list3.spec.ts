import list3 from "@/components/telopCard/list3.vue";
import { shallowMount } from '@vue/test-utils';

require('dotenv').config();


describe('list3.vue', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('指定したページ情報の配列がちゃんと表示されるか', async () => {
		const wrapper = shallowMount(list3, {
			stubs: {
				TelopCardItem:true
			}
		});


		//正常な状態
		const pageArray = [{
			pageName: "sample",
			pageTitle: "サンプルタイトル",
			encryptedCount: 0,
			likes: 0,
			createdAt: 0,
			sampleMessage: "sample",
			type: "ActivePage"
		}, {
			pageName: "sample2",
			pageTitle: "サンプルタイトル2",
			encryptedCount: 0,
			likes: 0,
			createdAt: 0,
			sampleMessage: "sample",
			type: "ActivePage"
		}];
		//ページ情報が存在しないか、InactivePageに指定されている場合
		await wrapper.setProps({
			pageArray: pageArray
		});

		expect(wrapper.findAll('telopCardItem-stub').length).toBe(2);
	});
});