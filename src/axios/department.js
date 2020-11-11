import axios from './config'

// 部门

//新增
export function departmentCreate(data) {
    return axios({
        url: '/admin/department/create',
        method: 'post',
        data
    })
}
//编辑
export function departmentUpdate(data) {
    return axios({
        url: '/admin/department/update',
        method: 'post',
        data
    })
}
//删除
export function departmentDelete(data) {
    return axios({
        url: '/admin/department/delete',
        method: 'post',
        data
    })
}
//获取所有树形部门组织架构
export function departmentGetTree(data) {
    return axios({
        url: '/admin/department/getTree',
        method: 'post',
        data
    })
}
//分页获取列表
export function departmentPageQuery(data) {
    return axios({
        url: '/admin/department/pageQuery',
        method: 'post',
        data
    })
}
//不分页获取列表
export function departmentQuery(data) {
    return axios({
        url: '/admin/department/query',
        method: 'post',
        data
    })
}
//详情
export function departmentGet(data) {
    return axios({
        url: '/admin/department/get',
        method: 'post',
        data
    })
}

//部门自助充值（充值管理）
export function chargeByDepartment(data) {
    return axios({
        url: '/admin/department/wallet/chargeByDepartment',
        method: 'post',
        data
    })
}
//部门自助充值（充值管理）
export function plchargeByDepartment(data) {
    return axios({
        url: '/admin/department/wallet/chargeByDepartmentBatch',
        method: 'post',
        data
    })
}
//管理员充值（部门管理）
export function chargeByManager(data) {
    return axios({
        url: '/admin/department/wallet/chargeByManager',
        method: 'post',
        data
    })
}

//获取指定部门钱包
export function getByMemberId(data) {
    return axios({
        url: '/admin/department/wallet/getByMemberId',
        method: 'post',
        data
    })
}
//分页查询交易记录
export function departmentRecord(data) {
    return axios({
        url: '/admin/department/wallet/record/pageQuery',
        method: 'post',
        data
    })
}

//自定义部门

//新增
export function customDepartmentCreate(data) {
    return axios({
        url: '/admin/super/department/create',
        method: 'post',
        data
    })
}
//编辑
export function customDepartmentUpdate(data) {
    return axios({
        url: '/admin/super/department/update',
        method: 'post',
        data
    })
}
//删除
export function customDepartmentDelete(data) {
    return axios({
        url: '/admin/super/department/delete',
        method: 'post',
        data
    })
}
//获取所有树形部门组织架构
export function customDepartmentQuery(data) {
    return axios({
        url: '/admin/super/department/query',
        method: 'post',
        data
    })
}
//分页获取列表
export function customDepartmentPageQuery(data) {
    return axios({
        url: '/admin/super/department/pageQuery',
        method: 'post',
        data
    })
}

//详情
export function customDepartmentGet(data) {
    return axios({
        url: '/admin/super/department/get',
        method: 'post',
        data
    })
}