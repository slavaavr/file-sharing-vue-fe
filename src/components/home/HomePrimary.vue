<template>
    <v-container ref="dragArea" class="draggableArea disablePointerEvents">
        <v-layout row align-center wrap>
            <v-flex xs4>
                <v-img
                        :src="arrow"
                        width="250px"
                        max-width="70%"
                        height="auto"
                ></v-img>
                <span class="non-selectable" style="font-size: 16pt;">Try to drag & drop your file</span>
            </v-flex>
            <v-flex xs4 offset-xs-4>
                <v-layout column align-center wrap>
                    <v-flex>
                        <v-img
                                :src="mainLogo"
                                width="550px"
                                max-width="100%"
                                height="auto"
                        ></v-img>
                    </v-flex>
                    <v-flex :class="btnAvailability">
                        <v-btn color="primary" large @click="uploadFile">
                            Upload
                            <v-icon right>backup</v-icon>
                        </v-btn>
                        <input id="uploader" ref="uploader" type="file"
                               @сhange=""/>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                mainLogo: '',
                arrow: '',
                uploadBtnEnable: true,
            }
        },
        created() {
            this.mainLogo = require('@/assets/mainLogo.png');
            this.arrow = require('@/assets/arrow.png');
        },
        mounted() {
            const dragArea = this.$refs.dragArea;
            const preventDefaults = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dragArea.addEventListener(eventName, preventDefaults, false)
            });
            const highlight = (e) => {
                dragArea.classList.add('highlight');
                this.uploadBtnEnable = false;
            };
            const unhighlight = (e) => {
                dragArea.classList.remove('highlight');
                this.uploadBtnEnable = true;
            };
            ['dragenter'].forEach(eventName => {
                dragArea.addEventListener(eventName, highlight, false)
            });
            ['dragleave', 'drop'].forEach(eventName => {
                dragArea.addEventListener(eventName, unhighlight, false)
            });
            const handleDrop = (e) => {
                this.$store.dispatch('changeHome', e.dataTransfer.files);
            };
            dragArea.addEventListener('drop', handleDrop, false);
        },
        computed: {
            btnAvailability() {
                return {
                    enablePointerEvents: this.uploadBtnEnable
                }
            }
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

    .draggableArea {
        height: 95%;
    }

    .highlight {
        border: 5px dashed black;
        border-radius: 20px;
    }

    .disablePointerEvents * {
        pointer-events: none;
    }

    .enablePointerEvents * {
        pointer-events: auto;
    }

    .non-selectable {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

</style>