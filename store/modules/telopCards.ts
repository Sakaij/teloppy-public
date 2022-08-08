

const state = () => ({
    currentCardId: "",
    currentMessage:""
});
const mutations = {
    setTelopCardId(state: any, cardId: string) {
        state.currentCardId = cardId;
    },
    setDemoMessage(state: any, message: string) {
        state.currentMessage = message;
    },
};

const getters = {
    telopCardId(state: any) {
        return state.currentCardId
    },
    demoMessage(state: any) {
        return state.currentMessage
    },
    isDemoMessageExit(state:any){
        return !!state.currentMessage
    }
}
const actions = {
    setTelopCardId(state: any, cardId: string) {
        state.commit('setTelopCardId', cardId)
    },
    setDemoMessage(state: any, message: string) {
        state.commit('setDemoMessage', message)
    }
};
export default {
    state,
    mutations,
    getters,
    actions
}