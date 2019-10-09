<template>
  <card-layout title="Details">
    <template v-if="item !== undefined">

        <!--Header-->
        <v-list-item>
            <v-list-item-avatar>
                <img v-bind:src="item.picture" />
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle><span class='text--primary'>Last update:</span> {{ item.location.at }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <div class="details-container">

            <!--Position-->
            <pre>{{ item.location.position }}</pre>

            <!--Level-->
            <p>Battery level: {{ level }}</p>
            <!--Description-->
            <p>{{ item.description }}</p>
        </div>
      
    </template>
  </card-layout>
</template>

<script>
import CardLayout from '@/components/CardLayout.vue'

export default {
  name: 'pet-details',
  components: { CardLayout },
  props: {
        id: {
            type: String,
            required: true
        }
    },
    data: () => ({
        item: undefined,
        myCharacteristic: null,
        level: 100
    }),
    watch: {
        id: function () {
            this.updateItem()
        }
    },
    methods: {
        updateItem () {
            this.item = this.$store.getters['pet/getItem'](this.id)
            if (this.item === undefined) this.$router.push({ name: 'empty' })
        },
        handleBatteryLevel (event) {
            let value = event.target.value
            let a = []
            for (let i = 0; i < value.byteLength; i++) {
                a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
            }
            this.level = a
        }
    },
    created () {
        this.updateItem()
    },
    mounted () {
        navigator.bluetooth.requestDevice({filters: [{services: ['battery_service']}]})
        .then(device => {
            return device.gatt.connect()
        })
        .then(server => {
            return server.getPrimaryService('battery_service')
        })
        .then(service => {
            return service.getCharacteristic('battery_level')
        })
        .then(characteristic => {
            this.myCharacteristic = characteristic
            return this.myCharacteristic.startNotifications()
            .then(() => {
                this.myCharacteristic.addEventListener('characteristicvaluechanged', this.handleBatteryLevel)
            })
        })
    },
    destroyed () {
        if (this.myCharacteristic !== null) {
            this.myCharacteristic.stopNotifications()
            .then(() => {
                this.myCharacteristic.removeEventListener('characteristicvaluechanged', this.handleBatteryLevel)
            })
        }
    }
}
</script>

<style scoped>
/* Align details with avatar */
.details-container {
    margin: 8px 16px 0 16px;
}

.details-container > p {
    margin-top: 8px;
}
</style>