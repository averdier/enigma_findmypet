import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import auth from '@/services/auth'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

auth.getUser()
.then(user => {
  if (user !== null && user !== undefined && !user.expired) {
    store.dispatch('auth/initWithUser', user)
    router.push({ name: 'home' })
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
