import axios from './config'

// 角色

//新增
export function roleCreate (data) {
    return axios({
        url: '/admin/role/create',
        method: 'post',
        data
    })
}
//编辑
export function roleUpdate (data) {
    return axios({
        url: '/admin/role/update',
        method: 'post',
        data
    })
}
//删除
export function roleDelete (data) {
    return axios({
        url: '/admin/role/delete',
        method: 'post',
        data
    })
}
//分页
export function rolePageQuery (data) {
    return axios({
        url: '/admin/role/pageQuery',
        method: 'post',
        data
    })
}
//不分页
export function roleQuery (data) {
    return axios({
        url: '/admin/role/query',
        method: 'post',
        data
    })
}
//详情
export function roleGet (data) {
    return axios({
        url: '/admin/role/get',
        method: 'post',
        data
    })
}
