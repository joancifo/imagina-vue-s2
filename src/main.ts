import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

import ca from '@/lang/ca.json'
import es from '@/lang/es.json'
// import hello from './plugins/hello'

const app = createApp(App)
const i18n = createI18n({
  locale: 'es',
  messages: {
    ca,
    es
  }
})

app.use(i18n)
// app.use(hello, {
//   warning: true
// })

app.mount('#app')
