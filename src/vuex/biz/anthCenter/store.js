import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import menus from '../../../menus.json';
import {
    SET_AUTHORITIES,
    SET_PUBLIC_KEY,
    SET_USERINFO,
    SET_TOKEN,
    CLERN_TOKEN,
    CLERN_USERINFO,
    SET_INDEXDATA
} from '../../mutation-types'

const initState = {
    menus,
    authorities: [],
    publicData: {},
    token: '',
    userinfo: '',
    indexData: {}
}

const mutations = {
    [SET_AUTHORITIES](state, data) {
        Vue.set(state, 'authorities', data);
    },
    [SET_PUBLIC_KEY](state, data) {
        Vue.set(state, 'publicData', data)
    },
    [SET_USERINFO](state, data) {
        Vue.set(state, 'userinfo',data)
    },
    [SET_TOKEN](state, data) {
        Vue.set(state, 'token', data)
    },
    [CLERN_TOKEN](state, data){
        Vue.set(state, 'token', initState.token)
    },
    [CLERN_USERINFO](state, data){
        Vue.set(state, 'userinfo', initState.userinfo)
    },
    [SET_INDEXDATA](state, data){
        Vue.set(state, 'indexData', data)
    }
};

export default {
    state: initState,
    mutations,
    actions,
    getters
};
