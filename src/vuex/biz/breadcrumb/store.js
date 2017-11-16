import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_BREADCRUMB } from '../../mutation-types';

export const initState = {
    breadcrumbs: []
}

const mutations = {
    [SET_BREADCRUMB](state, breadcrumbs) {
        Vue.set(state,'breadcrumbs',breadcrumbs)
    }
}

export default {
    state: initState,
    actions,
    getters,
    mutations
}
