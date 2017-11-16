<template lang="html">
    <el-dialog
    :title="title"
    :visible.sync="dialogSwitch"
    :lock-scroll="false"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    size="tiny"
    @close="closeDialog"
    >
        <div class="panel">
            <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-position="right" label-width="60px">
                <el-form-item label="姓名:" prop="name" >
                    <el-input v-model="dialogForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="角色:" style="width=100%" prop="roleId">
                    <el-select  v-model="dialogForm.roleId" placeholder="请选择角色">
                        <el-option
                            v-for="item in options"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机:" type="number" prop="phone">
                    <el-input v-model="dialogForm.phone" ></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remark" >
                    <el-input type="textarea" v-model="dialogForm.remark" ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="okcloseDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'add-edit-person',
    props: {
        dialogSwitch: {
            type: Boolean,
            default: () => false
        },
        title: {
           type: String,
           default: () => ''
        },
        dialogForm: {
            type: Object,
            default: () => ({ name: '', roleId: null, phone: '', remark: '' })
        }
    },
    data() {
        return {
            rules: {
                name: [
                   { required: true, message: '请输入姓名', trigger: 'blur'},
                  //  { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                ],
                roleId: [
                    { required: true, type: "number", message: '请选择角色', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
                ]
            },
            options: [
                { value: 2,label: '物流人员' },
                { value: 3,label: '信息录入人员' },
                { value: 4,label: '信息录入+物流' },
                { value: 5,label: '培训账号' },
                { value: 6,label: '城市经理' },
                { value: 1,label: '业务员' }
            ],
            from: this.dialogForm
        }
    },
    methods: {
        closeDialog() {
            this.$refs['dialogForm'].resetFields()
            this.$emit('closeDialog')
        },

        okcloseDialog() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    this.okSubmit()
                }
            })
        },
        // 有type是编辑，没有是新增
        okSubmit() {
            if (this.dialogForm.type) {
                this.$emit('editSubmit');
            }else {
                this.$emit('addSubmit');
            }
        },
        // 重置表单
        resetForm() {
            // this.$refs.dialogForm.resetFields(); // 两种写法都可以
            this.$refs['dialogForm'].resetFields();
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
    .panel {
        padding: 0px 3%;
    }
</style>
