import axios from './config'

/**
 * 采购分类
 */
//添加
export function categoryCreate(data) {
    return axios({
        url: '/web/purchase/category/create',
        method: 'post',
        data
    })
}

//编辑
export function categoryUpdate(data) {
    return axios({
        url: '/web/purchase/category/update',
        method: 'post',
        data
    })
}

//删除
export function categoryDelete(data) {
    return axios({
        url: '/web/purchase/category/delete',
        method: 'post',
        data
    })
}

//分页
export function categoryPageQuery(data) {
    return axios({
        url: '/web/purchase/category/pageQuery',
        method: 'post',
        data
    })
}

//不分页
export function categoryQuery(data) {
    return axios({
        url: '/web/purchase/category/queryByCanteenId',
        method: 'post',
        data
    })
}

//详情
export function categoryGet(data) {
    return axios({
        url: '/web/purchase/category/get',
        method: 'post',
        data
    })
}

/**
 * 采购食材
 */
//添加
export function productCreate(data) {
    return axios({
        url: '/web/purchase/product/create',
        method: 'post',
        data
    })
}

//编辑
export function productUpdate(data) {
    return axios({
        url: '/web/purchase/product/update',
        method: 'post',
        data
    })
}

//删除
export function productDelete(data) {
    return axios({
        url: '/web/purchase/product/delete',
        method: 'post',
        data
    })
}

//冻结 解冻
export function productFreeze(data) {
    return axios({
        url: '/web/purchase/product/freeze',
        method: 'post',
        data
    })
}
//分页
export function productPageQuery(data) {
    return axios({
        url: '/web/purchase/product/pageQuery',
        method: 'post',
        data
    })
}
//不分页
export function productQuery(data) {
    return axios({
        url: '/web/purchase/product/queryByCanteenIdAndCategoryId',
        method: 'post',
        data
    })
}
//详情
export function productGet(data) {
    return axios({
        url: '/web/purchase/product/get',
        method: 'post',
        data
    })
}

/**
 * 采购订单
 */
//添加
export function orderCreate(data) {
    return axios({
        url: '/web/purchase/order/create',
        method: 'post',
        data
    })
}
//核销
export function orderVerification(data) {
    return axios({
        url: '/web/purchase/order/verification',
        method: 'post',
        data
    })
}

//审批
export function orderHandle(data) {
    return axios({
        url: '/web/purchase/order/handle',
        method: 'post',
        data
    })
}
//导出
export function orderDaochu(data) {
    return axios({
        url: '/web/purchase/order/daochu',
        method: 'post',
        data
    })
}
//分页
export function orderPageQuery(data) {
    return axios({
        url: '/web/purchase/order/pageQuery',
        method: 'post',
        data
    })
}

//详情
export function orderGet(data) {
    return axios({
        url: '/web/purchase/order/get',
        method: 'post',
        data
    })
}

/**
 * 采购报表
 */


//导出
export function reportDaochu(data) {
    return axios({
        url: '/web/purchase/order/product/daochu',
        method: 'post',
        data
    })
}
//分页
export function reportPageQuery(data) {
    return axios({
        url: '/web/purchase/order/product/pageQuery',
        method: 'post',
        data
    })
}

