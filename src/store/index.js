import user from '@/store/user.module';
import liveFrameCapture from "@/store/live-frame-capture.module";
import sessions from "@/store/sessions.module";
import frames from "@/store/frames.module";
import devices from "@/store/devices.module";
import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        liveFrameCapture,
        sessions,
        frames,
        devices,
    },
})