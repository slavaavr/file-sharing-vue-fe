import axios from "@/axios/axios-common"

export default {
    state: {
        file: null,
        totalFileSize: 0,
        prettySize: '',
        loadedFileSize: 0,
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
            state.loadedFileSize = 0;
            state.prettySize = '';
            state.storageTime = 0;
            state.tags = [];
        },
        setTotalFileSize(state, payload) {
            state.totalFileSize = payload;
        },
        setStorageTime(state, payload) {
            state.storageTime = payload;
        },
        setLoadedFileSize(state, payload) {
            state.loadedFileSize = payload;
        },
        setTags(state, payload) {
            state.tags = payload;
        },
        setPettySize(state, payload) {
            state.prettySize = payload;
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
        setPettySize({commit}, payload) {
            commit('setPettySize', payload);
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
                    prettySize: state.prettySize,
                    time: state.storageTime
                };
                fd.append('file', state.file);
                fd.append('meta', new Blob([JSON.stringify(meta)], {type: "application/json"}));
                let config = {
                    onUploadProgress: function (progressEvent) {
                        commit('setLoadedFileSize', progressEvent.loaded);
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
        loadedFileSize(state) {
            return state.loadedFileSize;
        },
        totalFileSize(state) {
            return state.totalFileSize;
        },
        getTags(state) {
            return state.tags;
        }
    }
}