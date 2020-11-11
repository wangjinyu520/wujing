<template>
  <!-- 消息公告 -->
  <div class="question">
    <operation :mode="4">
      <template slot="btns">
        <el-button type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>标题：</span>
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
          <el-table-column prop="" label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" @click="statisticsHandler(scope.row)">统计</el-button>
              <el-button type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button @click="deleteHandler(scope.row)">删除</el-button>
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
import form from '@/mixin/form'
export default {
  mixins: [form],
  data() {
    return {
      formType: 'add',
      form: {},
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      list: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {},
    // operate
    addHandler() {
      this.$router.push({
        path: 'question/info'
      })
    },
    statisticsHandler(row) {

    },
    updateHandler(row) {
      this.$router.push({
        path: 'question/info',
        query: {id: 1}
      })
    },
    deleteHandler() {
      this.Confirm('是否继续删除？').then(() => {
        console.log('确定')
      })
    },
    //
    confirm() {
      this.$refs['dialog'].close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>