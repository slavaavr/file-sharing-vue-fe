import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
import shared from './shared'
import file from './file'
import tagbox from './tagbox'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        user,
        shared,
        file,
        tagbox
    }
})