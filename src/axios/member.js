import axios from './config'

// PC 用户 园区 商家
//登录
export function memberLogin(data) {
    return axios({
        url: '/web/member/login',
        method: 'post',
        data
    })
}
//退出
export function memberLoginOut(data) {
    return axios({
        url: '/web/member/loginOut',
        method: 'post',
        data
    })
}
//退出
export function getUserInfo(data) {
    return axios({
        url: '/web/member/getUserInfo',
        method: 'post',
        data
    })
}