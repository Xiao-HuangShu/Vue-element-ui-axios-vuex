import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import { APP_ROLE_LIST, PERSON_LIST } from '../../mutation-types';

const initState = {
    roleList: [],
    personList: []
};

const mutations = {
    [APP_ROLE_LIST](state, data) {
        Vue.set(state, 'roleList', data)
    },
    [PERSON_LIST](state, data) {
        Vue.set(state, 'personList', data)
    }
};

export default {
    state: initState,
    actions,
    getters,
    mutations
}
