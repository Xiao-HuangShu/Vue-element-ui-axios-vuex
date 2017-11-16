<script>

import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
import Notification from 'element-ui'

const constant = {
      url: 'http://10.66.30.66:4002', // api请求地址
      imgUrl: 'http://10.66.30.66:7101', // 图片显示地址
      systemId: '7ea62630-4994-11e7-9c7d-00ff659703f8', // 系统id
      saleImportUrl: 'http://10.66.2.30:9111', // 销售报表导入url
      wangGoodsOrderImportUrl: 'http://10.66.150.107:7091', // 批量导入要货单url
      eccSystemId: 'ebedb7d2-8c9e-11e7-aa4f-005056bd5942', // 对接ecc的系统id 保持不变
}

export default {
    computed: {
        ...mapGetters([
            'authorities'
        ]),
        breadcrumbs() {
            return this.getbreadcrumb()
        }
    },
    methods: {
        ...mapActions([
            'setBreadcrumbs'
        ]),
        // 权限检查
        checkAuth(param) {
            return this.authorities && this.authorities.length > 0
            && this.authorities.indexOf(param) !== -1 ? true : false;
        },
        // 面包屑
        getbreadcrumb() {
            return this.$route.meta.breadcrumbs ? this.$route.meta.breadcrumbs.map((breadcrumb) =>{
                if(breadcrumb.path){
                    return {
                        name: breadcrumb.name,
                        to: breadcrumb.path
                    }
                }else {
                    return breadcrumb
                }
            }):[]
        },
        // 报表导出action
        exportUrl(key) {
            return `${constant.imgUrl}/file/GetFile?systemId=${constant.systemId}&fileId=${key}`;
        },
        // 时间处理, 两个时间处理不柔和在一起，不想增加一层判断，影响性能
        formatTime(time) {
            if (!time) return null;
            return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
        },
        formatDate(time) {
          if (!time) return null;
          return moment(new Date(time)).format('YYYY-MM-DD');
        },
        // 时间控件，开始时间不能小于结束时间
        timeInterval(startTime, endTime) {
            if (!startTime && !endTime) {
                return true;
            }else {
                let timeBegin = moment(new Date(startTime)).format('YYYYMMDDHHmmss');
                let timeEnd = moment(new Date(endTime)).format('YYYYMMDDHHmmss');
                if(timeBegin <= timeEnd) {
                    return true
                }
                return false
            }
        }
    },
    mounted () {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs
        })
    },
    // keep-alive 组件激活时调用，服务器端渲染不调用
    activated () {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs
        })
    },
    // 数据更改后调用
    updated () {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs
        })
    }
}
</script>
