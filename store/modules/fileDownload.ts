

const state = () => ({
	downloadModal: {
		isOpen: false,
		telop:{
			pageName:"",
			message:"",
			fileType:""
		}
	}
});
const mutations = {

	closeModal(state: any) {
		state.downloadModal.isOpen = false;
		state.downloadModal.telop.pageName = "";
		state.downloadModal.telop.message = "";
		state.downloadModal.telop.fileType = "";
	},
	openModal(state: any, telop: {
		pageName: string,
		message: string,
		fileType: string
	}) {
		if (!telop.pageName || !telop.message || !telop.fileType || state.downloadModal.isOpen) return;
		state.downloadModal.isOpen = true;
		state.downloadModal.telop = telop;
	}
};
const actions = {
	closeModal(state: any) {
		state.commit('closeModal');
	},
	openModal(state: any, telop: {
		pageName: string,
		message: string,
		fileType: string
	}) {
		state.commit('openModal', telop);
	},
};

const getters = {
	isModalOpen(state: any) {
		return state.downloadModal.isOpen
	},
	modalPageName(state:any){
		return state.downloadModal.telop.pageName;
	},
	modalMessage(state:any){
		return state.downloadModal.telop.message;
	},
	modalFileType(state:any){
		return state.downloadModal.telop.fileType;
	}
}
export default {
	state,
	mutations,
	getters,
	actions
}