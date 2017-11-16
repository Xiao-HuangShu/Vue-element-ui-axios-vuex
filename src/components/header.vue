<template lang="html">
    <div class="header">
        <div class="headertitle">
                {{title}}
        </div>
        <div class="right_content">
                <span>欢迎， {{userName}}</span>
                <el-button style="color: #c46d6d;" class="loginOut" @click="loginOut" type="text" >退出</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gz-header',
        props: {
            title: {
                type: String,
                default: () => ''
            },
            userName: {
                type: String,
                default: () => ''
            }
        },
        methods: {
            loginOut() {
                this.$emit('loginOut');
            }
        }
    }
</script>

<style lang="less">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8%;
        background: linear-gradient(to bottom right, #44557e , #171717);
        width: 100%;
    }
    .headertitle {
        color: #fff;
        font-size: 22px;
        margin-left: 3%
    }
    .right_content {
        margin-right: 3%;
        color: #fff;
        font-size: 16px;
    }
    .loginOut {
        cursor:pointer;
        width:40px;
        transition: width 1s, height 1s, transform 1s
    }
    .loginOut:hover {
        cursor:pointer;
        font-size: 16px;
        transform: rotate(360deg)
    }
</style>
