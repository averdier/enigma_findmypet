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
        return new Promise((resolve) => {
            resolve(
                [
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
                ]
            )
        })
    }
}