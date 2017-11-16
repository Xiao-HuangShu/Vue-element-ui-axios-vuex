import Vue from 'vue'
import { SET_SALES_RECORD } from '../../mutation-types'

const getSalesRecord = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('saleOrder/searchList', params);
        commit(SET_SALES_RECORD, response.data.itemList);      
        return response.data.paging
    } catch (e) {
        console.log(e);
    }
}

export default {
    getSalesRecord
}
