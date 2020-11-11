import axios from './config'

// PC 订单

//新增
export function couponCreate (data) {
    return axios({
        url: '/web/coupon/activity/create',
        method: 'post',
        data
    })
}
//分页
export function couponPageQuery (data) {
    return axios({
        url: '/web/coupon/activity/pageQuery',
        method: 'post',
        data
    })
}
//关闭
export function couponClose (data) {
    return axios({
        url: '/web/coupon/activity/close',
        method: 'post',
        data
    })
}
