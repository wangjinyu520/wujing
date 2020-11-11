export default {
    data() {
        return {
            formType: 'add', //添加 还是 编辑
            rules: {
                name: [{ required: true, message: '请填写', trigger: 'blur' }],
                mobile: [{ required: true, validator: this.$mobileValidator, trigger: 'blur' }],
                username: [{ required: true, message: '请填写', trigger: 'blur' }],
                sequence: [{ required: true, message: '请填写', trigger: 'blur' }],
                description: [{ required: true, message: '请填写', trigger: 'blur' }],
                address: [{ required: true, message: '请填写', trigger: 'blur' }],
            }
        }
    }
}