import axios from './config'

// PC 用户 园区 商家
//登录
export function memberLogin(data) {
    return axios({
        url: '/admin/member/login',
        method: 'post',
        data
    })
}
//退出
export function memberLoginOut(data) {
    return axios({
        url: '/web/member/loginOut',
        method: 'post',
        data
    })
}
//添加
export function memberCreate(data) {
    return axios({
        url: '/web/member/create',
        method: 'post',
        data
    })
}

//编辑
export function memberUpdate(data) {
    return axios({
        url: '/web/member/update',
        method: 'post',
        data
    })
}

//重置密码
export function resetPassword(data) {
    return axios({
        url: '/web/member/resetPassword',
        method: 'post',
        data
    })
}
//同步一卡通
export function plbindCard(data) {
    return axios({
        url: '/web/member/employee/bindCard/batch',
        method: 'post',
        data
    })
}
//启用 禁用
export function memberFreeze(data) {
    return axios({
        url: '/web/member/freeze',
        method: 'post',
        data
    })
}

//分页查询
export function memberPageQuery(data) {
    return axios({
        url: '/web/member/pageQuery',
        method: 'post',
        data
    })
}

//获取个人详情
export function getUserInfo1(data) {
    return axios({
        url: '/web/member/get',
        method: 'post',
        data
    })
}
//获取职工详情
export function getUserInfo(data) {
    return axios({
        url: '/admin/member/getUserInfo',
        method: 'post',
        data
    })
}

// 通过姓名查询，一卡通审批时使用
export function queryEmployeeByName(data) {
    return axios({
        url: '/web/member/queryEmployeeByName',
        method: 'post',
        data
    })
}

//获取可用菜单
export function getMyMenu(data) {
    return axios({
        url: 'admin/member/getPermissionMenu',
        method: 'post',
        data
    })
}

//一卡通充值 职工列表
export function pageQueryByDepartment(data) {
    return axios({
        url: '/web/member/employee/pageQueryByDepartment',
        method: 'post',
        data
    })
}
//【职工】绑定一卡通
export function employeeBindCard(data) {
    return axios({
        url: '/web/member/employee/bindCard',
        method: 'post',
        data
    })
}
/**
 * 餐厅
 */
//添加
export function canteenCreate(data) {
    return axios({
        url: '/web/canteen/create',
        method: 'post',
        data
    })
}

//编辑
export function canteenUpdate(data) {
    return axios({
        url: '/web/canteen/update',
        method: 'post',
        data
    })
}
//删除
export function canteenDelete(data) {
    return axios({
        url: '/web/canteen/delete',
        method: 'post',
        data
    })
}
//分页
export function canteenPageQuery(data) {
    return axios({
        url: '/web/canteen/pageQuery',
        method: 'post',
        data
    })
}

//不分页
export function canteenQuery(data) {
    return axios({
        url: '/web/canteen/query',
        method: 'post',
        data
    })
}
//不分页通过类型
export function canteenQueryByType(data) {
    return axios({
        url: '/web/canteen/queryByType',
        method: 'post',
        data
    })
}

//详情
export function canteenGet(data) {
    return axios({
        url: '/web/canteen/get',
        method: 'post',
        data
    })
}
// 生活商家部分
// 获取
export function merchantPageQuery(data) {
    return axios({
        url: '/web/merchant/category/pageQuery',
        method: 'post',
        data
    })
}
// 获取
export function merchantUpdate(data) {
    return axios({
        url: '/web/merchant/category/update',
        method: 'post',
        data
    })
}
// 获取详情
export function merchantGet(data) {
    return axios({
        url: '/web/merchant/category/get',
        method: 'post',
        data
    })
}
// 删除
export function merchantDelete(data) {
    return axios({
        url: '/web/merchant/category/delete',
        method: 'post',
        data
    })
}


// 服务群体的
// 获取
export function meetingMemberPageByQo(data) {
    return axios({
        url: '/web/member/group/pageQuery',
        method: 'post',
        data
    })
}
// 获取新增
export function meetingMemberSaveBatch(data) {
    return axios({
        url: '/web/member/group/saveBatch',
        method: 'post',
        data
    })
}
// 删除
export function meetingMemberRemoveByIds(data) {
    return axios({
        url: '/web/member/group/deleteBatch',
        method: 'post',
        data
    })
}