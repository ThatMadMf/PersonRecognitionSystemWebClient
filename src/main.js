import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import {setAuthInterceptor, setAuthToken} from '@/services/api';
import VuexAxios from 'vue-axios';
import axios from 'axios';
import Vue from "vue";

Vue.use(Antd);
Vue.use(VuexAxios, axios);
Vue.use(VueSidebarMenu);

setAuthInterceptor();

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/api';

const token = localStorage.getItem('auth-token');
if (token) {
    setAuthToken(token);
}

new Vue({
    router, store, render: (h) => h(App),
}).$mount('#app');
