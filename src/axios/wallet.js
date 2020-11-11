import axios from './config'

/**
 * 钱包（收益、积分）】获取我的钱包（收益、积分）
 */
export function walletGet(data) {
    return axios({
        url: '/web/wallet/getByMemberId',
        method: 'post',
        data
    })
}

/**
 * 【钱包（收益、积分）】分页查询交易记录
 */
export function walletRecord(data) {
    return axios({
        url: '/web/wallet/record/pageQuery',
        method: 'post',
        data
    })
}

/**
 * 【钱包（收益、积分）】结算核销
 */
export function settleAccount(data) {
    return axios({
        url: '/web/wallet/settleAccount',
        method: 'post',
        data
    })
}
//  商家分类
export function categoryQuery(data) {
    return axios({
        url: '/web/merchant/category/query',
        method: 'post',
        data
    })
}