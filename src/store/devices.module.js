import {ApiService} from "@/services/api";

export const GET_DEVICES = 'GET_DEVICES';

export const SET_DEVICES = 'SET_DEVICES';

const devicesModule = {
    state: () => ({
        devices: [],
    }),
    actions: {
        [GET_DEVICES](context) {
            ApiService.get('/devices')
                .then((response) => {
                    context.commit(SET_DEVICES, response.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    },
    mutations: {
        [SET_DEVICES](state, devices) {
            state.devices = devices;
        }
    },
    getters: {
        devices(state) {
            return state.devices;
        }
    }
};

export default devicesModule;