import axios from './config'

// 报表

//【店铺运营报表】分页查询
export function report1PageQuery(data) {
    return axios({
        url: '/web/report/report1/pageQuery',
        method: 'post',
        data
    })
}
//【店铺运营报表】导出
export function daochuReport1(data) {
    return axios({
        url: '/web/report/report1/daochu',
        method: 'post',
        data
    })
}
//【平台运营数据】获取总计用户数(人)，外部用户数(人)，内部用户数(人)，新用户数(人）
export function getReport2(data) {
    return axios({
        url: '/web/report/report2/getReport2',
        method: 'post',
        data
    })
}
//【平台运营数据】平台运营数据：指定时间交易额（按时间分组）-折线图
export function report4(data) {
    return axios({
        url: '/web/report/report4/report4',
        method: 'post',
        data
    })
}

//【平台运营数据】本月交易额 TOP10商家
export function getReport3(data) {
    return axios({
        url: '/web/report/report3/getReport3',
        method: 'post',
        data
    })
}

//【一卡通充值报表】分页查询
export function report5(data) {
    return axios({
        url: '/web/report/report5/pageQuery',
        method: 'post',
        data
    })
}

//【一卡通充值报表】导出
export function daochuReport5(data) {
    return axios({
        url: '/web/report/report5/daochu',
        method: 'post',
        data
    })
}

//【一卡通办理报表】不分页查询
export function report6(data) {
    return axios({
        url: '/web/report/report6/pageQuery',
        method: 'post',
        data
    })
}

//【一卡通办理报表】导出
export function daochuReport6(data) {
    return axios({
        url: '/web/report/report6/daochu',
        method: 'post',
        data
    })
}

//【退款报表】分页查询
export function report7(data) {
    return axios({
        url: '/web/report/report7/pageQuery',
        method: 'post',
        data
    })
}

//【退款报表】导出
export function daochuReport7(data) {
    return axios({
        url: '/web/report/report7/daochu',
        method: 'post',
        data
    })
}

//【部门消费报表】分页查询
export function report8(data) {
    return axios({
        url: '/web/report/report8/pageQuery',
        method: 'post',
        data
    })
}

//【部门消费报表】导出
export function daochuReport8(data) {
    return axios({
        url: '/web/report/report8/daochu',
        method: 'post',
        data
    })
}

//【商品销售报表】分页查询
export function report9(data) {
    return axios({
        url: '/web/report/report9/pageQuery',
        method: 'post',
        data
    })
}

//【商品销售报表】导出
export function daochuReport9(data) {
    return axios({
        url: '/web/report/report9/daochu',
        method: 'post',
        data
    })
}


//【部门时段消费报表】分页查询
export function report10(data) {
    return axios({
        url: '/web/report/report10/pageQuery',
        method: 'post',
        data
    })
}
//【部门时段消费报表】导出
export function daochuReport10(data) {
    return axios({
        url: '/web/report/report10/daochu',
        method: 'post',
        data
    })
}


//【职工商品消费报表】分页查询
export function report11(data) {
    return axios({
        url: '/web/report/report11/pageQuery',
        method: 'post',
        data
    })
}
//【职工商品消费报表】导出
export function daochuReport11(data) {
    return axios({
        url: '/web/report/report11/daochu',
        method: 'post',
        data
    })
}


//【部门时段消费报表】分页查询
export function report12(data) {
    return axios({
        url: '/web/report/report12/pageQuery',
        method: 'post',
        data
    })
}
//【部门时段消费报表】导出
export function daochuReport12(data) {
    return axios({
        url: '/web/report/report12/daochu',
        method: 'post',
        data
    })
}

//(自定义)【部门时段消费报表】分页查询
export function report13(data) {
    return axios({
        url: '/web/report/report13/pageQuery',
        method: 'post',
        data
    })
}
//(自定义)【部门时段消费报表】导出
export function daochuReport13(data) {
    return axios({
        url: '/web/report/report13/daochu',
        method: 'post',
        data
    })
}

//【优惠满减报表】分页查询
export function report14(data) {
    return axios({
        url: '/web/report/report14/pageQuery',
        method: 'post',
        data
    })
}
//【优惠满减报表】导出
export function daochuReport14(data) {
    return axios({
        url: '/web/report/report14/daochu',
        method: 'post',
        data
    })
}
//【交易单据】分页查询
export function report15(data) {
    return axios({
        url: '/web/report/report15/pageQuery',
        method: 'post',
        data
    })
}
//【交易单据】导出
export function daochuReport15(data) {
    return axios({
        url: '/web/report/report15/daochu',
        method: 'post',
        data
    })
}
//【对账单】分页查询
export function report16(data) {
    return axios({
        url: '/web/report/report16/pageQuery',
        method: 'post',
        data
    })
}