import CategoryLink from "@/components/CategoryLink.vue";
import {  RouterLinkStub, shallowMount } from '@vue/test-utils';

describe('linkGenerate.vue', () => {
	test('カテゴリのカレントチェック', async () => {
		const wrapper = shallowMount(CategoryLink, {
			stubs: {
				NuxtLink: RouterLinkStub
			}
		});
		await wrapper.setProps({ currentCategory: "top" });
		expect(wrapper.find('.category_item--current').findComponent(RouterLinkStub).props().to).toBe('/');
		await wrapper.setProps({ currentCategory: "news" });
		expect(wrapper.find('.category_item--current').findComponent(RouterLinkStub).props().to).toBe('/news');
		await wrapper.setProps({ currentCategory: "popular" });
		expect(wrapper.find('.category_item--current').findComponent(RouterLinkStub).props().to).toBe('/popular');
		await wrapper.setProps({ currentCategory: "history" });
		expect(wrapper.find('.category_item--current').findComponent(RouterLinkStub).props().to).toBe('/history');
	});
});