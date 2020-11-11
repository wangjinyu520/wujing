<template>
  <!-- 开卡管理 -->
  <div class="open-card">
    <operation :mode="4">
      <template slot="btns">
        <el-button type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>名称：</span>
          <div><el-input></el-input></div>
        </li>
        <li style="width: 300px">
          <span>部门：</span>
          <div><el-input></el-input></div>
        </li>
        <li>
          <span>状态：</span>
          <div><el-input></el-input></div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>已制卡</span>
              <span class="waiting">待审核</span>
              <span class="pass">审核已通过</span>
              <span class="reject">审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" @click="moreHandler(scope.row)">查看</el-button>
              <el-button type="primary" @click="makeHandler(scope.row)">制卡</el-button>
              <el-button type="primary" @click="reopenHandler(scope.row)">重新开卡</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :pageNo.sync="listQuery.pageNo"
          :pageSize.sync="listQuery.pageSize"
          :total="total"
          @change="getList()"
        />
      </LoadingBox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      list: [{}]
    }
  },
  methods: {
    // 新增
    addHandler() {
      this.$router.push({
        path: 'open/openInfo'
      })
    },
    // operate
    moreHandler() {},
    makeHandler() {},
    reopenHandler() {},
    //
    getList() {}
  }
}
</script>

<style>
</style>