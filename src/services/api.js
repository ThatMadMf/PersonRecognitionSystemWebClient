import Vue from 'vue';
import axios from "axios";
import store from "@/store";
import {GET_USER, SET_TOKEN, SET_USER} from "@/store/user.module";
import router from "@/router";

export const ApiService = {
    get(resource, options) {
        return Vue.axios.get(resource, options);
    },
    post(resource, value) {
        return Vue.axios.post(resource, value);
    },
    patch(resource, value) {
        return Vue.axios.patch(resource, value);
    },
    delete(resource) {
        return Vue.axios.delete(resource);
    },
};

export const setAuthInterceptor = () => {
    axios.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('auth-token');
            delete this.axios.defaults.headers.common.Authorization;

            store.commit(SET_USER, null);
            store.commit(SET_TOKEN, null);

            router.push('/login');
        }
        return Promise.reject(error);
    });
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const setUserData = (context, data) => {
    const token = `Bearer ${data.access}`;

    localStorage.setItem('auth-token', token);
    setAuthToken(token);

    context.commit(SET_USER, data.user);
    context.commit(SET_TOKEN, token);
};

export const isAuthenticated = (to, from, next) => {
    const token = localStorage.getItem('auth-token');

    if (store.getters.token === null) {
        if (token === null) {
            next('/login');
        } else if (store.getters.user == null) {
            store.dispatch(GET_USER, token).then(() => {
                next();
            })
        }
    } else {
        next();
    }
};

export const isNotAuthenticated = (to, from, next) => {
    const token = localStorage.getItem('auth-token');

    if (token === null) {
        return next();
    }

    return next('/');
};
