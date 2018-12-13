<template>
    <transition :name="transitionName" mode="out-in">
        <app-home-primary v-if="isHomePrimary" :changeHome="changeHome"></app-home-primary>
        <app-home-upload v-else :changeHome="changeHome"></app-home-upload>
    </transition>
</template>

<script>
    import HomePrimary from './HomePrimary'
    import HomeUpload from './HomeUpload'

    export default {
        data() {
            return {
                currentHome: 'homePrimary',
                transitionName: 'slide-left'
            }
        },
        methods: {
            changeHome() {
                if (this.isHomePrimary){
                    this.transitionName = 'slide-right';
                    this.currentHome = 'homeUpload';
                } else {
                    this.transitionName = 'slide-left';
                    this.currentHome = 'homePrimary';
                }
            }
        },
        computed: {
            isHomePrimary() {
                return this.currentHome === 'homePrimary';
            }
        },
        components: {
            appHomePrimary: HomePrimary,
            appHomeUpload: HomeUpload
        }
    }
</script>

<style scoped>
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: .5s;
        transition-property: opacity, transform;
        transition-timing-function: ease;
        overflow: hidden;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(5em, 0);
    }
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-5em, 0);
    }
</style>