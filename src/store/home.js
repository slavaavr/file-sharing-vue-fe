// TODO WTF it is not working?
// import router from '@/router'

export default {
    state: {
        transitionName: '',
        isHomePrimary: true,
    },
    mutations: {
        setIsHomePrimary(state, payload) {
            state.isHomePrimary = payload;
        },
        setTransitionName(state, payload) {
            state.transitionName = payload;
        }
    },
    actions: {
        changeHome({commit, state}) {
            if (state.isHomePrimary) {
                commit('setTransitionName', 'slide-left');
            } else {
                commit('setTransitionName', 'slide-right');
            }
            commit('setIsHomePrimary', !state.isHomePrimary);
        },
        initState({commit}) {
            commit('setIsHomePrimary', true);
            commit('setTransitionName', 'slide-right');
            commit('clearFile')
        }
    },
    getters: {
        isHomePrimary(state) {
            return state.isHomePrimary;
        },
        transitionName(state) {
            return state.transitionName;
        }
    }
}