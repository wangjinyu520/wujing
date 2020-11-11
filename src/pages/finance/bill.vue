<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button @click="addHandler()">生成报表</el-button>
      </template>
      <template slot="search">
        <li>
          <span>申请时间：</span>
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
      list: [],
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
    }
  },
  methods: {
    getList() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>