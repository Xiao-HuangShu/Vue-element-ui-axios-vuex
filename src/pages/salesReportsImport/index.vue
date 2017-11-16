<template lang="html">
    <div class="sales-report-import" v-loading="loading">
        <el-form label-width="104px"  >
            <el-row :gutter="20">
                <el-col :xs="14" :sm="14" :md="8">
                    <el-form-item label="选择销售日期 :">
                        <el-date-picker
                            v-model="saleTime"
                            type="date"
                            :editable="false"
                            placeholder="请选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col style="width:120px">
                    <el-button @click="downClick" type="primary" :disabled="!checkAuth('salerecord-export')"><i class="el-icon-caret-bottom"></i> 下载模板</el-button>
                    <a ref="downloadDOM" :href="downloadUrl"></a>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18">
                    <el-upload
                        multiple
                        ref="upload"
                        :headers="getToken"
                        :action="`/api/saleRecord/Import/${this.formatDate(this.saleTime)}`"
                        accept=".xls,.xlsx"
                        :auto-upload="false"
                        :show-file-list="false"
                        :file-list="fileList"
                        :on-change="uploadeFiles"
                        :on-success="onSuccess"
                        :on-error="onError"
                    >
                        <el-button slot="trigger" style="margin-right: 10px;" type="primary" ><i class="el-icon-upload2"></i> 添加文件</el-button>
                        <el-button @click="formatTime" :disabled="batchBtn" type="primary"><i class="el-icon-upload"></i> 批量提交</el-button>
                        <el-button @click="batchDelete" :disabled="batchBtn" type="danger"><i class="el-icon-delete"></i> 批量删除</el-button>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form>
        <data-list
            ref="fileListData"
            style="margin-top:2%"
            :dataList="addFiles"
            @changeBatchBtn="changeBatchBtn"
            @oneDelete="oneDelete"
            @formatTime="formatTime"
        >
        </data-list>
    </div>
</template>

<script>
import BaseComponent from '../base'
import { mapGetters, mapActions } from 'vuex'
import DataList from './import-list'
import { MessageBox } from 'element-ui';
export default {
    extends: BaseComponent,
    data() {
        return {
            loading: false,
            saleTime: new Date(),
            disabled:true,
            downloadUrl:'',
            addFiles: [], // 添加的文件列表
            fileList: [], // 准备上传的文件列表
            batchBtn: true,
            uploadAddress: ''
        }
    },
    components: {
        [DataList.name]: DataList
    },
    computed: {
        ...mapGetters([ 'token' ]),
        getToken() {
            return {
                token: this.token
            }
        }
    },
    methods: {
        ...mapActions([ 'getDownloadUrl' ]),
        // 批量按钮是否禁用
        changeBatchBtn() {
            if(this.$refs.fileListData.selectedList.length > 0){
                this.$set(this, 'batchBtn', false)
                // 把选中的文件给上传组件,用this.$set会警告
                this.fileList = this.$refs.fileListData.selectedList
            }else {
                this.$set(this, 'batchBtn', true)
                this.fileList = this.$refs.fileListData.selectedList
            }
        },
        // 下载模板
        downClick() {
            this.$set(this, 'loading', true)
            this.getDownloadUrl()
            .then((url) => {
                this.$set(this, 'downloadUrl', url)
            })
            .then(() => {
                this.$refs.downloadDOM.click()
                this.$set(this, 'loading', false)
            })
        },
        // 添加文件、上传成功、失败时的钩子f(event, file, fileList)
        uploadeFiles(file, fileList) {
            if(file.status === 'ready') {
                this.addFiles.push(file)
            }
        },
        // 单个删除
        oneDelete(index) {
            this.messageBox().then(() => { this.addFiles.splice(index, 1) })
        },
        // 批量删除
        batchDelete() {
            // 把要删除的数组放在内层循环才对，是因为元素删除后下标在变，在内层再次循环时是删除元素后的新数组
            this.messageBox()
            .then(() => {
                this.$refs.fileListData.selectedList.forEach((items, index) => {
                    this.addFiles.forEach((item, indexa) => {
                        if(item.uid == items.uid){
                             this.addFiles.splice(indexa, 1)
                        }
                    })
                })
            })
        },
        // 批量提交
        batchSubmit() {
            this.$refs.upload.uploadFiles.forEach(async(file) => {
                this.$set(this, 'loading', true);
                await this.$refs.upload.$refs['upload-inner'].upload(file.raw);
            })
        },
        //  与服务器交互成功的钩子
        onSuccess(response, file) {
            let result = response.data[0];
            this.addFiles.forEach((item) => {
                if(file.uid == item.uid) {
                    // 这里不能用赋值的方式，页面不会刷新
                    this.$set(item, 'stationCode', '接口没返回');
                    this.$set(item, 'statioName', '接口没返回');
                    // status是特有的，显示的要从新给一个状态，不然手动勾选状态就会改变
                    this.$set(item, 'resultStatus', result.status);
                    this.$set(item, 'log', result.msg);
                }
            })
            this.$set(this, 'loading', false);
        },
        // 异常处理
        onError(err) {
            const errToast = JSON.parse(err.toString().substring(err.toString().indexOf('{'), err.toString().length));
            this.uploadList.forEach((item) => {
                if(item.uid === file.uid) {
                    // 这里不能用赋值的方式，页面不会刷新
                    this.$set(item, 'stationCode', '接口没返回');
                    this.$set(item, 'statioName', '接口没返回');
                    // status是特有的，显示的要从新给一个状态，不然手动勾选状态就会改变
                    this.$set(item, 'resultStatus', result.status);
                    this.$set(item, 'log', errToast.msg ? errToast.msg : '未处理的异常');
                };
            })
            this.$set(this, 'loading', false);
        },
        // messageBox
        messageBox() {          
            return MessageBox.confirm('删除后需从新上传，确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
        },
        // 销售日期判断, 必须有日期才能提交
        formatTime() {
            if(this.saleTime) {
                this.batchSubmit()
            }else {
                this.$notify({
                    title: '警告',
                    message: '请选择销售日期',
                    type: 'error',
                    duration: 2000,
                    offset: 100
                })
            }
        }
    }
}
</script>

<style lang="css">
</style>
