import Vue from 'vue';

import {
    SET_AUTHORITIES,
    SET_PUBLIC_KEY,
    SET_USERINFO,
    SET_TOKEN,
    CLERN_TOKEN,
    CLERN_USERINFO,
    SET_INDEXDATA
} from '../../mutation-types';

//获取权限列表
const getAuthorities = async ({ dispatch, commit },params) => {
    try {
        let response = await Vue.axios.get('backstage-users/authorities');
        commit(SET_AUTHORITIES,response.data.permissionKeyList);
    } catch (err) {
        console.log(err);
    }
};

//获取首页数据
const indexData = async({commit},queryCondition) => {
    try {
        let response = await Vue.axios.get('/common/say-hi',{params:queryCondition})
        commit(SET_INDEXDATA,response.data)
    } catch (e) {
        console.log(err);
    }
}
//获取rsaId和PublicKey
const getPublicData = async({commit}) => {
    try {
        let response = await Vue.axios.get('backstage-users/public-key');
        commit(SET_PUBLIC_KEY,response.data)
    } catch (err) {
        console.log(err);
    }
};

//登录
const login = async({commit},params) => {
    try {
        let response = await Vue.axios.post('/backstage-users/login',{...params});
        commit(SET_TOKEN, response.data.token)
        commit(SET_USERINFO, JSON.stringify(response.data.userInfo))
        return true
    }catch (err) {
        console.log(err);
    }
};

//退出登录
const loginOut = ({commit}) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userinfo');
    commit(CLERN_TOKEN);
    commit(CLERN_USERINFO);
};

export default {
    getAuthorities,
    getPublicData,
    login,
    loginOut,
    indexData
}
