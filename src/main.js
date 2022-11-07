import 'ant-design-vue/dist/antd.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import VueSidebarMenu from 'vue-sidebar-menu'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";

const app = createApp(App);

app.use(VueSidebarMenu)
app.use(router);
app.use(store);

app.mount('#app');
