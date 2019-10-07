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

                    <v-list-item @click="">
                      <v-list-item-avatar style="margin-top: 26px;">
                          <v-img src="data:image/jpeg;base64,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"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                          <v-list-item-title>Kermit</v-list-item-title>
                          <v-list-item-subtitle><span class='text--primary'>Last location:</span> 104 national road</v-list-item-subtitle>
                          <v-list-item-subtitle><span class='text--primary'>At:</span> 06:33PM</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action style="margin-top: 26px;">
                          <v-btn icon>
                              <v-icon color="grey lighten-1">mdi-information</v-icon>
                          </v-btn>
                      </v-list-item-action>
                    </v-list-item>


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
import gmapsInit from '@/utils/gmaps'

export default {
  name: 'home',
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