

const state = () => ({
	encryptedPages: ""
});
const mutations = {
	addEncryptedPage(state: any, pageName: string) {
		state.encryptedPages = state.encryptedPages.replace(pageName+'$','')
		state.encryptedPages = pageName+'$' + state.encryptedPages;
	},
	removeEncryptedPage(state: any, pageName: string) {
		state.encryptedPages = state.encryptedPages.replace(pageName+'$','')
	}
};
const actions = {
	addEncryptedPage(state: any, pageName: string) {
		state.commit('addEncryptedPage', pageName)
	},
	removeEncryptedPage(state: any, pageName: string) {
		state.commit('removeEncryptedPage', pageName)
	}
};

const getters = {
	encryptedPages(state: any) {
		return state.encryptedPages
	}
}
export default {
	state,
	mutations,
	getters,
	actions
}