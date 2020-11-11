import axios from './config'

/**
 *  字典
 */

//获取列表
export function dictionaryPageQuery (data) {
    return axios({
        url: '/web/dictionary/pageQuery',
        method: 'post',
        data
    })
}
//新增
export function dictionaryCreate (data) {
    return axios({
        url: '/web/dictionary/create',
        method: 'post',
        data
    })
}
//编辑
export function dictionaryUpdate (data) {
    return axios({
        url: '/web/dictionary/update',
        method: 'post',
        data
    })
}
//删除
export function dictionaryDelete (data) {
    return axios({
        url: '/web/dictionary/delete',
        method: 'post',
        data
    })
}
//详情
export function dictionaryGet (data) {
    return axios({
        url: '/web/dictionary/get',
        method: 'post',
        data
    })
}