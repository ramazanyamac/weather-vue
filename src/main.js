import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

/* lottie */
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

/* style file */
import './assets/style.scss'

const app = createApp(App)
app.use(createPinia())
app.use(Vue3Lottie)
app.mount('#app')
