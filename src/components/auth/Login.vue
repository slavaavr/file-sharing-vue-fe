<template>
    <v-dialog v-model="dialogLogin" max-width="600px">
        <v-btn flat slot="activator">
            Login
            <v-icon right>account_circle</v-icon>
        </v-btn>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title class="headline">Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="isFormValid" ref="form" validation>
                    <v-text-field
                            v-model="email"
                            prepend-icon="person"
                            label="Email"
                            type="email"
                            :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            prepend-icon="lock"
                            label="Password"
                            type="password"
                            :counter="6"
                            :rules="passwordRules"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        flat
                        @click="onClose"
                >Close
                </v-btn>
                <v-btn
                        color="primary"
                        @click="onSubmit"
                        :disabled="!isFormValid || loading"
                        :loading="loading"
                >Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogLogin: false,
                email: '',
                password: '',
                isFormValid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ]
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        },
        methods: {
            onSubmit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    };
                    this.$store.dispatch('loginUser', user)
                        .then(() => this.dialogLogin = false)
                        .catch((err) => this.$store.dispatch('setError', err))
                }
            },
            onClose() {
                this.dialogLogin = false;
            }
        },
        watch: {
            dialogLogin(val) {
                if (val === false) {
                    this.$refs.form.reset();
                }
            }
        }
    }
</script>

<style scoped>

</style>