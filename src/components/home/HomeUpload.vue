<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>hello world!</h1>
                <v-btn @click="changeHome()">Back</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: {
            changeHome: Function
        },
    }
</script>

<style scoped>

</style>