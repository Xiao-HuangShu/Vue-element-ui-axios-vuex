
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import ElementUI from 'element-ui';
import { Notification } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.config.productionTip = false;
Vue.config.debug = (process.env.NODE_ENV !== 'production');

Vue.use(ElementUI);
Vue.use(Vuex);

 /*
    Vue.use(axios);
    如果只安装了axios,没有安装vue-axios,这么引用报错
    isURLSameOrigin.js?142d:57 Uncaught (in promise) TypeError: Cannot read property 'protocol' of undefined
    原型引用不会报错Vue.prototype.$ajax = axios;
 */

const axios = Axios.create({
    baseURL: '/api',
    //baseURL: 'http://10.66.30.66:81/api',
    timeout: 15000,
    validateStatus: () => true
});

const allNotify = (msg) => {
    Notification.error({
          title: '错误',
          message: msg,
          type: 'error',
          duration: 2000,
          offset: 50
    });
}

Vue.use(VueAxios, axios);

// 添加请求拦截器--请求之前做的事
Vue.axios.interceptors.request.use((config) => Object.assign({},config, {
    headers: {
        token: store.getters.token,
    }
}))

// 添加响应拦截器
Vue.axios.interceptors.response.use((res)=>{
    if(res.status === 200){
        if(res.data.code === '0'){
            return res.data;
        }else {
            allNotify(res.data.msg);
            return false;
        }
    }
    if (res.status === 401) {
        router.replace('/login');
    }
    if (res.status === 403) {
        router.replace('/index');
        allNotify('无权限')
        return false
    }
    if (res.status === 500) {
        allNotify('服务器错误！')
        return false
    }
    if (res.status >= 400) {
       allNotify('暂时无法访问，请稍后重试!')
       return false
    }
},(err) => {
    if (String(err).indexOf('Network Error') !== -1) {
        allNotify('网络错误！')
        return false
    }
    allNotify('网络连接超时！')
    return false
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
