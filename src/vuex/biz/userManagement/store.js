import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_AGENT_LIST,
    SET_FARMER_LIST
} from '../../mutation-types';

const initState = {
    agentList: [],
    farmerList: []
}

const mutations = {
    [SET_AGENT_LIST](state, data) {
        Vue.set(state, 'agentList', data)
    },
    [SET_FARMER_LIST](state, data) {
       Vue.set(state, 'farmerList', data)
    }
}

export default {
    state: initState,
    mutations,
    actions,
    getters
}
