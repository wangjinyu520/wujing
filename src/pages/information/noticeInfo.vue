
<template>
  <div>
    <operation :mode="6">
      <template slot="customTip">
        <p @click="$router.replace({ path: '/information/notice' })"><span>消息公告</span></p>
        &nbsp;/&nbsp;
        <p>
          <span>{{ routeQuery.id ? '编辑' : '新增' }}</span>
        </p>
      </template>
    </operation>

    <!-- main -->
    <div class="main-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 400px">
        <el-form-item label="标题：" prop="name">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="消息内容：">
          <Editor style="width: 700px;" />
        </el-form-item>

        <el-form-item label="发布主体：">
          <el-radio-group>
            <el-radio :label="1">全体</el-radio>
            <el-radio :label="0">指定</el-radio>
          </el-radio-group>
          <el-select style="margin-left: 5px;">
            <el-option label="测试" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公告日期：">
          <el-date-picker
            style="width: 100%"
            value-format="yyyy-MM-dd"
            v-model="form.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.go(-1)">取消</el-button>
          <load-button type="primary" @click="confirmHandler()">确定</load-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {
  components: {
    Editor
  },
  data() {
    return {
      form: {
        times: []
      },
      routeQuery: {}
    }
  },
  activated() {
    this.routeQuery = this.$route.query
  },
  methods: {}
}
</script>

<style>
</style>