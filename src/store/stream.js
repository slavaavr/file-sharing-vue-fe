import axios from "@/axios/axios-common";

export default {
    state: {
        pageData: null,
        currPage: 0,
        pageSize: 20,
    },
    mutations: {
        setPageData(state, payload) {
            state.pageData = payload;
        },
    },
    actions: {
        async generatePage({commit, state}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const pageData = await axios.get(`/files?page=${state.currPage}&size=${state.pageSize}`);
                commit('setPageData', pageData.data.content);
                commit('setLoading', false);
                return pageData.data.content;
            } catch (err) {
                commit('setLoading', false);
                commit('setError', err)
            }
        },
        async downloadFile({commit}, uri) {
            commit('clearError');
            try {
                return await axios.get(`/files/${uri}`, { responseType: 'arraybuffer' });
            } catch (err) {
                commit('setError', err)
            }
        }
    },
    getters: {
        pageData(state) {
            return state.pageData;
        },
    }
}