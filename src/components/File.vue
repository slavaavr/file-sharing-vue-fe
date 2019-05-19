<template>
    <v-card>
        <v-img
                :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
                height="150px"
        ></v-img>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{this.data.title}}</h3>
                <div v-if="this.data.user">uploaded by: {{this.data.user.nickname}}</div>
                <div>uploaded at: {{this.data.creationDate}}</div>
                <div>type: {{this.data.type}}</div>
                <div>size: {{this.data.prettySize}}</div>
                <div v-if="this.data.tags.length">tags: {{this.data.tags.map(el => el.title)}}</div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn outline
                   fab
                   small
                   color="teal"
                   class="ml-1"
                   @click="download"
                   :loading="loading"
                   :disabled="loading"
            >
                <v-icon>get_app</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span class="mr-2"><v-icon>show_chart</v-icon>{{this.data.countDownload}}</span>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
                loading: false
            }
        },
        watch: {
            loading(val) {
                this.loading = val;
            }
        },
        methods: {
            download() {
                this.loading = true;
                this.$store.dispatch('downloadFile', this.data.uri)
                    .then(resp => {
                            this.loading = false;
                            const contentType = resp.headers['content-type'] || 'application/octet-stream';
                            const fileName = resp.headers['content-disposition'].substring(21);
                            const fileData = new Blob([resp.data], {type: contentType});

                            const a = document.createElement("a");
                            document.body.appendChild(a);
                            a.style = 'display: none';
                            a.href = URL.createObjectURL(fileData);
                            a.download = fileName;
                            a.click();
                        }
                    )
            },
        }
    }
</script>

<style scoped>

</style>