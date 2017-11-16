<template lang="html">
    <div class="person-manage">
        <gz-list
            ref="personList"
            :loading="loading"
            :headerData="headerData"
            :listData="formatRoleList"
            :pagingInfo="pagingInfo"
            @getData="getData"
        >
            <el-form :model="condition" slot="searchForm" label-position="left" label-width="70px">
                <el-row :gutter="20">
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="姓名 :">
                            <el-input v-model="condition.name" placeholder="人员姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="角色 :">
                            <el-input v-model="condition.roleId" placeholder="人员姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                      <el-form-item label="状态 :">
                          <el-select v-model="condition.status" placeholder="所有状态" >
                              <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table-column
                fixed="left"
                slot="handlerColumn"
                label="操作"
                align="center"
                width="140px"
            >
                <template lang="html" slot-scope="scope">
                    <el-button size="small" type="primary"
                        @click="personEdit(scope.row)"
                    >编辑</el-button>
                    <el-button size="small" type="success"
                        v-if="scope.row.status === '已禁用'"
                        @click="personUse({status: 50, id: scope.row.id})"
                    >启用</el-button>
                    <el-button size="small" type="danger"
                        v-if="scope.row.status === '已启用'"
                        @click="personUse({ id: scope.row.id, status: -1})"
                    >禁用</el-button>
                </template>
            </el-table-column>
            <div class="toolbar-line" slot="toolbar">
                <el-row :gutter="5" >
                    <el-button @click="getData" type="primary">查询</el-button>
                    <el-button @click="personAdd" type="success" >新增</el-button>
                </el-row>
            </div>
        </gz-list>
        <add-edit-person
            ref="dialogData"
            :title="title"
            :dialogSwitch="dialogSwitch"
            :dialogForm="dialogForm"
            @closeDialog="closeDialog"
            @addSubmit="addSubmit"
            @editSubmit="editSubmit"
        ></add-edit-person>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'
import Constant from './list-constant'
import GZList from '../../components/list'
import ChangePerson from './add-EditPerson'

export default {
    extends: BaseComponent,
    data() {
        return {
            loading: false,
            headerData: Constant.personColNameMap,
            pagingInfo: {
                total: 0
            },
            dialogSwitch: false,
            condition: { name: '', roleId: null, status: null },
            options: [
                { value: null, label: '所有状态' },
                { value: 50, label: '已启用' },
                {value: -1, label: '已禁用' }
            ],
            title: '',
            dialogForm: {},
        }
    },
    components:{
        [GZList.name]: GZList,
        [ChangePerson.name]: ChangePerson
    },
    computed: {
        ...mapGetters([
            'personList'
        ]),
        formatRoleList() {
            return this.personList.map((item) => {
                return Object.assign({}, item, {
                    status: item.status === 50 ? '已启用' : '已禁用',
                    createDate: this.formatTime(item.createDate)
                })
            });
        }
    },
    methods: {
        ...mapActions([
            'getPersonList',
            'editPerson',
            'addPerson',
            'personUsed'
        ]),
        getData() {
            this.$set(this, 'loading', true)
            this.getPersonList({paging: this.$refs.personList.paging, condition: this.condition})
            .then((pagingInfo) => {
                this.$set(this, 'pagingInfo', pagingInfo);
                this.$set(this, 'loading', false)
            })
        },
        // 新增
        personAdd() {
            const newRow = {
                roleId: null,
                remark: ''
            };
            this.$set(this, 'title', '新增人员')
            this.$set(this, 'dialogSwitch', true)
            this.$set(this, 'dialogForm', newRow)
        },
        // 编辑
        personEdit(row) {
            const newRow = {
                id: row.id,
                name: row.name,
                phone: row.phone,
                remark: row.remark,
                roleId: parseInt(row.roleId),
                type: 'edit'
            };
            this.$set(this, 'title', '编辑人员')
            this.$set(this, 'dialogForm', newRow)
            this.$set(this, 'dialogSwitch', true)
        },
        // 新增提交
        addSubmit() {
            this.addPerson(this.$refs.dialogData.dialogForm)
            .then((msg) => {
                if (msg) {
                    this.$notify({
                        title: '成功',
                        message: msg,
                        type: 'success',
                        duration: 2000,
                    });
                    this.closeDialog();
                    this.getData();
                }
            });
        },
        // 修改提交
        editSubmit() {
            let condition = {
                id: this.$refs.dialogData.dialogForm.id,
                params: this.$refs.dialogData.dialogForm
            }
            this.editPerson(condition)
            .then((msg) => {
                if (msg) {
                    this.$notify({
                        title: '成功',
                        message: msg,
                        type: 'success',
                        duration: 2000,
                    });
                    this.closeDialog();
                    this.getData();
                }
            })
        },
        // 启用或禁用
        personUse(params) {
            this.personUsed(params)
            .then((msg) => {
                if (msg) {
                    this.$notify({
                        title: '成功',
                        message: msg,
                        type: 'success',
                        duration: 2000,
                    });
                    this.getData();
                };
                this.getData();
            })
        },
        // 关闭closeDialog
        closeDialog() {
            this.$refs.dialogData.resetForm();
            this.$set(this, 'dialogSwitch', false)
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>
.toolbar-line {
    padding-bottom: 1.5%;
    border-bottom: 1px solid #cdcdcd;
}
</style>
