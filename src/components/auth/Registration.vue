<template>
    <v-dialog v-model="dialog_sign_up" max-width="600px">
        <v-btn flat slot="activator">
            Sign up
            <v-icon right>person_add</v-icon>
        </v-btn>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title class="headline">Sign up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="isFormValid" ref="form" validation>
                    <v-text-field
                            v-model="username"
                            label="Name"
                            type="text"
                            :rules="usernameRules"
                    ></v-text-field>
                    <v-text-field
                            v-model="email"
                            label="Email"
                            type="email"
                            :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            :counter="6"
                            :rules="passwordRules"
                    ></v-text-field>
                    <v-text-field
                            v-model="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            :counter="6"
                            :rules="confirmPasswordRules"
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
                >Sign up
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog_sign_up: false,
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                isFormValid: false,
                usernameRules: [
                    v => !!v || 'Username is required'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Confirm password is required',
                    v => (v === this.password) || 'Passwords do not match'
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
                        nickname: this.username,
                        email: this.email,
                        password: this.password
                    };
                    this.$store.dispatch('registerUser', user)
                        .then(() => this.dialog_sign_up = false)
                        .catch((err) => this.$store.dispatch('setError', err))
                }
            },
            onClose() {
                this.dialog_sign_up = false;
            }
        },
        watch: {
            dialog_sign_up(val) {
                if (val === false) {
                    this.$refs.form.reset();
                }
            }
        }
    }
</script>

<style scoped>

</style>