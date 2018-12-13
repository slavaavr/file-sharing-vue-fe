<template>
    <v-container style="border: 2px solid red;">
        <v-layout row align-center justify-center>
            <v-flex xs4 md8 style="border: 2px solid darkviolet">
                <v-container
                        id="canvas"
                        class="elevation-2"
                        grid-list-lg
                >
                    <v-layout column wrap>
                        <v-flex>
                            <v-card>
                                <v-card-title primary-title class="pb-0">
                                    <div class="headline">Downloading...</div>
                                    <v-progress-linear
                                            color="info"
                                            height="15"
                                            value="45"
                                    ></v-progress-linear>
                                    <p>456/512kb</p>
                                </v-card-title>
                                <v-card-actions class="pb-3">
                                    <v-spacer></v-spacer>
                                    <v-btn class="mr-2 error">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>

                        <v-flex>
                            <v-card>
                                <v-card-title>
                                    <div class="headline">File name</div>
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
                                <v-layout row wrap align-center style="border: 2px solid red">
                                    <v-flex xs4>
                                        <v-subheader>Tags</v-subheader>
                                    </v-flex>
                                    <v-flex xs6>
                                       <app-tagbox></app-tagbox>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions class="pa-3">
                                    <v-spacer></v-spacer>
                                    <v-btn class="mr-2 info">Generate link</v-btn>
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
        props: {
            changeHome: Function
        },
        data() {
            return {
                file: null,
                storageTime: {title: '1 hour', time: 1},
                variantsOfTime: [
                    {title: '1 hour', time: 1},
                    {title: '1 day', time: 24},
                    {title: '5 days', time: 24*5},
                    {title: '30 days', time: 24*30},
                ]
            }
        },
        components: {
            appTagbox: Tagbox
        }
    }
</script>

<style scoped>
    #canvas {
        border-radius: 5px;
        width: 40vw;
        height: 40vw;
        /*max-height: 80%;*/
    }
</style>