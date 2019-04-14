<template>
    <div v-if="error">
        <v-snackbar
                :timeout="5000"
                :right="true"
                :top="true"
                @input="closeError"
                :value="true"
        >
            {{ error.message }}
            <v-btn
                    color="blue darken-1"
                    flat
                    @click="closeError"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>

</template>

<script>
    export default {
        computed: {
            error() {
                return this.$store.getters.error;
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError');
            }
        }
    }
</script>

<style scoped>

</style>