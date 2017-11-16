import { Notification  } from 'element-ui'

export default {
    // 多选提示
    selectNotify(params){
        Notification({
            title: '警告',
            message: '至少选择一条数据',
            type: 'warning',
            duration: 2000
        })
        return;
    },
    // 操作成功提示
    resultNotify(type) {
        Notification({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
        });
        return;
    },
    //递归穿件地区树
    createTree(params) {
        return params.map((item) => {
            const regionTree = {};
            regionTree.value = item.code;
            regionTree.label = item.name;
            if(item.subRegionList.length > 0){
                regionTree.children = this.createTree(item.subRegionList)
            }
            return regionTree;
        })
    },
    // 时间控件，开始时间不能小于结束时间
}
