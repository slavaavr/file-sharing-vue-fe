import axios from "@/axios/axios-common"

export default {
    state: {
        file: null,
        totalFileSize: 0,
        loadedPartSize: 0,
        storageTime: 0,
        tags: []
    },
    mutations: {
        setFile(state, payload) {
            state.file = payload;
        },
        clearFile(state) {
            state.file = null;
            state.totalFileSize = 0;
            state.loadedPartSize = 0;
            state.storageTime = 0;
            state.tags = [];
        },
        setTotalFileSize(state, payload) {
            state.totalFileSize = payload;
        },
        setStorageTime(state, payload) {
            state.storageTime = payload;
        },
        setLoadedPartSize(state, payload) {
            state.loadedPartSize = payload;
        },
        setTags(state, payload) {
            state.tags = payload;
        }
    },
    actions: {
        setFile({commit}, payload) {
            commit('setFile', payload);
            commit('setTotalFileSize', payload.size);
        },
        setTags({commit}, payload) {
            commit('setTags', payload);
        },
        clearFile({commit}) {
            commit('clearFile')
        },
        async uploadFile({commit, state}) {
            commit('clearError');
            try {
                let fd = new FormData();
                fd.append('file', state.file);
                fd.append('tags', state.tags);
                fd.append('time', state.storageTime);
                let config = {
                    onUploadProgress: function (progressEvent) {
                        commit('setLoadedPartSize', progressEvent.loaded);
                        commit('setTotalFileSize',progressEvent.total);
                    }
                };
                const msg = await axios.post('/uploadFile', fd, config);
                return msg.data;
            } catch ({response}) {
                commit('setError', response.data);
            }
        }
    },
    getters: {
        file(state) {
            return state.file;
        },
        percentCompleted(state) {
            return state.percentCompleted;
        },
        loadedPartSize(state) {
            return state.loadedPartSize;
        },
        totalFileSize(state) {
            return state.totalFileSize;
        },
        getTags(state) {
            return state.tags;
        }
    }
}