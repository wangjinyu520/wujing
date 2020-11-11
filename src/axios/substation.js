import axios from './config'

/**
 * 分站 园区
 */
 //新增
export function guardCreate (data) {
    return axios({
        url: '/web/guard/create',
        method: 'post',
        data
    })
}
//编辑
export function guardUpdate (data) {
    return axios({
        url: '/web/guard/update',
        method: 'post',
        data
    })
}
//分页
export function guardPageQuery (data) {
    return axios({
        url: '/web/guard/pageQuery',
        method: 'post',
        data
    })
}