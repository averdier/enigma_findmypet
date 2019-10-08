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
    name: 'oidc-logout-callback',
    mounted () {
    this.$store.dispatch('auth/logoutCallback')
    .then(() => {
        this.$router.push({ name: 'login' })
    })
    .catch(()=> {
        this.$router.push({ name: 'empty'})
    })
}
}
</script>