import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui-plus'; // BalmJS Team Material Components
import 'balm-ui-css';

import responsive from 'vue-responsive'

const app = createApp(App);

app.use(BalmUI);
app.use(BalmUIPlus);

app.use(responsive);

app.use(store).use(router).mount('#app')
