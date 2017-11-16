/*
    表头及其他内容
    displayName：表头字段名称
    type：对应列内容类型
    key:对应列内容的字段名
    width:列的最小宽度
    fixed: 列是否固定在左侧或者右侧，true(left) 表示固定在左侧，right在右侧
    tooltip:true 当内容过长被隐藏时显示 tooltip, false 折行显示全部内容
 */
const agentColNameMap = [
    {
        displayName: '操作',
        type: 'button',
        width: 80,
        fixed: true,
    }, {
        key: 'agentName',
        displayName: '姓名',
        fixed: true,
        tooltip:false,
        width: 110,
    }, {
        key: 'cityName',
        displayName: '州/市',
        width: 90,
    }, {
        key: 'districtName',
        displayName: '区/县',
        width: 90,
    }, {
        key: 'townName',
        displayName: '乡/镇',
        width: 90,
        tooltip:true
    }, {
        key: 'villageName',
        displayName: '社区/村',
        tooltip:true,
        width: 100
    }, {
        key: 'station',
        displayName: '服务站名称',
        width: 180,
        tooltip:true,
    }, {
        key: 'stationCode',
        displayName: '站点编号',
        width: 120,
    }, {
        key: 'stationAddress',
        displayName: '服务站地址',
        width: 180,
        tooltip:true
    }, {
        key: 'companyName',
        displayName: '所属公司',
        width: 180,
        tooltip:true
    }, {
        key: 'workModel',
        displayName: '合作模式',
        width: 100,
    }, {
        key: 'agentPhone',
        displayName: '联系电话',
        width: 150,
    }, {
        key: 'entryTime',
        displayName: '入职日期',
        width: 140,
    }, {
        key: 'dismissTime',
        displayName: '离职日期',
        width: 140,
    }, {
        key: 'idCard',
        displayName: '身份证号',
        width: 200,
    }, {
        key: 'bankCard',
        displayName: '银行卡号',
        width: 200,
    }, {
        key: 'bankNo',
        displayName: '银行行号',
        width: 150,
    }, {
        key: 'bankName',
        displayName: '开户银行',
        width: 150,
    }, {
        key: 'agentState',
        displayName: '在职状态',
        width: 100,
    }, {
        key: 'status',
        displayName: '启用状态',
        width: 100,
    }
];

/*
    操作列
    key:操作类型 自己取名字，目的是区分点击事件
    text:按钮内容
    type:按钮类型
    size:按钮大小
 */
const agentOperation = [
    {
        key: 'check',
        text: '查看',
        type: '',
        size: 'small'
    }
];

const farmerColNameMap = [
    {
        key: 'cityName',
        displayName: '州/市',
        tooltip:true,
        width: 100,
    }, {
        key: 'districtName',
        displayName: '区/县',
        tooltip:true,
        width: 100,
    }, {
        key: 'townName',
        displayName: '乡/镇',
        tooltip:true,
        width: 100,
    }, {
        key: 'villageName',
        displayName: '社区/村',
        tooltip:true,
        width: 100,
    }, {
        key: 'station',
        displayName: '综合体名称',
        tooltip:true,
        width: 110,
    }, {
        key: 'stationCode',
        displayName: '综合体编号',
        tooltip:true,
        width: 110,
    }, {
        key: 'farmerName',
        displayName: '农户姓名',
        tooltip:true,
        width: 110,
    }, {
        key: 'phone',
        displayName: '联系电话',
        tooltip:true,
        width: 130,
    }, {
        key: 'idCard',
        displayName: '身份证号',
        tooltip:true,
        width: 190,
    }, {
        key: 'cardNumber',
        displayName: '卡号',
        tooltip:true,
        width: 190,
    }, {
        key: 'activateCardDate',
        displayName: '办卡时间',
        tooltip:true,
        width: 170,
    }, {
        key: 'agent_name',
        displayName: '代办员名称',
        tooltip:true,
        width: 100,
    }, {
        key: 'planState',
        displayName: '状态',
        tooltip:true,
        width: 100,
    }
];

export default {
    agentColNameMap,
    agentOperation,
    farmerColNameMap
}
