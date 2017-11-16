<template>
    <div class="container_login">
        <div class="title">
            {{title}}
        </div>
        <div class="loginForm">
            <h2>登录</h2>
            <el-form :rules="rules" :model="loginForm" ref="loginForm"  >
                <el-form-item  prop="userName">
                    <el-input  @click="cleanInput(1)" @focus="focusIcon(1)" @blur="blurIcon(1)"  v-model="loginForm.userName" :icon="Icon.userName" placeholder="用户名" ></el-input>
                </el-form-item>
                <el-form-item  prop="userPwd">
                    <el-input type="password" @click="cleanInput(2)" @focus="focusIcon(2)" @blur="blurIcon(2)"  v-model="loginForm.userPwd" :icon="Icon.userPwd" placeholder="密码" ></el-input>
                </el-form-item>
                <el-form-item class="code" prop="code">
                    <el-input style="width:70%" width=30  type="pow"  @click="cleanInput(3)" @focus="focusIcon(3)" @blur="blurIcon(3)" v-model="loginForm.code" :icon="Icon.code"  placeholder="验证码" ></el-input>
                    <el-button @click="getCode" :plain="true" type="primary"  class="imgbutton"><img :src="codeUrl"  class="img"/></el-button>
                </el-form-item>
                <el-form-item >
                    <el-switch v-model="loginForm.keepLogin"  off-text="" on-text="" ></el-switch>
                    <label for="">保持登录</label>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import { JSEncrypt } from 'jsencrypt';

export default {
    name: 'hello',
    data () {
        return {
            title: '国资助手后台管理系统',
            codeUrl:'',
            codePwd: '',
            loginForm: {
                userName: '',
                userPwd: '',
                code: '',
                keepLogin: false
            },
            Icon: {
                userName: 'edit',
                userPwd: 'edit',
                code: 'edit',
            },
            rules: {
                userName: [
                    {required: true, message: '请输入用户名',trigger: 'blur'}
                ],
                userPwd: [
                    {required: true, message: '请输入密码',trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入验证码',trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            'publicData',
            'userinfo',
            'token'
        ])
    },
    methods: {
        ...mapActions([
            'getPublicData',
            'login'
        ]),
        //获取验证码
        getCode() {
            let len = 32;
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            let maxPos = $chars.length;
            for (let i = 0; i < len; i++) {
                this.codePwd = $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            this.codeUrl = `/api/common/validata/${this.codePwd}`;
        },
        //提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getPublicData()
                    .then(()=>{
                        this.beginLogin()
                    })
                } else {
                    this.$notify({
                        message: '登录信息不完整！',
                        type: 'warning',
                        duration: 2000,
                        offset: 100
                    })
                    return false;
                }
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        //登录
        beginLogin() {
            let params = {
                userName: this.encryptPwd(this.loginForm.userName),
                password: this.encryptPwd(this.loginForm.userPwd),
                keepLogin: this.loginForm.keepLogin,
                code: this.loginForm.code,
                rsaId: this.publicData.rsaId,
                random: this.codePwd
            }
            this.login(params)
            .then((err)=> {
                if(err){
                    if(this.loginForm.keepLogin){
                        localStorage.setItem('token', this.token);
                        localStorage.setItem('userinfo', this.userinfo);

                        sessionStorage.removeItem('token', this.token);
                        sessionStorage.removeItem('userinfo', this.userinfo);

                        localStorage.setItem('userName',this.loginForm.userName)
                        localStorage.setItem('keepLogin', true);
                    }else {
                        sessionStorage.setItem('token', this.token);
                        sessionStorage.setItem('userinfo', this.userinfo);

                        localStorage.removeItem('token', this.token);
                        localStorage.removeItem('userinfo', this.userinfo);

                        localStorage.setItem('userName',this.loginForm.userName)
                        localStorage.setItem('keepLogin', false);
                    }
                    this.$router.replace('/')
                }else {
                    this.getCode()
                    //该通知是异常抛出的，其它错误在数据放回之前就处理了
                    // this.$notify({
                    //     message: err,
                    //     type: 'error',
                    //     duration: 2000,
                    //     offset: 100
                    // })
                }
            }
          )},
        //登录用户名、密码加密
        encryptPwd(pwd) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.publicData.publicKey);
            const encrypted = encrypt.encrypt(pwd);
            return encrypted;
        },
        //清空输入框
        cleanInput(type) {
            if(type == 1){
                this.$set(this.loginForm,'userName', '');
            }else if (type == 2) {
                this.$set(this.loginForm,'userPwd', '')
            }else {
                this.$set(this.loginForm,'code', '')
            }
        },
        //获取焦点
        focusIcon(type) {
            if(type == 1){
                this.$set(this.Icon,'userName', 'close')
            }else if (type == 2) {
                this.$set(this.Icon,'userPwd', 'close')
            }else {
                this.$set(this.Icon,'code', 'close')
            }
        },
       //失去焦点
        blurIcon(type) {
            if(type == 1){
                this.$set(this.Icon,'userName', 'edit')
            }else if (type == 2) {
                this.$set(this.Icon,'userPwd', 'edit')
            }else {
                this.$set(this.Icon,'code', 'edit')
            }
        }
    },
    mounted(){
        this.getCode()
        const localKeepLogin = localStorage.getItem('keepLogin') === 'true' ? true : false;
        this.$set(this.loginForm, 'keepLogin', localKeepLogin);
        const localName =  localStorage.getItem('userName');
        this.$set(this.loginForm, 'userName', localName);
        const localToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    },
    created() {
        let component = this;
        document.onkeydown = (e) => {
            let eCode = window.event.which || window.event.keyCode || window.event.charCode
            if(eCode==13){
                component.submitForm('loginForm')
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    h2 {
        padding: 0px;
        margin-top: 0px
    }
    .container_login {
        display: -webkit-flex;
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: center;
        background: rgba(53, 53, 54, 0.08)
    }
    .title {
        text-align: center;
        font-size: 60px;
        font-weight: 900;
        font-family: cursive;
        margin-top: 5%;
        color: rgba(156, 156, 156, 0.53)
    }
    .loginForm {
        max-width: 600px;
        max-width: 400px;
        min-height: 40%;
        min-width: 30%;
        margin-top: 2%;
        background-color: white;
        border-radius: 10px;
        padding: 2%;
        box-shadow: 10px 10px 6px #bbbbbb;
    }
    .code {
        display: flex;
        flex-direction:column;
        justify-content: flex-end;
    }
    .imgbutton {
        width: 29%;
        height:38px;
        vertical-align: middle;
        padding: 1px !important
    }
    .img {
        width: 100%;
        height: 100%;
        padding: 0px;
    }
</style>
