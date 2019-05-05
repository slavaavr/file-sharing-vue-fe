<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-subheader>Stream</v-subheader>
                <v-container grid-list-md fluid class="pa-3">
                    <v-layout row wrap>
                        <v-flex
                                v-for="file in files"
                                :key="file.id"
                                xs4
                        >
                            <app-file v-bind:data="file"></app-file>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import File from '@/components/File'

    export default {
        name: "stream",
        data() {
            return {
                files: null
            }
        },
        components: {
            appFile: File
        },
        created() {
            this.$store.dispatch('generatePage')
                .then(data => this.files = data);
        },
    }
</script>

<style scoped>

</style>