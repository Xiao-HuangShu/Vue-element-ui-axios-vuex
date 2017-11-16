<template lang="html">
    <el-table
        stripe
        border
        highlight-current-row
        ref="table"
        :data="dataList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectHook"
        max-height="600"
    >
        <el-table-column
            type="selection"
            :selectable="selectabler">
        </el-table-column>
        <el-table-column
            label="操作"
            width="140px"
            align="center"
            >
            <template slot-scope="scope">
                <el-button size="small" type="primary" @click="oneSubmit(scope.$index)">提交</el-button>
                <el-button size="small" type="danger" @click="oneDelete(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
        <el-table-column
            type="index"
            label="序号"
            width="65px"
            align="center"
            >
        </el-table-column>
        <el-table-column
            prop="name"
            label="文件名称"
            min-width="200px"
            align="center"
            show-overflow-tooltip
            >
        </el-table-column>
        <el-table-column
            prop="stationCode"
            label="综合体编号"
            min-width="120px"
            align="center"
            >
        </el-table-column>
        <el-table-column
            prop="stationCode"
            label="综合体名称"
            min-width="150px"
            align="center"
            show-overflow-tooltip
            >
        </el-table-column>
        <el-table-column
            label="上传结果"
            min-width="120px"
            align="center"
            >
            <template slot-scope="scope">
                <label style="color:#04abfe" v-if="scope.row.resultStatus == true">提交成功</label>
                <label style="color:red" v-if="scope.row.resultStatus == false">提交失败</label>
            </template>
        </el-table-column>
        <el-table-column
            label="失败日志"
            min-width="150px"
            align="center"
            style="color:red"
            >
            <template slot-scope="scope">
                <label style="color:red">{{scope.row.log}}</label>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'data-list',
    props: {
        dataList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            selectedList: [] // 选中的文件列表
        }
    },
    methods: {
        // 当前行是否能选择
        selectabler(row) {
            if(row.resultStatus) {
                return false
            }
            return true
        },
        //  选择发生变化时的钩子
        selectHook(val) {
            this.selectedList = val;
            this.$emit('changeBatchBtn')
        },
        // 单个提交
        oneSubmit(index) {
            this.$refs.table.clearSelection()
            this.$refs.table.toggleRowSelection(this.dataList[index], true)
            this.timer = setTimeout(() => {
                this.$emit('formatTime')
            }, 100)
        },
        // 单个删除
        oneDelete(index) {
            this.$emit('oneDelete', index)
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
}
</script>

<style lang="css">
</style>
