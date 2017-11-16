import Vue from 'vue';

import {
    SET_AGENT_LIST,
    SET_FARMER_LIST
} from '../../mutation-types'

// 代办员查询接口
const getAgentList = async({commit},{paging,condition}) => {
    try {
        let response = await Vue.axios.post('/agents/search',{paging, condition})
        commit(SET_AGENT_LIST, response.data.itemList)
        return response.data.paging
    } catch (e) {
        console.log(e);
    }
};

// 导出
const agentExport = async({commit}, params) => {
    try {
        let response = await Vue.axios.post('/agents/export', { params });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 启用禁用
const agentEnable = async({commit}, params) => {
    try {
        let response = await Vue.axios.post('/agents/disable-enable', params);
        if (response) {
            return response.data
        }else {
            return response;
        }
    } catch (err) {
        return err
    }
};

// 农户信息
const getFarmerList = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('farmer/search', params);
        commit(SET_FARMER_LIST, response.data.itemList)
        return response.data.paging;
    } catch (e) {
        console.log(e);
    }
};

// 农户信息导出
const exportFarmerList = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('farmer/search-export', params);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export default {
    getAgentList,
    agentExport,
    agentEnable,
    getFarmerList,
    exportFarmerList
}
