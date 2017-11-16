import Vue from 'vue';

import { REGION } from '../../mutation-types'

//所属地区查询
const getRegion = async({commit}) => {
    try {
        let response = await Vue.axios.get('/regions');        
        commit(REGION, response.data)
    } catch (e) {
        console.log(e);
    }
}

export default {
    getRegion
}
