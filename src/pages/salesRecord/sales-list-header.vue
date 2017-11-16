<template lang="html">
    <div class="">
        <el-form ref="condition" :model="condition" label-width="100px" label-position="left">
            <el-row :gutter="20">
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="综合体编号 :">
                        <el-input placeholder="综合体编号" v-model="condition.workstationCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="综合体名称 :">
                        <el-input placeholder="综合体名称" v-model="condition.workstationName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="数据来源 :">
                        <el-select v-model="condition.sourceType" placeholder="请选择">
                            <el-option
                              v-for="item in sourceOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="所属地区 :">
                        <el-cascader
                        v-model="condition.region"
                        :options="creatRegion"                      
                        clearable>
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="销售日期 :">
                        <el-date-picker
                          v-model="condition.begTime"
                          type="date"
                          :editable="false"
                          placeholder="开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="至 :">
                        <el-date-picker
                          v-model="condition.endTime"
                          type="date"
                          :editable="false"
                          placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="单据状态 :">
                        <el-select v-model="condition.status" placeholder="全部状态">
                            <el-option
                              v-for="item in statusOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="上传日期 :">
                        <el-date-picker
                          v-model="condition.begCreateTime"
                          type="datetime"
                          :editable="false"
                          placeholder="开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="12" :md="8">
                    <el-form-item label="至 :">
                        <el-date-picker
                          v-model="condition.endCreateTime"
                          type="datetime"
                          :editable="false"
                          placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ToolAtion from '../../components/common/toolAtion'
import Gzlist from '../../components/list'

export default {
    name:'sales-list-header',
    data() {
        return {
            condition: {
                workstationCode:'',
                workstationName: '',
                sourceType: -1,
                region: [],
                begTime: '',
                endTime: '',
                status: -1,
                begCreateTime: '',
                endCreateTime: '',
            },
             sourceOptions: [
                { value: -1, label: '所有来源' },
                { value: 1, label: '系统导入' },
                { value: 0, label: '海信数据' },
            ],
            statusOptions: [
                { value: -1, label: '所有状态' },
                { value: 10, label: '作废' },
                { value: 99, label: '有效' },
                { value: 30, label: '冲正' },
                { value: 20, label: '被冲正' },
            ]
        }
    },
    computed:{
        ...mapGetters([
            'region'
        ]),
        creatRegion() {
            return ToolAtion.createTree(this.region)
        }
    },
    methods: {
        ...mapActions([
            'getRegion'
        ])
    }
}
</script>

<style lang="less" scoped>

</style>
