<template>
    <v-card max-width="560" class="login-card">
        <v-layout fill-height align-center justify-center style="width: 100%;">
            <v-flex text-center xs11 sm8 md4 lg3>

                <div style="padding-bottom: 24px;">
                    <v-img
                        :src="require('../assets/logo.png')"
                        class="my-3"
                        contain
                        height="128">
                    </v-img>

                    <v-btn text @click="onClick">Login</v-btn>
                </div>

            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'login',
    methods: {
        onClick () {
            this.$store.dispatch('auth/login')
        }
    }
}
</script>

<style scoped>
.login-card {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: auto;
    margin-top: auto;
    width: 100%;
}
</style>