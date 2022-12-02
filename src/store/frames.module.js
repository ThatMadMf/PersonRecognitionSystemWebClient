import {ApiService} from "@/services/api";

export const GET_FRAMES = 'GET_FRAMES';
export const GET_INPUT_IMAGE = 'GET_INPUT_IMAGE';
export const GET_OUTPUT_IMAGE = 'GET_OUTPUT_IMAGE';

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
        },
        [GET_INPUT_IMAGE](context, frameId) {
            return ApiService.get(`/session-frames/${frameId}?type=input`)
        },
        [GET_OUTPUT_IMAGE](context, frameId) {
            return ApiService.get(`/session-frames/${frameId}?type=output`)
        },
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