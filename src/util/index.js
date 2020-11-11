import Vue from 'vue'

Vue.prototype.Confirm = function (str) {
    return this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}
Vue.prototype.Prompt = function (str) {
    return this.$prompt(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    })
}
Vue.prototype.Notify = function (str) {
    return this.$notify.success({
        title: '成功',
        message: str
    })
}
Vue.prototype.Warning = function (str) {
    return  this.$notify({
        title: '提示',
        message: str,
        type: 'warning'
      });
}

Vue.prototype.Bus = new Vue()