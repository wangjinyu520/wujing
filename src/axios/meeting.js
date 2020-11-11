import axios from './config'

//预定
export function roomBook(data) {
    return axios({
        url: '/web/room/order/book',
        method: 'post',
        data
    })
}

//取消预定
export function roomCancel(data) {
    return axios({
        url: '/web/room/order/cancel',
        method: 'post',
        data
    })
}

//新增
export function roomCreate(data) {
    return axios({
        url: '/web/room/create',
        method: 'post',
        data
    })
}

//编辑
export function roomUpdate(data) {
    return axios({
        url: '/web/room/update',
        method: 'post',
        data
    })
}

//删除
export function roomDelete(data) {
    return axios({
        url: '/web/room/delete',
        method: 'post',
        data
    })
}

//分页查询
export function roomPageQuery(data) {
    return axios({
        url: '/web/room/order/pageQuery',
        method: 'post',
        data
    })
}

//分页查询(会议预定)
export function roomPageQueryByOrder(data) {
    return axios({
        url: '/web/room/pageQueryByOrder',
        method: 'post',
        data
    })
}

//获取详情
export function roomGet(data) {
    return axios({
        url: '/web/room/get',
        method: 'post',
        data
    })
}

//会议餐审核
export function roomHandle(data) {
    return axios({
        url: '/web/room/order/handle',
        method: 'post',
        data
    })
}
