import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home'
import Stream from '@/components/Stream'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
          path: '/stream',
          component: Stream
        },
    ],
    mode: 'history'
});