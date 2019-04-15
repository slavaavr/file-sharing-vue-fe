<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-layout row align-center justify-center>
            <v-flex xs6 md6 lg6 xl4>
                <v-container
                        class="elevation-2"
                        grid-list-lg
                >
                    <v-layout column wrap>
                        <v-flex>
                            <v-card>
                                <v-card-title primary-title class="pb-0">
                                    <div class="headline">{{fileName}}</div>
                                    <v-progress-linear
                                            color="info"
                                            height="15"
                                            :value="percentCompleted"
                                    ></v-progress-linear>
                                    <p>{{loadedPartSize}}/{{totalFileSize}}b</p>
                                </v-card-title>
                                <v-card-actions>
                                    <v-alert
                                            :value="isFileUploaded"
                                            type="success"
                                            transition="scale-transition"
                                            style="width: 100%"
                                    >
                                        <v-layout row>
                                            {{linkToFile}}
                                            <v-spacer></v-spacer>
                                            <v-tooltip v-model="showTooltip" top>
                                                <template v-slot:activator="{}">
                                                    <v-btn @click="copyToClipboard" @mouseleave="showTooltip = false">Copy</v-btn>
                                                </template>
                                                <span>Copied!</span>
                                            </v-tooltip>
                                        </v-layout>
                                    </v-alert>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card>
                                <v-card-title>
                                    <div class="headline">Settings</div>
                                </v-card-title>
                                <v-divider light></v-divider>
                                <v-layout row wrap align-center>
                                    <v-flex xs4>
                                        <v-subheader>Storage time</v-subheader>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-select
                                                v-model="storageTime"
                                                :items="variantsOfTime"
                                                hint="Pick the time of storage"
                                                item-text="title"
                                                item-value="time"
                                                persistent-hint
                                                return-object
                                                single-line
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap align-center>
                                    <v-flex xs4>
                                        <v-subheader>Tags</v-subheader>
                                    </v-flex>
                                    <v-flex xs6>
                                        <app-tagbox></app-tagbox>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions class="pa-3">
                                    <v-spacer></v-spacer>
                                    <v-btn class="mr-2 info" @click="sendFileOnServer">Generate link</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Tagbox from '@/components/Tagbox'

    export default {
        data() {
            return {
                storageTime: {title: '1 hour', time: 1},
                variantsOfTime: [
                    {title: '1 hour', time: 1},
                    {title: '1 day', time: 24},
                    {title: '5 days', time: 24 * 5},
                    {title: '30 days', time: 24 * 30},
                ],
                linkToFile: '',
                isFileUploaded: false,
                showTooltip: false,
            }
        },
        watch: {
            storageTime() {
                this.$store.dispatch('setStorageTime', this.storageTime.title);
            }
        },
        computed: {
            percentCompleted() {
                return this.$store.getters.loadedPartSize * 100 / this.$store.getters.totalFileSize
            },
            totalFileSize() {
                return this.$store.getters.totalFileSize;
            },
            loadedPartSize() {
                return this.$store.getters.loadedPartSize;
            },
            fileName() {
                return this.$store.getters.file.name;
            }
        },
        methods: {
            sendFileOnServer() {
                this.$store.dispatch('uploadFile')
                    .then(link => {
                        this.linkToFile = link;
                        this.isFileUploaded = true;
                    });
            },
            copyToClipboard() {
                this.showTooltip = true;
                navigator.clipboard.writeText(this.linkToFile);
            },
        },
        components: {
            appTagbox: Tagbox
        },

    }
</script>

<style scoped>

</style>