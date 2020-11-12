import Vue from 'vue'
import Vuex from 'vuex'
import { setCookie, getCookie, removeCookie } from '@/js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: getCookie('jh-token') || '',
        userInfo: getCookie('jh-userInfo') ? JSON.parse(getCookie('jh-userInfo')) : {},
        isBtnLoading: false,
        loading: false,
        btnLoading: false,
        routerTree: [], //权限过滤后的路由
        merchantId: getCookie('jh-merchantId') || '', //操作商户的id
        merchantInfo: getCookie('jh-merchantInfo') ? JSON.parse(getCookie('jh-merchantInfo')) : {}, //操作商户详情

        handler: getCookie('jh-handler') ? JSON.parse(getCookie('jh-handler')) : {},

        //审核ID
        approvalId: getCookie('jh-approvalId') || '',
        approvalCode: getCookie('jh-approvalCode') || '',

        // 自动调用接口
        autoApi: '',
        autoList: [],

        //所有部门列表
        departmentList: [],
        //自定义部门列表
        customDepartmentList: [], 

    },
    mutations: {
        //重置
        Change_init(state) {
            state.isBtnLoading = false
            state.loading = false
            state.btnLoading = false
        },
        //更新isBtnLoading
        Change_isBtnLoading(state, value) {
            state.isBtnLoading = value
            if(value) {
                setTimeout(() => {
                    state.isBtnLoading = false
                }, 500)
            }
        },
        //更新loading
        Change_loading(state, value) {
            state.loading = value
        },
        //更新btnLoading
        Change_btnLoading(state, value) {
            state.btnLoading = value
        },
        //更新可用路由routerTree
        ROUTERTREE(state, value) {
            state.routerTree = value
        },
        
        //更新Token
        Set_Token(state, value) {
            state.token = value
            setCookie('jh-token', value)
        },
        //更新userInfo
        Set_UserInfo(state, value) {
            state.userInfo = value
            setCookie('jh-userInfo', JSON.stringify(value))
        },
        //商户ID
        Set_MerchantId(state, value) {
            state.merchantId = value
            setCookie('jh-merchantId', value)
        },
        
        Set_MerchantInfo(state, value) {
            state.merchantInfo = value
            setCookie('jh-merchantInfo', value)
        },

        Set_Handler(state, value) {
            state.handler = value
            setCookie('jh-handler', value)
        },

        Set_ApprovalId(state, value) {
            state.approvalId = value
            setCookie('jh-approvalId', value)
        },
        
        Set_ApprovalCode(state, value) {
            state.approvalCode = value
            setCookie('jh-approvalCode', value)
        },
        
        

       

    },
    actions: {
        
        
    }
})