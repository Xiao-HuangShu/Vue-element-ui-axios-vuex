<template lang="html">
    <el-form label-position="left" label-width="100px">
        <el-row :gutter="20" >
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="选择地区 :" >
                    <el-cascader

                        placeholder="选择地区"
                        :options="creatRegion"
                        v-model="condition.region"
                        clearable
                        >
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="综合体名称 :" >
                    <el-input placeholder="综合体名称" v-model="condition.station"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="综合体编号 :">
                    <el-input placeholder="综合体编号" v-model="condition.stationCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xs="18" :sm="12" :md="8" >
                <el-form-item label="计划状态 :">
                    <el-select  v-model="condition.planState" placeholder="计划状态">
                        <el-option
                            v-for="item in planState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="12" :md="8" >
                <el-form-item label="农户姓名 :">
                    <el-input placeholder="农户姓名" v-model="condition.farmerName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="12" :md="8" >
                <el-form-item label="联系电话 :">
                    <el-input placeholder="联系电话" v-model="condition.phone"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseComponent from '../base'
import ToolAtion from '../../components/common/toolAtion'

export default {
    name: 'famer-list-header',
    data() {
        return {
            planState: [
                {
                    value: 2,
                    label: '全部状态'
                }, {
                    value: 0,
                    label: '未建计划'
                }, {
                    value: 1,
                    label: '已建计划'
                }
            ],
            condition: {
                station: '',
                stationCode: '',
                farmerName: '',
                phone: '',
                planState: 2,
                region: []
            }
        }
    },
    components: {

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
        ])
    },
    mounted() {

    }
}
</script>

<style lang="css">
</style>
