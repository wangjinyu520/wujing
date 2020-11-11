import axios from './config'

/**
 *  商品分类
 */

//获取列表
export function categoryPageQuery (data) {
    return axios({
        url: '/web/category/pageQuery',
        method: 'post',
        data
    })
}

//新增
export function categoryCreate (data) {
    return axios({
        url: '/web/category/create',
        method: 'post',
        data
    })
}

//编辑
export function categoryUpdate (data) {
    return axios({
        url: '/web/category/update',
        method: 'post',
        data
    })
}

//删除
export function categoryDelete (data) {
    return axios({
        url: '/web/category/delete',
        method: 'post',
        data
    })
}
//批量冻结
export function plfreeze(data) {
    return axios({
        url: '/web/product/freeze/batch',
        method: 'post',
        data
    })
}


/** 
 * 商品
 */

//获取列表
export function productPageQuery (data) {
    return axios({
        url: '/web/product/pageQuery',
        method: 'post',
        data
    })
}

//获取详情
export function productGet (data) {
    return axios({
        url: '/web/product/get',
        method: 'post',
        data
    })
}

//新增
export function productCreate (data) {
    return axios({
        url: '/web/product/create',
        method: 'post',
        data
    })
}

//编辑
export function productUpdate (data) {
    return axios({
        url: '/web/product/update',
        method: 'post',
        data
    })
}

//删除
export function productDelete (data) {
    return axios({
        url: '/web/product/delete',
        method: 'post',
        data
    })
}
//冻结 上下架
export function productFreeze(data) {
    return axios({
        url: '/web/product/freeze',
        method: 'post',
        data
    })
}