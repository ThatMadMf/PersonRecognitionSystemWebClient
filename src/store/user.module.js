import {ApiService, setUserData} from "@/services/api";
import router from "@/router";

export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

const userModule = {
    state: () => ({
        user: null, token: null,
    }),
    actions: {
        [GET_USER](context, token) {
            ApiService.get('/me')
                .then((response) => {
                    context.commit(SET_USER, response.data);
                    context.commit(SET_TOKEN, token);
                });
        },
        [LOGIN](context, user) {
            ApiService.post('/login', user)
                .then((response) => {
                    setUserData(context, response.data);
                    router.push('/home');
                })
                .catch(({response}) => {
                    console.error(response.data.detail);
                });
        },
    },
    mutations: {},
    getters: {
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        },
    }
}

export default userModule;