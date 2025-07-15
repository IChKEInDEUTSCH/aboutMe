import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { GiInfo, GiTrophy, GiSandsOfTime, GiFullFolder, GiHouse } from "oh-vue-icons/icons";
import App from './App.vue'
import router from './router'

const pinia = createPinia();
addIcons(GiInfo, GiSandsOfTime, GiTrophy, GiFullFolder, GiHouse);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(pinia);
app.use(router);
app.mount('#app');
