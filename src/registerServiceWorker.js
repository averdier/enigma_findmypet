/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from '@/store'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')
      store.dispatch('worker/register', registration)
      if (store.state.setting.push === true && store.state.auth.user !== null) {
        store.dispatch('worker/subscribe')
        .then(response => {
          store.dispatch('subscription/subscribe', response.subscription)
        })
      }
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      registration.waiting.postMessage('skipWaiting')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
