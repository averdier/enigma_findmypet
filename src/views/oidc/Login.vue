<template>
    <v-container fill-height>
        <v-layout justify-center align-center fill-height>
            <v-flex text-center shrink>
                <v-progress-circular indeterminate />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'oidc-login-callback',
    mounted () {
        this.$store.dispatch('auth/loginCallback')
        .then(() => {
            this.$router.push({ name: 'empty' })
        })
        .catch((error)=> {
            console.log(error)
            this.$router.push({ name: 'empty'})
        })
    }
}
</script>