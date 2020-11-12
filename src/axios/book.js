import axios from './config'

//新增
export function bookCreate (data) {
    return axios({
        url: '/web/book/create',
        method: 'post',
        data
    })
}
//修改
export function bookpUpdate (data) {
    return axios({
        url: '/web/book/update',
        method: 'post',
        data
    })
}
//删除
export function bookDelete (data) {
    return axios({
        url: '/web/book/delete',
        method: 'post',
        data
    })
}
//分页
export function bookPageQuery (data) {
    return axios({
        url: '/web/book/pageQuery',
        method: 'post',
        data
    })
}
//分页
export function bookFreeze (data) {
    return axios({
        url: '/web/book/freeze',
        method: 'post',
        data
    })
}
//分页
export function bookGet (data) {
    return axios({
        url: '/web/book/get',
        method: 'post',
        data
    })
}