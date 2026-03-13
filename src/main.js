import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.css';
import App from './App.vue';
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    offset: 60,
});
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
