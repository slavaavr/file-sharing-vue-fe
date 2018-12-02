<template>
    <v-app id="inspire" class="">
        <v-toolbar app fixed color="blue darken-1" dark>
            <v-container class="ma-0">
                <v-layout row justify-center>
                    <v-btn flat>
                        <router-link to="/" class="title">FileSharing</router-link>
                    </v-btn>
                    <v-btn flat>
                        Stream
                        <v-icon right>view_stream</v-icon>
                    </v-btn>
                    <v-text-field
                            flat
                            solo-inverted
                            hide-details
                            prepend-inner-icon="search"
                            label="Search"
                            style="max-width: 400px; min-width: 200px"
                    ></v-text-field>
                    <app-login></app-login>
                    <app-registration></app-registration>
                </v-layout>
            </v-container>
        </v-toolbar>
        <v-content class="mainBackground">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Login from './components/auth/Login'
    import Registration from './components/auth/Registration'

    export default {
        data() {
            return {}
        },
        components: {
            appLogin: Login,
            appRegistration: Registration
        }
    }
</script>

<style>
    .title {
        color: inherit;
        text-decoration: none;
    }
    .mainBackground {
        background: #c2e59c;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>