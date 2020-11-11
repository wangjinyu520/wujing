import axios from './config'

//获取列表
export function advertisementPageQuery (data) {
    return axios({
        url: '/dinner/information/pageByQo',
        method: 'post',
        data
    })
}

//新增
export function advertisementCreate (data) {
    return axios({
        url: '/dinner/information/save',
        method: 'post',
        data
    })
}

//编辑
export function advertisementUpdate (data) {
    return axios({
        url: '/dinner/information/update',
        method: 'post',
        data
    })
}

//删除
export function advertisementDelete (data) {
    return axios({
        url: '/dinner/information/removeByIds',
        method: 'post',
        data
    })
}

//详情
export function advertisementGet (data) {
    return axios({
        url: '/dinner/information/getById',
        method: 'post',
        data
    })
}
//获取消息
export function getMess(data) {
    return axios({
        url: '/web/message/query',
        method: 'post',
        data
    })
}
//获取商家
export function getShop(data) {
    return axios({
        url: '/web/member/queryMerchantByName',
        method: 'post',
        data
    })
}
//广告冻结
export function advertisementFreeze(data) {
    return axios({
        url: '/web/advertisement/freeze',
        method: 'post',
        data
    })
}
