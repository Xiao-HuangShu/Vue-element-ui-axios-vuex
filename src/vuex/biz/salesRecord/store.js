import Vue from 'vue'
import actions from './actions'
import getters from './getters'
import { SET_SALES_RECORD } from '../../mutation-types'

const initState = {
  salesRecordList: []
}

const mutations = {
    [SET_SALES_RECORD](state, data) {
        Vue.set(state, 'salesRecordList' , data)
    }
}

export default {
    state: initState,
    getters,
    actions,
    mutations
}
