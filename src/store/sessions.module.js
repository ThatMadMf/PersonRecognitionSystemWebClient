import {ApiService} from "@/services/api";

export const GET_SESSIONS = 'GET_SESSIONS';

export const SET_SESSIONS = 'SET_SESSIONS';

const sessionsModule = {
    state: () => ({
        sessions: [],
    }),
    actions: {
        [GET_SESSIONS](context) {
            ApiService.get('/capture-sessions')
                .then((response) => {
                    context.commit(SET_SESSIONS, response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    },
    mutations: {
        [SET_SESSIONS](state, sessions) {
            state.sessions = sessions
        }
    },
    getters: {
        sessions(state) {
            return state.sessions
        }
    },
}

export default sessionsModule;