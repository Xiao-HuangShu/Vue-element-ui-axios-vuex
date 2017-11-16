<template lang="html">
      <el-dialog :title="`${viewData.agentName}个人信息`"
      :visible.sync="dialogSwitch"
      :show-close="false"
      :lock-scroll="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeDialog"
      size="small"
      >
        <el-form label-position="left">
            <el-row :gutter="10" >
                <el-col :xs="24" :sm="24" :md="8" >
                    <el-form-item   label="姓名 :">
                        {{viewData.agentName}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7">
                    <el-form-item label="开户银行 :">
                        {{viewData.bankName}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="9">
                    <el-form-item label="服务站名称 :">
                        {{viewData.station}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10" >
                <el-col :xs="24" :md="8" >
                    <el-form-item  label="电话 :">
                        {{viewData.agentPhone}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7">
                    <el-form-item label="银行行号 :">
                        {{viewData.bankNo}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="9">
                    <el-form-item label="服务站地址 :">
                        {{viewData.stationAddress}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10" >
                <el-col :xs="24" :sm="24" :md="8" >
                    <el-form-item  label="身份证 :">
                        {{viewData.idCard}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7">
                    <el-form-item label="服务站编号 :">
                        {{viewData.stationCode}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="9">
                    <el-form-item label="银行卡号 :">
                        {{viewData.bankCard}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10" >
                <el-col :xs="24" :sm="24" :md="8" >
                    <el-form-item label="入职日期 :">
                        {{viewData.entryTime}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="7">
                    <el-form-item label="合作模式 :">
                        {{viewData.workModel}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="9">
                    <el-form-item label="在职状态 :">
                        {{viewData.agentState}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" >
                <el-col :xs="24" :sm="24" :md="11">
                    <el-form-item label="所在地 :">
                        {{formatData(viewData.region)}}
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="13">
                    <el-form-item label="所属公司 :">
                        {{viewData.companyName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="24" :sm="24" :md="7">
                    <el-form-item label="备注 :">
                        {{viewData.dismissTime}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'

export default {
    extends: BaseComponent,
    name:'agent-detail',
    data() {
        return {

        }
    },
    props: {
        viewData: {
            type: Object,
            default: () => {}
        },
        dialogSwitch: {
            type: Boolean,
            default: () => false
        },
    },
    methods: {
        ...mapActions([

        ]),
        closeDialog() {
            this.$emit('closeDialog')
        },
        formatData(parmes) {
            if(parmes) {
                return `${parmes.city.name}${parmes.district.name}${parmes.town.name}${parmes.village.name}`
            }
            return ''
        }
    }
}
</script>

<style lang="less" scoped>

</style>
