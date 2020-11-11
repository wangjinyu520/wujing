import axios from './config'

//分页
export function commentPageQuery (data) {
    return axios({
        url: '/web/comment/pageQuery',
        method: 'post',
        data
    })
}

//删除
export function commentDelete (data) {
    return axios({
        url: '/web/comment/delete',
        method: 'post',
        data
    })
}