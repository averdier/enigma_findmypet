<template>
  <v-app>
    <v-content>
      
      <div class="app-wrapper">
        <div class="gmap" ref="map"></div>

        <v-container class="view-container">
          <v-row :align="align">
            <router-view />
          </v-row>
        </v-container>

        <v-speed-dial v-if="logged" top left direction="bottom"
          transition="slide-y-transition" class="app-button"
          v-model="menu">

            <template v-slot:activator>
              <v-btn v-model="menu" color="teal" dark fab>
                <v-icon dark>pets</v-icon>
              </v-btn>
            </template>

            <v-btn fab dark small color="indigo" :to="{ name: 'pet-list' }">
              <v-icon>list</v-icon>
            </v-btn>

            <v-btn fab dark small color="indigo" :to="{ name: 'pet-create' }">
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn fab dark small color="indigo" :to="{ name: 'about' }">
              <v-icon>help_outline</v-icon>
            </v-btn>

            <v-btn fab dark small color="red" :to="{ name: 'logout' }">
              <v-icon>eject</v-icon>
            </v-btn>
        </v-speed-dial>

      </div>
     
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import gmapsInit from '@/utils/gmaps'

export default {
  name: 'App',
  data: () => ({
    menu: false,
    google: null,
    map: null,
    aligns: {
      'login': 'center',
      'pet-focus': 'end',
      'default': 'start'
    },
    align: 'start'
  }),
  computed: {
    ...mapState({
      pets: state => state.pet.items,
      logged: state => state.auth.user !== null
    })
  },
  watch: {
    pets: function () {
      this.drawPets()
    },
    '$route': function () {
      if (this.aligns[this.$route.name] !== undefined) this.align = this.aligns[this.$route.name]
      else this.align = this.aligns['default']
    }
  },
  methods: {
    initMap () {
      if (this.google !== null) {
        this.map = new this.google.maps.Map(this.$refs.map, {
          disableDefaultUI: true
        })
        const geocoder = new this.google.maps.Geocoder()

        geocoder.geocode({ address: 'Lille' }, (results, status) => {
        if (status !== `OK` || !results[0]) throw new Error(status)
          this.map.setCenter(results[0].geometry.location)
          this.map.fitBounds(results[0].geometry.viewport)
        })

        this.drawPets()
      }
    },

    drawPets () {
      if (this.google !== null && this.map !== null) {
        const markers = []
        this.pets.forEach(pet => {
          const marker = new this.google.maps.Marker({
            position: pet.location.position,
            map: this.map
          })
          marker.addListener('click', () => this.onMarkerClick(marker, pet))
          markers.push(marker)
        })
      }
    },

    onMarkerClick (marker, pet) {
      if (this.map !== null) {
        this.map.setZoom(19)
        this.map.setCenter(marker.getPosition())
      }
      this.$router.push({ name: 'pet-focus', params: { id: pet.id }})
    }
  },

  created () {
    this.$store.dispatch('pet/getItems')
  },

  async mounted () {
    try {
      this.google = await gmapsInit()
      this.initMap()

    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.app-button {
  position: absolute !important;
}
.view-container {
  height: 100%;
  padding-top: 80px !important;
  align-items: top !important;
  display: flex;
}
.gmap {
  position: absolute;
  width: 100%;
  height: 100%;
}


.v-speed-dial__list {
  padding-left: 2px !important;
  align-items: unset !important;
}
@media (min-width: 960px) {
  .container {
      max-width: 850px !important;
  }
}
</style>