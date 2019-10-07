import axios from 'axios'

const apiClient = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND}`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    instance: apiClient,

    getPets () {
        return new Promise((resolve, reject) => {
            resolve(
                [
                    {
                        name: 'Kermit',
                        picture: '',
                        location: {
                            at: '06:33PM',
                            position: {
                                lat: 50.635260,
                                lng: 3.058140,
                            }
                        }
                    }
                ]
            )
        })
    }
}