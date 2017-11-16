<template lang="html">
    <div id="app">
        <transition name="slide-fade">
            <router-view></router-view>
       </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style lang="less">
    html,body{
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #app {
        height: 100%;
        /*
            统一定义 级联选择，下拉选择，以及日期组件宽度
         */
         .el-cascader {
             width: 100%
         }
         .el-select {
             width: 100%
         }
        .el-date-editor {
            width: 100% !important
        }
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
     transition: all .3s ease;
    }
    .slide-fade-leave-active {
     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
     transform: translateX(10px);
     opacity: 0;
    }

    /*滚动条 start*/
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: #F5F5F5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background: #fff ;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      border-radius: 15px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color:rgba(24, 27, 28, 0.5);
    }
    ::-webkit-scrollbar-thumb:hover {
      border-radius: 15px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color:rgba(24, 27, 28, 0.7);
    }
</style>
