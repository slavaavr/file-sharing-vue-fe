<template>
    <v-toolbar app fixed color="blue darken-1" dark>
        <v-container class="ma-0">
            <v-layout row justify-center>
                <v-btn flat>
                    <router-link to="/" class="barTitle">FileSharing</router-link>
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
</template>

<script>
    import Login from './auth/Login'
    import Registration from './auth/Registration'

    export default {
        components: {
            appLogin: Login,
            appRegistration: Registration
        }
    }
</script>

<style scoped>
    .barTitle {
        font-size: medium;
        color: inherit;
        text-decoration: none;
    }
</style>