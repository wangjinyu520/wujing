import axios from './config'

//新增
export function appCreate (data) {
    return axios({
        url: '/web/app/create',
        method: 'post',
        data
    })
}
//修改
export function appUpdate (data) {
    return axios({
        url: '/web/app/update',
        method: 'post',
        data
    })
}
//删除
export function appDelete (data) {
    return axios({
        url: '/web/app/delete',
        method: 'post',
        data
    })
}
//分页
export function appPageQuery (data) {
    return axios({
        url: '/web/app/pageQuery',
        method: 'post',
        data
    })
}