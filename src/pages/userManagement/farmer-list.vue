<template lang="html">
    <div class="farmer-list">
        <gz-list
            ref="farmerList"
            :headerData="headerData"
            :listData="farmerList"
            :loading="loading"
            :pagingInfo="pagingInfo"
            @getData="getData"
        >
            <famer-list-header ref="farmerListHeader" slot="searchForm"></famer-list-header>
            <div class="toolbar-line" slot="toolbar">
                <el-row :gutter="5" >
                    <el-button @click="getData" type="primary">查询</el-button>
                    <el-button :loading="exportLoading" @click="farmerListExport" type="primary">导出</el-button>
                    <a ref="farmerDownload" v-show="false" :href="farmerExportUrl" />
                </el-row>
            </div>
        </gz-list>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'
import Constant from './list-constant'
import GzList from '../../components/list'
import Header from './farmer-list-header'

export default {
    extends: BaseComponent,
    data() {
        return {
            loading: false,
            exportLoading: false,
            farmerExportUrl: '',
            pagingInfo: {
                total: 0
            },
            headerData: Constant.farmerColNameMap,
        }
    },
    components: {
        [GzList.name]: GzList,
        [Header.name]: Header
    },
    computed: {
        ...mapGetters([
            'farmerList'
        ])
    },
    methods: {
        ...mapActions([
            'getFarmerList',
            'exportFarmerList'
        ]),
        // 查询条件
        searchCondition() {
            let condition = this.$refs.farmerListHeader.condition;
            condition =  Object.assign({},condition,{
                region: {
                    cityCode: condition.region[0] || '',
                    districtCode: condition.region[1] || '',
                    townCode: condition.region[2] || '',
                    villageCode: condition.region[3] || ''
                }
            });
            return condition
        },
        // 列表数据
        getData() {
            this.$set(this, 'loading', true)
            let paging = this.$refs.farmerList.paging;
            let condition = this.searchCondition();
            this.getFarmerList({paging, condition})
            .then((pagingInfo) => {
                this.$set(this, 'loading', false);
                this.$set(this, 'pagingInfo', pagingInfo)
            })
        },
        // 导出
        farmerListExport() {
            this.$set(this, 'exportLoading', true)
            let condition = this.searchCondition();
            this.exportFarmerList({condition})
            .then((key) => {
                this.$set(this, 'farmerExportUrl', this.exportUrl(key))
            })
            .then(() => {
                this.$refs.farmerDownload.click();
                this.$set(this, 'exportLoading', false);
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>

</style>
