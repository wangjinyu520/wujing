import axios from './config'

//分页
export function suggestionPageQuery (data) {
    return axios({
        url: '/web/suggestion/pageQuery',
        method: 'post',
        data
    })
}

//处理
export function suggestionDeal (data) {
    return axios({
        url: '/web/suggestion/handle',
        method: 'post',
        data
    })
}

//删除
export function suggestionDelete (data) {
    return axios({
        url: '/web/suggestion/delete',
        method: 'post',
        data
    })
}