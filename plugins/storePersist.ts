import { Plugin } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate'


const storePersist: Plugin = ({  store }) => {
    createPersistedState({
        key: 'vuex',
        paths: ['history']
    })(store)
}

export default storePersist;