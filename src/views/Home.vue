<template>
  <div>
    <div class="gmap" ref="map"></div>
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
      const map = new google.maps.Map(this.$refs.map)

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
.gmap {
  width: 100vw;
  height: 100vh;
}
</style>