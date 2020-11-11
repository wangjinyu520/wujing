import axios from './config'

/**
 * 菜单
 */
export function getTree (data) {
    return axios({
        url: '/admin/menu/getTree',
        method: 'post',
        data
    })
}
//添加
export function menuCreate (data) {
    return axios({
        url: '/admin/menu/create',
        method: 'post',
        data
    })
}
//编辑
export function menuUpdate (data) {
    return axios({
        url: '/admin/menu/update',
        method: 'post',
        data
    })
}
//删除
export function menuDelete (data) {
    return axios({
        url: '/admin/menu/delete',
        method: 'post',
        data
    })
}