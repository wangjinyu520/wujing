import axios from './config'

//获取列表
export function advertisementPageQuery (data) {
    return axios({
        url: '/web/advertisement/pageQuery',
        method: 'post',
        data
    })
}

//新增
export function advertisementCreate (data) {
    return axios({
        url: '/web/advertisement/create',
        method: 'post',
        data
    })
}

//编辑
export function advertisementUpdate (data) {
    return axios({
        url: '/web/advertisement/update',
        method: 'post',
        data
    })
}

//删除
export function advertisementDelete (data) {
    return axios({
        url: '/web/advertisement/delete',
        method: 'post',
        data
    })
}

//详情
export function advertisementGet (data) {
    return axios({
        url: '/web/advertisement/get',
        method: 'post',
        data
    })
}

