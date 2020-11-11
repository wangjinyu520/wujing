import axios from './config'

// PC 订单

//配送
export function orderSend(data) {
    return axios({
        url: '/web/order/send',
        method: 'post',
        data
    })
}

//批量接单/配送
export function batchSend(data) {
    return axios({
        url: '/web/order/batchSend',
        method: 'post',
        data
    })
}

//订单核销。状态=3（配送中/待自提），才可操作
export function orderVerification(data) {
    return axios({
        url: '/web/order/verification',
        method: 'post',
        data
    })
}
//分页查询(平台)
export function orderPageQueryBuyGuard(data) {
    return axios({
        url: '/web/order/pageQueryBuyGuard',
        method: 'post',
        data
    })
}


//分页查询
export function orderPageQuery(data) {
    return axios({
        url: '/web/order/pageQuery',
        method: 'post',
        data
    })
}

//获取详情
export function orderGet(data) {
    return axios({
        url: '/web/order/get',
        method: 'post',
        data
    })
}

//收款
export function cardTransfer(data) {
    return axios({
        url: '/web/card/transfer',
        method: 'post',
        data
    })
}

//退款
export function orderRefund(data) {
    return axios({
        url: '/web/order/refund',
        method: 'post',
        data
    })
}

//拒绝退款
export function orderRefundRefuse(data) {
    return axios({
        url: '/web/order/refund/refuse',
        method: 'post',
        data
    })
}

//确认收货
export function orderReceive(data) {
    return axios({
        url: '/web/order/receive',
        method: 'post',
        data
    })
}


//物流
export function viewLogistics(data) {
    return axios({
        url: '/web/order/viewLogistics',
        method: 'post',
        data
    })
}

//【二维码接口】获取二维码需要进行的操作信息。返回msg和type
export function explainMsg(data) {
    return axios({
        url: '/web/qrCode/explain/msg',
        method: 'post',
        data
    })
}

//【二维码接口】提交二维码信息。直接提示返回的信息
export function explain(data) {
    return axios({
        url: '/web/qrCode/explain',
        method: 'post',
        data
    })
}

// 导出（商户）
export function orderDaochu(data) {
    return axios({
        url: '/web/order/daochu',
        method: 'post',
        data
    })
}
// 导出（平台）
export function daochuBuyGuard(data) {
    return axios({
        url: '/web/order/daochuBuyGuard',
        method: 'post',
        data
    })
}