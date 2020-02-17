<template>
    <div class="app">
        <router-link to="/" style="color: white;text-decoration: none"><img src="../assets/back.png" height="24" width="24" style="margin: 5px;"/></router-link>
        <v-container>
        <v-row
                align="center"
                justify="center"
        >
            <v-col cols="8">
                <h1>Cypress</h1>
            </v-col>
            <v-col cols="8" style="margin: 0 auto;">
                <video controls src="../../cypress/videos/sample_spec.js.mp4"></video>
            </v-col>
        </v-row>
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col cols="3">
                    <a href="http://kroupe.vier.ovh/vegeta.html"><h1>Vegeta</h1></a>
                </v-col>
                <v-col cols="3">
                    <a href="https://david-dm.org/CortoVilain/mspr-ci-api-github"><h1>David DM</h1></a>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "stats"
    }
</script>

<style scoped>

</style>
