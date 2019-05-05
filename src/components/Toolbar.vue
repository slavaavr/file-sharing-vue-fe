<template>
    <v-toolbar app fixed color="blue darken-1" dark>
        <v-container fluid class="ma-0">
            <v-layout row justify-center>
                <router-link to="/">
                    <v-btn flat @click="initState">
                        <span class="barTitle">FileSharing</span>
                    </v-btn>
                </router-link>
                <router-link to="/stream">
                    <v-btn flat>
                        <span>
                            Stream
                            <v-icon right>view_stream</v-icon>
                        </span>
                    </v-btn>
                </router-link>

                <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        label="Search by #tags or file name"
                        style="max-width: 400px; min-width: 200px"
                ></v-text-field>
                <div id="authoritiesBlock" v-if="!user">
                    <app-login></app-login>
                    <app-registration></app-registration>
                </div>
                <div v-else>
                    <div class="text-xs-center">
                        <v-menu offset-y>
                            <v-btn
                                    slot="activator"
                                    flat
                            >
                                {{user.email}}
                            </v-btn>
                            <v-list>
                                <v-list-tile @click="exitUser">
                                    <v-list-tile-title>Exit</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </v-layout>
        </v-container>
    </v-toolbar>
</template>

<script>
    import Login from './auth/Login'
    import Registration from './auth/Registration'

    export default {
        components: {
            appLogin: Login,
            appRegistration: Registration
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        methods: {
            exitUser() {
                this.$store.dispatch('exitUser');
            },
            initState() {
                this.$store.dispatch('initState');
            }
        }
    }
</script>

<style scoped>
    .barTitle {
        font-size: medium;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    #authoritiesBlock {
        white-space: nowrap;
    }
</style>