import axios from './config'

//【促销活动（商户）】获取商家的促销活动（商户）（必有信息返回）
export function promotionGet (data) {
    return axios({
        url: '/web/promotion/getByMerchantId',
        method: 'post',
        data
    })
}

//【促销活动（商户）】修改促销活动（商户）
export function promotionUpdate (data) {
    return axios({
        url: '/web/promotion/update',
        method: 'post',
        data
    })
}