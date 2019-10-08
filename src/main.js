import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import auth from '@/services/auth'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

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
