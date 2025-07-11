import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#007bff',
          secondary: '#f5f5f5',
          accent: '#4fd1c7',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#ffffff',
          surface: '#f5f5f5',
          'on-background': '#000000',
          'on-surface': '#000000',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#4fd1c7',
          secondary: '#1e1e1e',
          accent: '#007bff',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#121212',
          surface: '#1e1e1e',
          'on-background': '#ffffff',
          'on-surface': '#ffffff',
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.mount('#app');
