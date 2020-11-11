<template>
  <div class="open-info">
    <operation :mode="6">
      <template slot="customTip">
        <p @click="$router.go(-1)"><span>开卡管理</span></p>
        &nbsp;/&nbsp;
        <p>
          <span>{{ routeQuery.id ? '编辑' : '新增' }}</span>
        </p>
      </template>
    </operation>

    <!-- main -->
    <div class="main-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px" style="width: 400px">
        <el-form-item label="姓名：" prop="name">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="联系方式：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="部门：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="职务：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="编制：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="单位函：">
          <Upload :mode="1" />
        </el-form-item>
        
        <el-form-item label="编外用工核准表：">
          <Upload :mode="1" />
        </el-form-item>
        
        <el-form-item label="编外聘用人员支出录入表：">
          <Upload :mode="1" />
        </el-form-item>
        
        <el-form-item label="身份证照片（人像面）：">
          <Upload :mode="1" />
        </el-form-item>

        <el-form-item label="身份证照片（国徽面）：">
          <Upload :mode="1" />
        </el-form-item>
        
        <el-form-item label="劳动合同：">
          <Upload :mode="1" />
        </el-form-item>

        <el-form-item label="一寸免冠照：">
          <Upload :mode="1" />
        </el-form-item>

        <el-form-item label="一卡通编外卡办理登记表：">
          <Upload :mode="1" />
        </el-form-item>

        <el-form-item label="备注：">
          <el-input type="textarea" :rows="4" resize="none"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.go(-1)">返回</el-button>
          <load-button type="primary" @click="confirmHandler()">确定</load-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeQuery: {}
    }
  },
  activated() {
    this.routeQuery = this.$route.query
  },
  methods: {
    confirmHandler() {
      
    }
  }
}
</script>

<style>

</style>