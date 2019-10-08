import gmapsInit from '@/utils/gmaps'


export const mapMixin = {
    data: () => ({
        mapRef: 'map',
        google: null,
        map: null,
        markers: []
    }),
    methods: {
        async initMap () {
            this.google = await gmapsInit()
            this.map = new this.google.maps.Map(this.$refs[this.mapRef], {
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            })
        },

        centerOnLille () {
            if (this.google !== null && this.map !== null) {
                const geocoder = new this.google.maps.Geocoder()
                geocoder.geocode({ address: 'Lille' }, (results, status) => {
                if (status !== `OK` || !results[0]) throw new Error(status)
                    this.map.setCenter(results[0].geometry.location)
                    this.map.fitBounds(results[0].geometry.viewport)
                })
            }
        },

        drawMarkers (markers) {
            if (this.google !== null && this.map !== null) {
                markers.forEach(marker => {
                    const gmarker = new this.google.maps.Marker({
                        position: marker.position,
                        map: this.map
                    })
                    gmarker.addListener('click', marker.action)
                    this.markers.push(gmarker)
                })
            }
        },

        centerOnPosition (postion) {
            if (this.map !== null) {
                this.map.setZoom(19)
                this.map.setCenter(postion)
            }
        }
    }
}