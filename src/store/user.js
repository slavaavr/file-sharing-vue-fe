import axios from "@/axios/axios-common";

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        exitUser(state) {
            state.user = null;
        }
    },
    actions: {
        async registerUser({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                await axios.post('/register', payload);
                commit('setLoading', false);
            } catch ({response}) {
                commit('setLoading', false);
                throw response.data.message
            }
        },
        async loginUser({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const entity = await axios.post('/login', payload);
                axios.defaults.headers.common['Authorization'] = entity.data.token;
                commit('setUser', entity.data.user);
                commit('setLoading', false);
            } catch ({response}) {
                commit('setLoading', false);
                throw response.data.message
            }
        },
        exitUser({commit}) {
            commit('exitUser');
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    }
}