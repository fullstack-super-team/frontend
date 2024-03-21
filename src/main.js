import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores/mainStore'

const app = createApp(App);

app.use(router);
app.use(store);

const token = localStorage.getItem('token');
if (token) {
  await store.dispatch('user/getUserInfo', token);
  router.push('/');
}

app.mount('#app')
