import axios from './config'

//分页
export function logPageQuery (data) {
    return axios({
        url: '/web/operationLog/pageQuery',
        method: 'post',
        data
    })
}

//删除
export function logDelete (data) {
    return axios({
        url: '/web/operationLog/delete',
        method: 'post',
        data
    })
}