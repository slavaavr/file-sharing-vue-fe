export default {
    state: {
        file: null,
        transitionName: 'slide-right',
        isHomePrimary: true,
    },
    actions: {
        changeHome({state}, files) {
            if (state.isHomePrimary) {
                state.file = files[0];
                state.transitionName = 'slide-left';
            } else {
                state.file = null;
                state.transitionName = 'slide-right';
            }
            state.isHomePrimary = !state.isHomePrimary;
        }
    }
}