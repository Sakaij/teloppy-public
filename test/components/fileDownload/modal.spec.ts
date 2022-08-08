import modal from "@/components/fileDownload/modal.vue";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { cloneDeep} from 'lodash';
import Vuex from 'vuex'
import fileDownload from '@/store/modules/fileDownload';
const stubs = { PartsLoading: true};

const localVue = createLocalVue()
localVue.use(Vuex);


describe('modal.vue', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test('正常にダウンロードした場合の処理', async () => {
		const store = new Vuex.Store({
			'modules': {
				'fileDownload': cloneDeep(fileDownload)
			}
		})
		const wrapper = shallowMount(modal, {
			store: store,
			localVue: localVue,
			stubs: stubs
		});
		/** モーダルが表示されたら、確認画面がまず表示される*/
		store.dispatch('openModal',{
			pageName:'sample',
			message:'message',
			fileType:'mp4'
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal__wrapper--confirm').exists()).toBe(true);
		expect(wrapper.find('.download-modal__wrapper--loading').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--result').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--error').exists()).toBe(false);
		/** はい　を選択した場合にはダウンロード画面が表示される*/
		(wrapper.vm as any).isDownloading =true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal__wrapper--confirm').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--loading').exists()).toBe(true);
		expect(wrapper.find('.download-modal__wrapper--result').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--error').exists()).toBe(false);
		/** ダウンロードが終ると、完了画面が表示される */
		(wrapper.vm as any).isDownloading =false;
		(wrapper.vm as any).resultFileName ="fileName";
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal__wrapper--confirm').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--loading').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--result').exists()).toBe(true);
		expect(wrapper.find('.download-modal__wrapper--error').exists()).toBe(false);
	});
	test('ダウンロードエラーが発生した場合', async () => {
		const store = new Vuex.Store({
			'modules': {
				'fileDownload': cloneDeep(fileDownload)
			}
		})
		const wrapper = shallowMount(modal, {
			store: store,
			localVue: localVue,
			stubs: stubs
		});
		/** モーダルが表示されたら、確認画面がまず表示される*/
		store.dispatch('openModal',{
			pageName:'sample',
			message:'message',
			fileType:'mp4'
		});

		(wrapper.vm as any).isDownloading =false;
		(wrapper.vm as any).isError =true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal__wrapper--confirm').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--loading').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--result').exists()).toBe(false);
		expect(wrapper.find('.download-modal__wrapper--error').exists()).toBe(true);
	});

	test('モーダルの開閉処理', async () => {
		const store = new Vuex.Store({
			'modules': {
				'fileDownload': cloneDeep(fileDownload)
			}
		})
		const wrapper = shallowMount(modal, {
			store: store,
			localVue: localVue,
			stubs: stubs
		});
		/**初期状態では、モーダルは閉じている */
		expect(wrapper.find('.download-modal').exists()).toBe(false);
		/**　モーダルを開く処理　*/
		store.dispatch('openModal',{
			pageName:'sample',
			message:'message',
			fileType:'mp4'
		});
		(wrapper.vm as any).isVertical = true;
		(wrapper.vm as any).isError = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal').exists()).toBe(true);
		/**　モーダルを閉じる処理 */
		(wrapper.vm as any).close();
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.download-modal').exists()).toBe(false);
		//データが初期化されているかどうか
		expect((wrapper.vm as any).isDownloading).toBe(false);
		expect((wrapper.vm as any).isError).toBe(false);
		expect((wrapper.vm as any).isVertical).toBe(false);
		expect((wrapper.vm as any).resultFileName).toBe("");
		
	});
});