<template>
  <div class="view-wrapper">
    <div class="gmap" ref="map"></div>

    <v-btn class="app-button" fab dark color="teal">
      <v-icon dark>mdi-format-list-bulleted-square</v-icon>
    </v-btn>

    <div class="view-content">
      <v-container>
        <v-row>
           <v-col cols="12">
             <v-row align="end" justify="center">

              <v-card max-width="500">
                <v-card-text>
                  <v-list three-line rounded>
                    <!--<pet-list-item v-for="pet in pets" :item="pet" :key="pet.id" />-->
                    <pet-list-item :item="selected" />
                  </v-list>
                </v-card-text>
              </v-card>

             </v-row>
           </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import gmapsInit from '@/utils/gmaps'
import PetListItem from '@/components/PetListItem.vue'

export default {
  name: 'home',
  components: { PetListItem },
  data: () => ({
    pets: [
      {
          id: 0,
          name: 'Kermit',
          picture: 'https://media1.giphy.com/media/ejm8tkFonl8o8/giphy.gif',
          location: {
              at: '06:33PM',
              position: {
                  lat: 50.635260,
                  lng: 3.058140,
              }
          }
      },
      {
          id: 1,
          name: 'Racoon',
          picture: 'https://thumbs.gfycat.com/FlamboyantDopeyCalf-size_restricted.gif',
          location: {
              at: '06:44PM',
              position: {
                  lat: 50.635668,
                  lng: 3.057460,
              }
          }
      }
    ],
    selected: null
  }),
  methods: {
    selectItem (item) {
      this.selected = item
    }
  },
  created () {
    this.selected = this.pets[0]
  },
  async mounted () {
    try {
      const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$refs.map, {
        disableDefaultUI: true
      })

      geocoder.geocode({ address: 'Lille' }, (results, status) => {
        if (status !== `OK` || !results[0]) throw new Error(status)

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })

      const markerClickHandler = (marker, pet) => {
        map.setZoom(20)
        map.setCenter(marker.getPosition())
        this.selectItem(pet)
      }

      const markers = []
      this.pets.forEach(pet => {
        const marker = new google.maps.Marker({position: pet.location.position, map})
        marker.addListener('click', () => markerClickHandler(marker, pet))

        markers.push(marker)
      })

      this.selected = this.pets[0]

    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.view-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.gmap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.app-button {
  position: absolute;
  top: 32px;
  left: 32px;
}

.view-content {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
</style>