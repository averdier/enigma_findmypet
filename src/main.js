import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import auth from '@/services/auth'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBatteryEmpty,
  faBatteryQuarter,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBatteryEmpty)
library.add(faBatteryQuarter)
library.add(faBatteryHalf)
library.add(faBatteryThreeQuarters)
library.add(faBatteryFull)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Vuelidate)

auth.getUser()
.then(user => {
  if (user !== null && user !== undefined && !user.expired) {
    store.dispatch('auth/initWithUser', user)
    router.push({ name: 'empty' })
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
