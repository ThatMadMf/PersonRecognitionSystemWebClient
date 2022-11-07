import TheRouterView from "@/views/TheRouterView";
import TheHomePage from "@/views/TheHomePage";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: TheRouterView,
        children: [
            {
                path: 'home',
                name: 'home',
                component: TheHomePage,
            },
        ]
    },
    {
        path: '/*',
        redirect: '/home',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;