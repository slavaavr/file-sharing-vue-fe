<template>

    <v-container>
        <v-layout column align-center justify-center>
            <v-flex xs5 md6 lg4>
                <v-img
                        :src="mainLogo"
                        height="100%"
                        width="550"
                ></v-img>
            </v-flex>
            <v-flex>
                <v-btn color="primary" large @click="uploadFile">
                    Upload
                    <v-icon right>backup</v-icon>
                </v-btn>
                <input id="uploader" ref="uploader" type="file"
                       @сhange=""/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        mainLogo: '',
        created() {
            this.mainLogo = require('@/assets/mainLogo.png')
        },
        methods: {
            uploadFile() {
                this.$refs.uploader.click();
            }
        }
    }
</script>

<style scoped>
    #uploader {
        display: none;
    }
</style>