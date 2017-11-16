import Vue from 'vue'
import { SALES_REPORT_IMPORT } from '../../mutation-types'

const getDownloadUrl = async({ commit }) => {
    try {
        let response = await Vue.axios.get('salerecord/export');      
        return response.data
    } catch (e) {
        console.log(e);
    }
}

export default {
    getDownloadUrl
}
