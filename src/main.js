import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://localhost:8080/';

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
