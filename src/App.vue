<template>
    <v-app>
        <v-content>

            <!--Map-->
            <div class="gmap" ref="map"></div>

            <!--App content-->
            <v-container class="app-container">
                <v-row :align="currentAlign">
                    <router-view />
                </v-row>
            </v-container>

            <!--App button-->
            <v-speed-dial v-if="logged" top left direction="bottom"
                transition="slide-y-transition" class="app-button"
                v-model="menu">

                <template v-slot:activator>
                <v-btn v-model="menu" color="#FF9100" dark fab>
                    <v-icon dark>pets</v-icon>
                </v-btn>
                </template>

                <v-btn fab dark small color="#B36500" :to="{ name: 'pet-list' }">
                    <v-icon>list</v-icon>
                </v-btn>

                <v-btn fab dark small color="#B36500" :to="{ name: 'pet-create' }">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-btn fab dark small color="#B36500" :to="{ name: 'about' }">
                    <v-icon>help_outline</v-icon>
                </v-btn>

                <v-btn fab dark small color="#B36500" :to="{ name: 'settings' }">
                    <v-icon>settings</v-icon>
                </v-btn>

                <v-btn fab dark small color="red" :to="{ name: 'logout' }">
                    <v-icon>eject</v-icon>
                </v-btn>
            </v-speed-dial>

        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { mapMixin } from '@/mixins/mapMixin'

export default {
    name: 'App',
    mixins: [mapMixin],
    data: () => ({
        menu: false,
        alignPerPage: {
            'pet-focus': 'end',
            'default': 'end'
        },
        currentAlign: 'center'
    }),
    computed: mapState({
        logged: state => state.auth.user !== null,
        pets: state => state.pet.items
    }),
    watch: {
        logged: function (value) { if (value) this.$store.dispatch('pet/getItems') },
        pets: function () { this.drawPets() },
        '$route': function () {
            if (this.alignPerPage[this.$route.name] !== undefined) this.currentAlign = this.alignPerPage[this.$route.name]
            else this.currentAlign = this.alignPerPage['default']
        }
    },
    methods: {
        drawPets () {
            const markers = []
            this.pets.forEach(pet => {
                const marker = {
                    position: pet.location.position,
                    action: () => {
                        this.centerOnPosition(pet.location.position)
                        this.$router.push({ name: 'pet-focus', params: { id: pet.id }})
                    }
                }
                markers.push(marker)
            })
            this.drawMarkers(markers)
        }
    },
    async mounted () {
        await this.initMap()
        this.centerOnLille()
    }
}
</script>

<style>
/* Fix app button at top */
.app-button {
  position: absolute !important;
}

/* Fullscreen map */
.gmap {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Fullscreen app */
.app-container {
    height: 100%;
    display: flex;
    padding-bottom: 26px !important;
}

/* Reduce container max size on desktop */
@media (min-width: 960px) {
  .container {
      max-width: 850px !important;
  }
}
</style>