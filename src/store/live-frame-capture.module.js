export const SET_DEVICES = 'SET_DEVICES';
export const APPEND_DEVICE = 'APPEND_DEVICE';
export const SET_FRAME = 'SET_FRAME';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';

const liveFrameCaptureModule = {
    state: () => ({
        devices: [],
    }),
    actions: {},
    mutations: {
        [SET_DEVICES](state, devices) {
            state.devices = devices;
        },
        [APPEND_DEVICE](state, device) {
            state.devices = [...state.devices, device];
        },
        [SET_FRAME](state, data) {
            state.devices = [
                ...state.devices.filter((d) => d.deviceId !== data.deviceId),
                {...state.devices.find((d) => d.deviceId === data.deviceId), image: data.image},
            ];
        },
        [REMOVE_DEVICE](state, data) {
            state.devices = state.devices.filter((d) => d.deviceId !== data.deviceId);
        },
        [SET_IS_AUTHORIZED](state, data) {
            state.devices = [
                ...state.devices.filter((d) => d.deviceId !== data.deviceId),
                {...state.devices.find((d) => d.deviceId === data.deviceId), isAuthorized: data.isAuthorized},
            ];
        }
    },
    getters: {
        devices(state) {
            return state.devices;
        }
    }
}

export default liveFrameCaptureModule;