<template>
    <v-container id="drop-area" ref="dropArea">
        <v-layout column align-center justify-center>
            <div id="arrow-area">
                <v-img
                        :src="arrow"
                        height="auto"
                        max-width="80%"
                ></v-img>
                <span class="non-selectable">Try to drag & drop your file</span>
            </div>
            <v-flex xs4 md6 lg4>
                <v-img
                        :src="mainLogo"
                        width="550px"
                        max-width="100%"
                        height="auto"
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
        arrow: '',
        created() {
            this.mainLogo = require('@/assets/mainLogo.png');
            this.arrow = require('@/assets/arrow-right-hi.png');
        },
        mounted() {
            const dropArea = this.$refs.dropArea;
            const preventDefaults = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)
            });
            const highlight = (e) => {
                dropArea.classList.add('highlight');
                dropArea.firstChild.classList.add('disablePointerEvents');
            };
            const unhighlight = (e) => {
                dropArea.classList.remove('highlight');
                // dropArea.firstChild.classList.remove('disablePointerEvents');
            };
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false)
            });
            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false)
            });


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

    #arrow-area {
        position: absolute;
        left: 5%;
        top: 10%;
        font-size: 16pt;
    }

    #drop-area {
        position: relative;
        height: 95%;
    }

    .highlight {
        border: 5px dashed black;
        border-radius: 20px;
    }

    .disablePointerEvents {
        pointer-events: none;
    }

    .non-selectable {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

</style>