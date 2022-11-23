import {ApiService, setUserData} from "@/services/api";
import router from "@/router";

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';

export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

const userModule = {
    state: () => ({
        users: [],
        user: null,
        token: null,
    }), actions: {
        [GET_USERS](context) {
            ApiService.get('/users')
                .then((response) => {
                    context.commit(SET_USERS, response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [GET_USER](context, token) {
            ApiService.get('/me')
                .then((response) => {
                    context.commit(SET_USER, response.data);
                    context.commit(SET_TOKEN, token);
                });
        }, [LOGIN](context, user) {
            ApiService.post('/login', user)
                .then((response) => {
                    setUserData(context, response.data);
                    router.push('/home');
                })
                .catch(({response}) => {
                    console.error(response.data.detail);
                });
        },
    }, mutations: {
        [SET_USERS](state, users) {
            state.users = users;
        },
        [SET_USER](state, user) {
            state.user = user;
        },
        [SET_TOKEN](state, token) {
            state.token = token;
        }
    }, getters: {
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        }, token(state) {
            return state.token;
        },
    }
}

export default userModule;