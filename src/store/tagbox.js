import axios from "@/axios/axios-common"

export default {
    state: {
        basicTags: []
    },
    mutations: {
        setBasicTags(state, payload) {
            state.basicTags = payload;
        }
    },
    actions: {
        async initBasicTags({commit}) {
            try {
                const tags = await axios.get('/tags?popular=true');
                commit('setBasicTags', tags.data);
            } catch (err) {
                commit('setError', err)
            }
        }
    },
    getters: {
        basicTags(state) {
            return state.basicTags;
        }
    }
}