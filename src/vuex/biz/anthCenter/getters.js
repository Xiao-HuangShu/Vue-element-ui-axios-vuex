const menus = state => state.menus.map((menu) => (
    menu.subMenu ?
    Object.assign({}, menu, {
        subMenu: menu.subMenu.filter((sub) => state.authorities.indexOf(sub.key) != -1),
    })
    : menu
)).filter((menu) => menu.menuItem || menu.subMenu.length != 0);

const authorities = state => state.authorities || [];
const publicData = state => state.publicData || {};
const token = state => state.token || localStorage.getItem('token') || sessionStorage.getItem('token');
const userinfo = state => state.userinfo || localStorage.getItem('userinfo') || sessionStorage.getItem('userinfo');
const indexData = state => state.indexData || {}

export default {
    menus,
    authorities,
    publicData,
    token,
    userinfo,
    indexData
};
