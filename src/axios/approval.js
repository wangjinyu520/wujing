import axios from './config'

/**
 *  审批管理
 */

//申请
export function processApply (data) {
    return axios({
        url: '/web/process/apply',
        method: 'post',
        data
    })
}

//获取列表
export function processPageQuery (data) {
    return axios({
        url: '/web/process/pageQuery',
        method: 'post',
        data
    })
}
//获取列表
export function processDetailPageQuery (data) {
    return axios({
        url: '/web/process/detail/pageQuery',
        method: 'post',
        data
    })
}

//确认审核
export function processHandle (data) {
    return axios({
        url: '/web/process/handle',
        method: 'post',
        data
    })
}

//获取详情
export function processGet (data) {
    return axios({
        url: '/web/process/get',
        method: 'post',
        data
    })
}

//开卡
export function processOpenCard (data) {
    return axios({
        url: '/web/process/openCard',
        method: 'post',
        data
    })
}

//开卡
export function processDaochu (data) {
    return axios({
        url: '/web/process/daochu',
        method: 'post',
        data
    })
}
