<template>
    <v-app id="inspire" class="">
        <v-toolbar app fixed color="blue darken-1" dark>
            <v-container class="ma-0">
                <v-layout row align-center justify-center>
                    <v-flex xs2>
                        <v-layout align-center justify-end>
                            <v-btn flat>
                                <router-link to="/" class="title">FileSharing</router-link>
                            </v-btn>
                            <v-btn flat>
                                Stream
                                <v-icon right>view_stream</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field
                                flat
                                solo-inverted
                                hide-details
                                prepend-inner-icon="search"
                                label="Search"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout row>
                            <v-dialog v-model="dialog_login" max-width="600px">
                                <v-btn flat slot="activator">
                                    Login
                                    <v-icon right>account_circle</v-icon>
                                </v-btn>
                                <v-card>
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title class="headline">Login</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form>
                                            <v-text-field prepend-icon="person" name="login" label="Login"
                                                          type="text"></v-text-field>
                                            <v-text-field id="password" prepend-icon="lock" name="password"
                                                          label="Password" type="password"></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" flat @click="dialog_login = false">Close</v-btn>
                                        <v-btn color="blue darken-1" flat @click="dialog_login = false">Login</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog_sign_up" persistent max-width="600px">
                                <v-btn flat slot="activator">
                                    Sign up
                                    <v-icon right>person_add</v-icon>
                                </v-btn>
                                <v-card>
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title class="headline">Sign up</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form>
                                            <v-text-field prepend-icon="person" name="login" label="Login"
                                                          type="text"></v-text-field>
                                            <v-text-field id="password" prepend-icon="lock" name="password"
                                                          label="Password" type="password"></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" flat @click="dialog_sign_up = false">Close</v-btn>
                                        <v-btn color="blue darken-1" flat @click="dialog_sign_up = false">Sign up
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>

        </v-toolbar>
        <v-content class="grey lighten-4">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                dialog_login: false,
                dialog_sign_up: false
            }
        }
    }
</script>

<style>
    .title {
        color: inherit;
        text-decoration: none;

    }
</style>