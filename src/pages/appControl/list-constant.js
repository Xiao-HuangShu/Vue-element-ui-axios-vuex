/*
    表头及其他内容
    displayName：表头字段名称
    type：对应列内容类型
    key:对应列内容的字段名
    width:列的最小宽度
    fixed: 列是否固定在左侧或者右侧，true(left) 表示固定在左侧，right在右侧
    tooltip:true 当内容过长被隐藏时显示 tooltip, false 折行显示全部内容
 */
const roleColNameMap = [
    {
        displayName: '操作',
        type: 'button',
        width: 100,
        fixed: true,
    },
    {
        displayName: '角色名称',
        width: 90,
        key: 'roleName',
        tooltip:true
    },
    {
        displayName: '创建人',
        width: 50,
        key: 'createUserName',
        tooltip:true
    },
    {
        displayName: '创建时间',
        width: 120,
        key: 'createTime',
        tooltip:true
    },
    {
        displayName: '修改人',
        width: 80,
        key: 'modifyUserName',
        tooltip:true
    },
    {
        displayName: '修改时间',
        width: 120,
        key: 'modifyTime',
        tooltip:true
    },
    {
        displayName: '状态',
        width: 80,
        key: 'status',
        tooltip:true
    },
    {
        displayName: '备注',
        width: 230,
        key: 'remark',
        tooltip:true
    },
];
/*
    操作列
    key:操作类型,自己取名字，目的是区分点击事件
    text:按钮内容
    type:按钮类型
    size:按钮大小
 */
const roleoperation = [
    {
        key: 'change',
        text: '权限分配',
        type: '',
        size: 'small'
    }
];

const personColNameMap = [    
    {
        displayName: '姓名',
        key:'name',
        width: 80,
        fixed: true,
        tooltip:true
    },
    {
        displayName: '角色',
        key:'role',
        width: 70,
        tooltip:true
    },
    {
        displayName: '电话',
        key:'phone',
        width: 70,
        tooltip:true
    },
    {
        displayName: '创建人',
        key:'createUserName',
        width: 60,
        tooltip:true
    },
    {
        displayName: '创建时间',
        key:'createDate',
        width: 90,
        tooltip:true
    },
    {
        displayName: '状态',
        key:'status',
        width: 50,
        tooltip:true
    },
    {
        displayName: '备注',
        key:'remark',
        width: 80,
        tooltip:true
    },
];
export default {
    roleColNameMap,
    roleoperation,
    personColNameMap
}
