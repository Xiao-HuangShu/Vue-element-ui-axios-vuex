<template lang="html">
    <div class="list-container">
        <slot name="searchForm"></slot>
        <slot name="toolbar"></slot>
        <div class="list">
            <el-table
                stripe
                border
                highlight-current-row
                :data="listData"
                max-height="600"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                @selection-change="handleSelectionChange"
            >
                <!-- 多选 -->
                <el-table-column v-if="checkBox" align="center"  type="selection" width="55" ></el-table-column>
                <!-- 插入自定义列 -->
                <slot name="handlerColumn"></slot>
                <el-table-column
                    v-for="item in headerData"
                    :show-overflow-tooltip="item.tooltip"
                    :label="item.displayName"
                    align="center"
                    :min-width="item.width"
                    :fixed="item.fixed"
                    :key="item.key"
                >
                    <template slot-scope="scope" >
                        <template v-if="item.type === 'button'" class="" >
                            <el-button @click="eventHandling('click', {key: sub.key, data: scope.row })" v-for="sub in operation" :key="sub.key" :type="sub.type" :size="sub.size" >{{sub.text}}</el-button>
                        </template>
                        <template  v-else  :title="scope.row[item.key]"   >
                            {{scope.row[item.key]}}
                        </template>
                    </template >
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination" v-show="listData.length != 0" >
            <el-pagination
                :current-page="paging.pageIndex"
                @current-change="currentChange"
                @size-change="sizeChange"
                :page-size="paging.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagingInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    name: 'gz-list',
    props: {
        checkBox: {
            type: Boolean,
            default: false
        },
        // 表头数据
        headerData: {
            type: Array,
            default: () => []
        },
        // 列表数据
        listData: {
            type: Array,
            default: () => []
        },
        // 操作列数据
        operation: {
            type: Array,
            default: () => []
        },
        // 分页信息
        pagingInfo: {
            type: Object,
            default: () => { total: 0 }
        },
        loading: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            paging: {
                pageSize: 10,
                pageIndex: 1,
            },
            selectedData: []
        }
    },
    methods: {
        // 操作列点击事件
        eventHandling(eventType, params) {
            this.$emit(`operation-${eventType}`, params);
        },
        // 当前页改变回调
        currentChange(pageIndex) {
            this.$set(this.paging, 'pageIndex', pageIndex)
            this.$emit('getData')
        },
        // 每页条数改变回调
        sizeChange(pagesize) {
            this.$set(this.paging, 'pageSize', pagesize)
            this.$emit('getData')
        },
        // 多选
        handleSelectionChange(val) {
            this.selectedData = val;
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
    .list {
        margin-top: 1.5%;
    }
    .pagination {
        text-align: center;
        margin-top:2%
    }
    // 统一定义所有toolbar按钮下的line,不用时在父组件中不写插槽样式
    .toolbar-line {
        padding-top: 1%;
        padding-bottom: 1.5%;
        border-bottom: 1px solid #cdcdcd;
    }
</style>
