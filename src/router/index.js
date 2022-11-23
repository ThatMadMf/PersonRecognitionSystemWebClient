import Vue from "vue";
import VueRouter from 'vue-router';

import TheRouterView from "@/views/TheRouterView";
import TheHomePage from "@/views/TheHomePage";
import {isAuthenticated, isNotAuthenticated} from "@/services/api";
import TheLoginPage from "@/views/TheLoginPage";
import TheSessionsPage from "@/views/TheSessionsPage";


Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: TheLoginPage,
        beforeEnter: (to, from, next) => isNotAuthenticated(to, from, next),
    },
    {
        path: '/',
        component: TheRouterView,
        beforeEnter: (to, from, next) => isAuthenticated(to, from, next),
        children: [
            {
                path: 'home',
                name: 'home',
                component: TheHomePage,
            },
            {
                path: 'sessions',
                name: 'sessions',
                component: TheSessionsPage,
            }
        ]
    },
    {
        path: '/*', redirect: '/home',
    },
]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes,
});

export default router;