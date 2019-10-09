<template>
    <card-layout title="Settings">
        <v-list flat subheader three-line>
            <v-subheader>General</v-subheader>

            <v-list-item @click="onPushClick" :disabled="!canSubscribe">
                <v-list-item-action>
                    <v-switch inset
                        :disabled="!canSubscribe" 
                        :loading="subscriptionStatus ? 'primary' : null" 
                        :input-value="subscribed"></v-switch>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Notifications</v-list-item-title>
                    <v-list-item-subtitle>Notify me about pet updates</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-subheader>Experimental</v-subheader>

            <v-list-item @click="onBluetoothClick">
                <v-list-item-action>
                    <v-switch inset :input-value="bluetooth" @click.stop="onBluetoothClick"></v-switch>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>Bluetooth</v-list-item-title>
                    <v-list-item-subtitle>Allow bluetooth interaction</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </card-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CardLayout from '@/components/CardLayout.vue'

export default {
    name: 'settings',
    components: { CardLayout },
    data: () => ({}),
    computed: {
        ...mapState({
            workerUpdating: state => state.worker.status === 'loading',
            bluetooth: state => state.setting.bluetooth === true
        }),

        ...mapGetters({
            canSubscribe: 'worker/canSubscribe',
            subscribed: 'worker/subscribed',
            subscriptionUpdating: 'subscription/updating'
        }),

        subscriptionStatus () { return this.workerUpdating || this.subscriptionUpdating }
    },

    methods: {

        onPushClick () {
            if (this.subscribed) {
                this.$store.dispatch('worker/unsubscribe')
                .then(response => {
                    this.$store.dispatch('setting/setParam', { key: 'push', value: false })
                    this.$store.dispatch('subscription/unsubscribe', response.subscription.endpoint)
                })
            }
            else {
                this.$store.dispatch('worker/subscribe')
                .then(response => {
                    this.$store.dispatch('setting/setParam', { key: 'push', value: true })
                    this.$store.dispatch('subscription/subscribe', response.subscription)
                })
            }
        },

        onBluetoothClick (e) {
            e.preventDefault()
            this.$store.dispatch('setting/setParam', { key: 'bluetooth', value: !this.bluetooth })
        }
    }
}
</script>