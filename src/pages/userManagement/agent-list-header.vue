<template lang="html">
    <el-form label-position="left" label-width="100px" >
        <el-row :gutter="20">
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="所属地区 :">
                    <el-cascader
                        placeholder="选择地区"
                        :options="creatRegion"
                        v-model="condition.region"
                        clearable
                        >
                    </el-cascader>
                </el-form-item >
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="服务站名称 :">
                    <el-input v-model="condition.station" placeholder="服务站名称"></el-input>
                </el-form-item >
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="站点编号 :">
                    <el-input v-model="condition.stationCode" placeholder="站点编号"></el-input>
                </el-form-item >
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="姓名 :" >
                    <el-input v-model="condition.agentName" placeholder="姓名"></el-input>
                </el-form-item >
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="合作模式 :">
                    <el-select  v-model="condition.workModel" placeholder="合作模式">
                        <el-option
                            v-for="item in cooperationModel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item >
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="在职状态 :">
                    <el-select  v-model="condition.agentState" placeholder="在职状态">
                        <el-option
                            v-for="item in workingState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item >
            </el-col>
        </el-row>
        <el-collapse-transition >
            <div v-if="show" >
                <el-row :gutter="20">
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="身份证号 :">
                            <el-input v-model="condition.idCard"  placeholder="身份证号"></el-input>
                        </el-form-item >
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="联系电话 :">
                            <el-input v-model="condition.agentsPhone" placeholder="联系电话"></el-input>
                        </el-form-item >
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="所属公司 :">
                            <el-input v-model="condition.companyName" placeholder="所属公司"></el-input>
                        </el-form-item >
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="入职时间从 :">
                            <el-date-picker

                                :editable="false"
                                v-model="condition.entryTime"
                                type="date"
                                placeholder="选择日期"
                                @change="timeRange"
                                >
                            </el-date-picker>
                        </el-form-item >
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="到 :">
                            <el-date-picker

                                :editable="false"
                                v-model="condition.entryTimeTo"
                                type="date"
                                placeholder="选择日期"
                                @change="timeRange"
                                >
                            </el-date-picker>
                        </el-form-item >
                    </el-col>
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="开户银行 :">
                            <el-input v-model="condition.bankName" placeholder="开户银行"></el-input>
                        </el-form-item >
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="18" :sm="12" :md="8">
                        <el-form-item label="启用状态 :">
                            <el-select  v-model="condition.status" placeholder="启用状态">
                                <el-option
                                    v-for="item in enabled"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item >
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>
        <div class="show-line">
            <el-button  type="text" @click="show=!show">{{show?'关闭更多查询条件':'打开更多查询条件'}}</el-button>
        </div>
    </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ToolAtion from '../../components/common/toolAtion'

export default {
    name: 'agent-list-header',
    data() {
        return {
            show: false,
            selectedOptions: [], //级联选择结果
            cooperationModel: [
                {
                    value: 0,
                    label: '全部模式'
                }, {
                    value: 3,
                    label: '代办员'
                }, {
                    value: 4,
                    label: '合伙人'
                }
            ],
            workingState: [
                {
                    value: 0,
                    label: '所有状态'
                }, {
                    value: 50,
                    label: '在职'
                }, {
                    value: -1,
                    label: '离职'
                }
            ],
            enabled: [
                {
                    value: 0,
                    label: '所有状态',
                }, {
                    value: 50,
                    label: '已启用',
                }, {
                    value: -1,
                    label: '已禁用',
                }
            ],
            condition: {
                agentName: '',
                agentState: 0, //在职离职
                agentsPhone: '',
                bankName: '',
                companyName: '',
                entryTime: '',
                entryTimeTo: '',
                idCard: '',
                station: '',
                stationCode: '',
                status: 0, //启用状态
                workModel: 0, //合作模式
                region: []
            }
        }
    },
    computed: {
        ...mapGetters([
            'region'
        ]),
        creatRegion() {
            return ToolAtion.createTree(this.region)
        },
    },
    methods: {
        ...mapActions([
            'getRegion'
        ]),
        // 时间区域处理
        timeRange() {
            if (this.condition.entryTime > this.condition.entryTimeTo && this.condition.entryTimeTo !=='') {
                 this.$notify({
                    title: '提示',
                    message: '请选择正确的时间范围哦',
                    type: 'warning',
                });
                this.$set(this.condition, 'entryTimeTo', this.condition.entryTime);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .show-line {
        border-bottom: 1px solid #cdcdcd;
    }
</style>
