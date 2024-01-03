import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import router from './router/index';

import './router/permission';

import socketIoClient from '@/utils/socket.io-client';

import { createPinia } from 'pinia';

const app = createApp(App);

app
  .use(socketIoClient, {
    url:
      import.meta.env.VITE_NODE_ENV === 'localhost'
        ? 'http://localhost:9527'
        : import.meta.env.VITE_APP_BASE_API,
    options: {}
  })
  .use(createPinia())
  .use(router)
  .mount('#app');
