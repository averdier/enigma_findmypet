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

            <!--Level-->
            <p v-if="$store.state.setting.bluetooth">Battery level: <font-awesome-icon :icon="batteryIcon" /></p>
            <p v-else>Battery level: Bluetooth not activated (see: <router-link :to="{ name: 'settings' }">Settings</router-link>)</p>

            <!--Position-->
            <pre>{{ item.location.position }}</pre>

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
    computed: {
        batteryIcon () {
            if (this.level === 0) {
                return 'battery-empty'
            }
            else if (this.level === 25) {
                return 'battery-quarter'
            }
            else if (this.level === 50) {
                return 'battery-half'
            }
            else if (this.level === 75) {
                return 'battery-three-quarters'
            }
            else if (this.level === 100) {
                return 'battery-full'
            }
            return ''
        }
    },
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
            if (a[0] === '0x00')  {
                this.level = 0
            }
            else if (a[0] === '0x19')  {
                this.level = 25
            }
            else if (a[0] === '0x32')  {
                this.level = 50
            }
            else if (a[0] === '0x4b')  {
                this.level = 75
            }
            else if (a[0] === '0x64')  {
                this.level = 100
            }
        }
    },
    created () {
        this.updateItem()
    },
    mounted () {
        if (this.$store.state.setting.bluetooth) {
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
        }
        
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