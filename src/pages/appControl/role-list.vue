<template lang="html">
    <div class="role-list">
        <gz-list
            ref="roleList"
            :loading="loading"
            :headerData="headerData"
            :listData="formatRoleList"
            :operation="operation"
            :pagingInfo="pagingInfo"
            @operation-click="changePermissions"
        >
        </gz-list>
        <el-dialog
            title="权限分配"
            :visible.sync="dialogVisible"
            size="small"
            :lock-scroll="false"
            @close="closeDialog"
        >
            <el-row :gutter="20">
                <el-checkbox-group v-model="selectedData">
                    <el-col :xs="24" :sm="8" :md="4" :key="item.authId" v-for="item in authorityList">
                        <el-checkbox :checked="item.have" :label="item.authId" :key="item.authId" >{{item.authName}}</el-checkbox>
                    </el-col>
                </el-checkbox-group>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = !dialogVisible">取 消</el-button>
                <el-button type="primary" @click="submitAuthority">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'
import GZList from '../../components/list'
import Constant from './list-constant'

export default {
    extends: BaseComponent,
    data() {
        return {
            loading: false,
            dialogVisible: false,
            pagingInfo: {
                total: 0
            },
            headerData: Constant.roleColNameMap,
            operation: Constant.roleoperation,
            authorityList: [],
            selectedData: [],
            roleId: ''
        }
    },
    components:{
        [GZList.name]: GZList
    },
    computed: {
        ...mapGetters([
            'roleList'
        ]),
        formatRoleList() {
            return this.roleList.map((item) => {
                return Object.assign({}, item, {
                    status: item.status === 0 ? '正常' : '禁用',
                    createTime: this.formatTime(item.createTime)
                });
            });
        },
    },
    methods: {
        ...mapActions([
            'getAppRoleList',
            'getAuthority',
            'changRole'
        ]),
        getData() {
            this.$set(this, 'loading', true);
            this.getAppRoleList({paging: this.$refs.roleList.paging})
            .then((pagingInfo) => {
                this.$set(this, 'pagingInfo', pagingInfo)
                this.$set(this, 'loading', false)
            });
        },
        changePermissions(params) {
            this.getAuthority(params.data.roleId)
            .then((data) => {
                this.$set(this, 'roleId', params.data.roleId)
                this.$set(this, 'authorityList', data)
                this.$set(this, 'dialogVisible', true)
            })
        },
        // 确认回调
        submitAuthority() {
            this.changRole({roleId: this.roleId, authority: this.selectedData})
            .then((msg) => {
                if (msg) {
                    this.$notify({
                        title: '成功',
                        message: msg,
                        type: 'success',
                        duration: 2000,
                    });
                    this.$set(this, 'dialogVisible', false)
                }
            });
        },
        // 关闭回调
        closeDialog() {
            this.$set(this, 'selectedData', [])
            this.$set(this, 'authorityList', [])
        },
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>
</style>
