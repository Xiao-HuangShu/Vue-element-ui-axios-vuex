<template lang="html">
    <el-menu :router="true" :default-active="currentPath"  :unique-opened="true" theme="dark">
        <template v-for="menu in menus">
            <el-menu-item v-if="menu.menuItem" index="/">首页</el-menu-item>
            <el-submenu v-if="menu.subMenu" :index="'/' + menu.key"  :key="menu.key" >
                <template slot="title">{{menu.displayName}}</template>
                <el-menu-item :index="'/' + sub.key"  v-for="sub in menu.subMenu" :key="sub.key" >{{sub.displayName}}</el-menu-item>
            </el-submenu>
        </template>
   </el-menu>
</template>

<script>
export default {
    name:'gz-menu',
    props: {
        menus:Array,
        default: () => []
    },
    components: {

    },
    computed: {
        currentPath() {
            return this.$route.path === '/index' ? '/' : this.$route.path;
        },
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style lang="less">
    .el-submenu .el-menu-item {
        min-width: 100px
    }
</style>
