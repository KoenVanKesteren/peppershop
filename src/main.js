import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import Vuex from 'vuex'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store'

const app = createApp(App)

const vuetify = createVuetify({
	components,
	directives,
	defaults: {
		VBtn: {
			variant: 'outlined'
		}
	},
	theme: {
		defaultTheme: 'light'
	}
})

app.use(router)
app.use(vuetify)
app.use(Vuex)
app.use(store)
app.mount('#app')
