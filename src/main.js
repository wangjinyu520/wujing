// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import { getCookie } from "@/js-cookie";

import "element-ui/lib/theme-chalk/index.css";
import "./static/css/index.css"; //全局样式

Vue.use(ElementUI)
import "@/util/index.js" //放置一些定义在Vue原型上的属性


Vue.config.productionTip = false;

Vue.component('Operation', () =>
    import ('@/components/Operation.vue'))
Vue.component('Pagination', () =>
    import ('@/components/Pagination.vue'))
Vue.component('LoadingBox', () =>
    import ('@/components/LoadingBox.vue'))
Vue.component('loadButton', () =>
    import ('@/components/loadButton.vue'))
Vue.component('Dialog', () =>
    import ('@/components/Dialog.vue'))
Vue.component('Upload', () =>
    import ('@/components/Upload.vue'))
Vue.component('Editor', () =>
    import ('@/components/Editor.vue'))
Vue.component('NumInput', () =>
    import ('@/components/NumInput.vue'))
Vue.component('DatePicker', () =>
    import ('@/components/DatePicker.vue'))
Vue.component('Cascader', () =>
    import ('@/components/Cascader.vue'))


Vue.prototype.$validate = function(ref) {
    return new Promise((resolve, reject) => {
        this.$refs[ref].validate(valid => {
            if (valid) {
                resolve()
            } else {
                reject()
            }
        })
    })

}

Vue.prototype.$mobileValidator = function(rule, value, callback) {
    let myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
    if (myreg.test(value)) {
        callback()
    } else {
        callback(new Error('请正确填写手机号'))
    }
}
Vue.prototype.$cardValidator = function(rule, value, callback) {
        let myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (myreg.test(value)) {
            callback()
        } else {
            callback(new Error('身份证号格式有误'))
        }
    }
    //路由守卫
const passPath = ["/login"];
router.beforeEach((to, from, next) => {
    store.commit('Set_AutoApi')
    store.commit('Change_init', false)
    next()
    return
    if (passPath.includes(to.path)) {
        next();
    } else {
        if (!getCookie("token")) {
            next({
                path: "/login",
                replace: true
            });
        } else {
            next();
        }
    }
});


/* eslint-disable no-new */
export default new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});