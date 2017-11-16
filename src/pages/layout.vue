<template lang="html">
    <div class="container">
        <gz-header :title="title" :userName="userName" @loginOut="signOut"></gz-header>
        <div class="body">
            <div class="menu" >
                <gz-menu :menus="menus"></gz-menu>
            </div>
            <div class="content">
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="{path: item.to}">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <keep-alive class="page">
                    <router-view  v-if="$route.meta.keep"></router-view>
                </keep-alive>
                    <router-view class="components_padding" v-if="!$route.meta.keep"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header'
import Menu from '../components/menu'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'hello',
    data () {
        return {
            title: '国资助手后台管理系统'
        }
    },
    components: {
        [Header.name]: Header,
        [Menu.name]: Menu
    },
    computed: {
        ...mapGetters([
            'token',
            'menus',
            'authorities',
            'breadcrumbs',
            'userinfo'
        ]),
        userName() {
            return  !JSON.parse(this.userinfo).userDisplayName ? JSON.parse(this.userinfo).userName : JSON.parse(this.userinfo).userDisplayName
        }
    },
    methods: {
        ...mapActions([
            'getAuthorities',
            'loginOut',
            'getRegion'
        ]),
        signOut() {
            this.loginOut()
            .then(() =>{
                this.$router.replace('/login')
            })
        }
    },
    mounted() {
        if(this.token){
            this.getAuthorities();
            this.getRegion()//公共地区树
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .container {
        height: 100%;
        width: 100%;
        min-width: 800px;
        padding: 0;
        margin: 0;
    }
    .body {
        display: -webkit-flex;
        display: flex;
        min-height:  92%;
        width: 100%;
    }
    .menu{
        min-width: 15%;
        min-height: 100%;
        background: #2d3853;
    }
    .content {
        width: 85%;
        min-height: 100%;
        background: #EEF1F6;
    }
    .breadcrumb {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding-left: 1%;
        height: 55px;
        background: #E4E8F1
    }
    .page {
        height:92%;
        padding: 2%
    }
    .components_padding {
        padding: 2%
    }
</style>
