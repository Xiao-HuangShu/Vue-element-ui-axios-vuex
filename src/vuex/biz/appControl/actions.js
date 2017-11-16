import Vue from 'vue';

import { APP_ROLE_LIST, PERSON_LIST } from '../../mutation-types';

// 角色列表
const getAppRoleList = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('role/search', params );
        commit(APP_ROLE_LIST, response.data.itemList);
        return response.data.paging;
    } catch (e) {
        console.log(e);
    }
};

// 权限列表
const getAuthority = async({ commit }, roleId) => {
    try {
        let response = await Vue.axios.get(`role/Authority/${roleId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 修改权限
const changRole = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('role/edit', params);
        return response.msg;
    } catch (e) {
        console.log(e);
    }
};

// 人员管理列表
const getPersonList = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post('person/search', params);
        commit(PERSON_LIST, response.data.itemList);
        return response.data.paging;
    } catch (e) {
        console.log(e);
    }
};
// 人员修改
const editPerson = async({ commit }, params) => {
    try {
        let response = await Vue.axios.put(`person/${params.id}`, params.params);
        return response.msg;
    } catch (e) {
        console.log(e);
    }
};

// 添加人员
const addPerson = async({ commit }, params) => {
    try {
        let response = await Vue.axios.post(`person`, params);
        return response.msg;
    } catch (e) {
        console.log(e);
    }
};

// 人员启用禁用
const personUsed = async({ commit }, params) => {  
    try {
        let response = await Vue.axios.post('person/disable-enable', params)
        return response.msg;
    } catch (e) {
        console.log(e);
    }
}

export default {
    getAppRoleList,
    getAuthority,
    changRole,
    getPersonList,
    editPerson,
    addPerson,
    personUsed
}
