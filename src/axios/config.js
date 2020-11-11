import axios from "axios";
import { Message } from "element-ui";
import Router from '@/router'
import { removeCookie } from '@/js-cookie'
import store from '@/store'
import Vue from '@/main.js'

const instance = axios.create({
    baseURL: (process.env.BASE_URL || BASEURL),
    timeout: 20000
});
instance.defaults.transformRequest = [function(data) {
        if (!data) {
            data = {}
        }
        // data.merchantId = store.state.merchantId
        let ret = ''
        let ignores = ['createTimeStr', 'createDateStr', 'updateTimeStr', 'updateDateStr', 'creatorStr', 'updaterStr', 'children']
        for (const it in data) {
            if (ignores.includes(it)) {
                continue
            }
            if (!data[it] && data[it] != '0') {
                continue
            }

            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
    // 添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        console.log(store.state.token)
        config.headers.token = store.state.token || ''
        if (store.state.isBtnLoading) {
            store.commit('Change_isBtnLoading', false)
            store.commit('Change_btnLoading', true)
        } else {
            store.commit('Change_loading', true)
        }
        // 在发送请求之前做些什么
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        store.commit('Change_init')
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        store.commit('Change_init')
        if (response.data.code == 0) {
            return response.data;
        } else if (response.data.code == 999) {
            removeCookie('jh-token')
            if (Vue.$route.fullPath.indexOf('login') > -1) return
            Router.replace({
                path: '/login?url=' + Vue.$route.fullPath
            })
        } else {
            Message({
                type: "warning",
                message: response.data.message || "出现错误！",
                showClose: true,
                duration: 4000
            });
        }
        return Promise.reject(response.data);
    },
    function(error) {
        // 对响应错误做点什么
        store.commit('Change_init')
        Message({
            type: "warning",
            message: "ERROR!出现错误！",
            showClose: true,
            duration: 4000
        });
        return Promise.reject(error);
    }
);

export default instance;