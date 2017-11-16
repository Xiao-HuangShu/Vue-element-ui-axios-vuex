import Vue from 'vue';
import Vuex from 'vuex';

import authCenterStore from './biz/anthCenter/store';
import breadcrumbsStore from './biz/breadcrumb/store';
import userManagement from './biz/userManagement/store';
import region from './common/region/store';
import appControl from './biz/appControl/store'
import salesRecord from './biz/salesRecord/store'
import salesReportsImport from './biz/salesReportsImport/store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        breadcrumbs:breadcrumbsStore,
        authCenter: authCenterStore,
        userManagement: userManagement,
        region: region,
        appControl: appControl,
        salesRecord: salesRecord,
        salesReportsImport: salesReportsImport
    },
    strict: process.env.NODE_ENV !== 'production',
})
