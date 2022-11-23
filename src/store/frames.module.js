import {ApiService} from "@/services/api";

export const GET_FRAMES = 'GET_FRAMES';

export const SET_FRAMES = 'SET_FRAMES';

const framesModule = {
    state: () => ({
        frames: [],
    }),
    actions: {
        [GET_FRAMES](context) {
            ApiService.get('/session-frames')
                .then((response) => {
                    context.commit(SET_FRAMES, response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    mutations: {
        [SET_FRAMES](state, frames) {
            state.frames = frames;
        }
    },
    getters: {
        frames(state) {
            return state.frames;
        }
    }
}

export default framesModule;