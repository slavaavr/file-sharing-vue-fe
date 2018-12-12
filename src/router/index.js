import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
    ],
    mode: 'history'
})