import axios from './config'

//添加
export function messageCreate (data) {
    return axios({
        url: '/web/message/create',
        method: 'post',
        data
    })
}

//推送
export function messageTuisong (data) {
    return axios({
        url: '/web/message/tuisong',
        method: 'post',
        data
    })
}

//编辑
export function messageUpdate (data) {
    return axios({
        url: '/web/message/update',
        method: 'post',
        data
    })
}

//删除
export function messageDelete (data) {
    return axios({
        url: '/web/message/delete',
        method: 'post',
        data
    })
}

//冻结 解冻
export function messageFreeze (data) {
    return axios({
        url: '/web/message/freeze',
        method: 'post',
        data
    })
}
//分页
export function messagePageQuery (data) {
    return axios({
        url: '/web/message/pageQuery',
        method: 'post',
        data
    })
}
//详情
export function messageGet (data) {
    return axios({
        url: '/web/message/get',
        method: 'post',
        data
    })
}


//问卷调查
//添加
export function examCreate (data) {
    return axios({
        url: '/web/exam/create',
        method: 'post',
        data
    })
}

//编辑
export function examUpdate (data) {
    return axios({
        url: '/web/exam/update',
        method: 'post',
        data
    })
}

//删除
export function examDelete (data) {
    return axios({
        url: '/web/exam/delete',
        method: 'post',
        data
    })
}
//分页
export function examPageQuery (data) {
    return axios({
        url: '/web/exam/pageQuery',
        method: 'post',
        data
    })
}
//详情
export function examGet (data) {
    return axios({
        url: '/web/exam/get',
        method: 'post',
        data
    })
}
//统计
export function examView (data) {
    return axios({
        url: '/web/exam/view',
        method: 'post',
        data
    })
}