<template lang="html">
    <div class="">
        <gz-list
            ref="salesRecord"
            :loading="loading"
            :pagingInfo="pagingInfo"
            :headerData="headerData"
            :listData="formatSalesRecordList"
            @getData="getData"
        >
            <sales-list-header ref="salesRecordHeader" slot="searchForm"></sales-list-header>
            <div class="toolbar-line" slot="toolbar">
                <el-button type="primary" @click="getData" >查询</el-button>
            </div>
        </gz-list>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Gzlist from '../../components/list'
import BaseComponent from '../base'
import Header from './sales-list-header'
import Constant from './list-constant'

export default {
    extends: BaseComponent,
    data() {
        return {
            loading: false,
            pagingInfo:{
                total: 0
            },
            headerData: Constant.salesColNameMap
        }
    },
    components: {
        [Gzlist.name]: Gzlist,
        [Header.name]: Header
    },
    computed: {
        ...mapGetters([
            'salesRecordList'
        ]),
        formatSalesRecordList() {
            return this.salesRecordList.map((item) => {
                return Object.assign({}, item, {
                    saleTime: this.formatDate(item.saleTime),
                    closingTime: this.formatTime(item.closingTime),
                    createTime: this.formatTime(item.createTime),
                    status_c: this.statusHandle(item.status),
                    sourcetype_c: item.sourcetype === 1 ? '系统导入' : '海信数据'
                });
            });
        }
    },
    methods: {
        ...mapActions([
            'getSalesRecord'
        ]),
        getData() {
            this.$set(this, 'loading', true);
            let paging = this.$refs.salesRecord.paging;
            let condition = this.$refs.salesRecordHeader.condition;
            condition.cityCode = condition.region[0];
            condition.districtCode = condition.region[1];
            condition.townCode = condition.region[2];
            condition.villageCode = condition.region[3];
            if(this.timeInterval(condition.begTime, condition.endTime) && this.timeInterval(condition.begCreateTime, condition.endCreateTime)) {
                this.getSalesRecord({ paging, condition })
                .then((pagingInfo) => {
                    this.$set(this, 'pagingInfo', pagingInfo)
                    this.$set(this, 'loading', false)
                });
            }else {
                this.$set(this, 'loading', false)
                this.$notify({
                    title: '错误',
                    message: '请选择正确的开始时间和结束时间！',
                    type: 'error',
                    duration: 2000,
                })
            }
        },
        // status、状态处理
        statusHandle(params) {
            switch (params) {
                case 10:
                    return '作废';
                case 20:
                    return '被冲正';
                case 30:
                    return '冲正';
                case 99:
                    return '有效';
                default: return '';
            }
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style lang="less" scoped>
</style>
