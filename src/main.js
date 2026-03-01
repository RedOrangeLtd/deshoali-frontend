import { createApp } from 'vue'
import { createPinia } from 'pinia'
import moment from 'moment'

import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.config.globalProperties.$moment = moment

//axios setup
import apiClient from "@/apiClient.js";
app.config.globalProperties.$axios = apiClient

app.mount('#app')
