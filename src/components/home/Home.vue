<template>
    <div>
        <transition :name="transitionName" mode="out-in">
            <app-home-primary v-if="isHomePrimary"></app-home-primary>
            <app-home-upload v-else></app-home-upload>
        </transition>
    </div>
</template>

<script>
    import HomePrimary from './HomePrimary'
    import HomeUpload from './HomeUpload'

    export default {
        data() {
            return {}
        },
        methods: {},
        computed: {
            isHomePrimary() {
                return this.$store.getters.isHomePrimary;
            },
            transitionName() {
                return this.$store.getters.transitionName;
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