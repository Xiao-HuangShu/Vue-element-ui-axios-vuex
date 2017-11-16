import Vue from 'vue';
import getters from './getters';
import actions from './actions';

import { REGION } from '../../mutation-types'

const initState = {
    region: []
}

const mutations = {
    [REGION](state, data) {
        Vue.set(state, 'region', data)
    }
}

export default {
    state: initState,
    mutations,
    actions,
    getters
};
