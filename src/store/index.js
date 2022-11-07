import {createStore} from 'vuex';

import user from '@/store/user/user.module';

export default createStore({
    modules: {
        user,
    },
})