<template>
  <div class="message-info">
    <LoadingBox>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片：" prop="">
          <Upload :defaultImage.sync="form.image" />
        </el-form-item> -->
        <el-form-item label="详情：" prop="description">
          <Editor v-model="form.description" style="width: 700px;padding-top: 8px;"/>
        </el-form-item>
        <!-- <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">失效</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="" prop="">
          <el-button @click="$router.go(-1)">取消</el-button>
          <load-button type="primary" @click="confirm()">确定</load-button>
        </el-form-item>
      </el-form>
    </LoadingBox>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import { messageCreate, messageUpdate, messageGet } from '@/axios/message'

const defaultForm = {
  id: 0,
  title: '',
  image: '',
  description: '',
  status: 1
}

export default {
  components: {
    Editor
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        title: [{ required: true, message: '请填写', trigger: 'blur' }],
        description: [{ required: true, message: '请填写', trigger: 'blur' }],
        status: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  activated() {
    let id = this.$route.query.id
    if (id) {
      this.form.id = id
      this.getInfo()
    }
  },
  deactivated() {
    this.form = { ...defaultForm }
    this.$nextTick(() => {
      this.$refs.form.clearValidate()
    })
  },
  methods: {
    getInfo() {
      messageGet({
        id: this.form.id
      }).then(res => {
        this.form = res.result
        console.log(res.result)
      })
    },
    confirm() {
      this.$validate('form').then(() => {
        if (!this.form.id) {
          messageCreate(this.form).then(() => {
            this.Notify('添加成功！')
            this.$router.go(-1)
          })
        } else {
          messageUpdate(this.form).then(() => {
            this.Notify('更新成功！')
            this.$router.go(-1)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.message-info {
    padding-top: 25px;
    width: 300px;
}
</style>