import axios from "@/axios/axios-common"

export default {
    state: {
        file: null,
        totalFileSize: 0,
        loadedPartSize: 0,
        storageTime: '',
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
        setStorageTime({commit}, payload) {
            commit('setStorageTime', payload);
        },
        clearFile({commit}) {
            commit('clearFile')
        },
        async uploadFile({commit, state}) {
            commit('clearError');
            try {
                let fd = new FormData();
                let meta = {
                    tags: state.tags.map(e => e.title),
                    time: state.storageTime
                };
                fd.append('file', state.file);
                fd.append('meta', new Blob([JSON.stringify(meta)], {type: "application/json"}));
                let config = {
                    onUploadProgress: function (progressEvent) {
                        commit('setLoadedPartSize', progressEvent.loaded);
                        commit('setTotalFileSize', progressEvent.total);
                    }
                };
                const msg = await axios.post('/files', fd, config);
                return msg.data;
            } catch (err) {
                commit('setError', err);
                throw err;
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