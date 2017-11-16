<template lang="html">
    <div class="agent-list">
        <gz-list
            ref="agentList"
            :checkBox="checkBox"
            :headerData="headerData"
            :listData="formatAgentList"
            :operation="operation"
            :loading="loading"
            :pagingInfo="pagingInfo"
            @getData="getData"
            @operation-click="operationClickTodo">
        >
            <agent-list-header slot="searchForm" ref="searchForm" ></agent-list-header>
            <div class="toolbar-line" slot="toolbar">
                <el-row :gutter="5" >
                    <el-button @click="getData" type="primary">查询</el-button>
                    <el-button :loading="exportLoading" @click="agentListExport" type="primary">导出</el-button>
                    <el-button type="success" @click="changeAgentStatus(50)">启用</el-button>
                    <el-button type="danger" @click="changeAgentStatus(-1)">禁用</el-button>
                    <a ref="agentDownload" v-show="false" :href="aentExportUrl" />
                </el-row>
            </div>
        </gz-list>
        <agent-detail @closeDialog="closeDialog" :dialogSwitch="dialogSwitch" :viewData='dialogData'></agent-detail>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'
import GzList from '../../components/list'
import Header from './agent-list-header'
import Constant from './list-constant'
import agentDetail from './agent-detail'
import ToolAtion from '../../components/common/toolAtion'

export default {
    extends: BaseComponent,
    data() {
        return {
            checkBox: true, //是否多选
            loading: false, // 列表loading
            exportLoading: false, // 导出loading
            headerData: Constant.agentColNameMap,
            operation: Constant.agentOperation,
            pagingInfo: {
                total: 0
            },
            dialogSwitch: false,
            dialogData: {},
            aentExportUrl: ''
        }
    },
    components:{
        [GzList.name]: GzList,
        [Header.name]: Header,
        [agentDetail.name]: agentDetail,
    },
    computed: {
        ...mapGetters([
            'agentList'
        ]),
        formatAgentList() {
          return this.agentList.map((item) => {
              return Object.assign({}, item, {
                    cityName: item.region.city.name,
                    districtName: item.region.district.name,
                    townName: item.region.town.name,
                    villageName: item.region.village.name,
                    agentState: item.agentState === 50 ? '在职' : '离职',
                    status: item.status === 50 ? '已启用' : '已禁用',
                })
            })
        }
    },
    methods: {
        ...mapActions([
            'getAgentList',
            'agentExport',
            'agentEnable'
        ]),
        //代办员列表
        getData() {
            this.$set(this, 'loading', true)
            let condition = this.$refs.searchForm.condition;
            let paging = this.$refs.agentList.paging;
            condition =  Object.assign({},condition,{
                region: {
                    cityCode: condition.region[0] || '',
                    districtCode: condition.region[1] || '',
                    townCode: condition.region[2] || '',
                    villageCode: condition.region[3] || ''
                }
            })
            this.getAgentList({paging:paging,condition:condition})
            .then((pagingInfo) => {
                this.$set(this, 'pagingInfo', pagingInfo);
                this.$set(this, 'loading', false)
            })
        },
        // 导出,获取地址的action写在base中
        agentListExport() {
            this.$set(this, 'exportLoading', true);
            this.agentExport(this.$refs.searchForm.condition)
            .then((data) => {
                this.$set(this, 'aentExportUrl', this.exportUrl(data));
            })
            .then(() => {
                this.$refs.agentDownload.click()
                this.$set(this, 'exportLoading', false);
            })
        },
        // 代办员启用禁用
        changeAgentStatus(params) {
            if (this.$refs.agentList.selectedData.length === 0) {
                ToolAtion.selectNotify()
                return;
            } else {
                const saleIds = this.$refs.agentList.selectedData.map((item) => item.agentId)
                this.agentEnable({saleIds: saleIds, status: params})
                .then((data) => {
                    if (data) {
                        ToolAtion.resultNotify();
                        this.getData();
                    }
                })
            }
        },
        //查看代办员详情
        operationClickTodo(params) {
            this.$set(this, 'dialogSwitch', true)
            if(params) {
                this.$set(this, 'dialogData', params.data)
            }else {
                this.$set(this, 'dialogData', null)
            }
        },
        // 关闭Dialog
        closeDialog() {
            this.$set(this, 'dialogSwitch', false)
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>

</style>
