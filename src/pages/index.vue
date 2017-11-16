<template lang="html">
    <div class="">
        <div class="index" v-if="checkAuth('say-hi')">
            <p>当前在职代办员总数: {{!indexData.agentsSum ? 0 : indexData.agentsSum}}人</p>
            <p>当前在职合伙人数: {{!indexData.partnerSum ? 0 : indexData.partnerSum}}人</p>
            <div class="">
                <span>当前应收账款:</span>
                <span class="accountsReceivable">{{!indexData.accountsReceivable ? 0 : indexData.accountsReceivable}}</span>
                <span>元</span>
            </div>
        </div>
        <div class="logo" v-if="!checkAuth('say-hi')">
            {{logo}}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseComponent from './base'

export default {
    extends: BaseComponent,
    data () {
        return {
            logo: '国资助手后台管理系统'
        }
    },
    computed: {
        ...mapGetters([
            'indexData',
            'authorities'
        ])
    },
    watch: {
        authorities(val) {
            if (val.length > 0 && this.checkAuth('say-hi')) {
                  this.getIndexData()
            }
        }
    },
    methods: {
        // 先生成参数，上一个月，YYYY-MM,带参数请求接口
        getIndexData() {
            let { year, month } = ''
            if(new Date().getMonth() == 0){
                year = new Date().getFullYear()*1-1;
                month = 12
            }else {
                year = new Date().getFullYear()*1;
                month = new Date().getMonth()*1
            }
            this.$store.dispatch('indexData',{time:`${year}-${month}`})
        },
        checkAuth(param) {
            return this.authorities && this.authorities.length > 0
            && this.authorities.indexOf(param) !== -1 ? true : false;
        }
    },
    mounted() {
        if (this.checkAuth('say-hi')) {
            this.getIndexData()
        }
    }
}
</script>

<style lang="less">
    .accountsReceivable {
        color: red
    }
    .logo {
        display: flex;
        margin-top: 60px;
        text-align: center;
        justify-content: center;
        font-size: 48px;
        color: rgb(215, 219, 224);
        font-weight: bolder;
    }
</style>
