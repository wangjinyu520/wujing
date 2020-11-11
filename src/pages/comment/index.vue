<template>
  <div>
    <operation :mode="4">
      <template slot="search">
        <li>
          <span>订单编号：</span>
          <div><el-input v-model="listQuery.orderIdentifier"></el-input></div>
        </li>
        <li>
          <span>联系人：</span>
          <div><el-input v-model="listQuery.receiveName"></el-input></div>
        </li>
        <li>
          <span>联系电话：</span>
          <div><el-input v-model="listQuery.receiveMobile"></el-input></div>
        </li>
        <div>
          <el-button type="primary" @click="searchList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <!-- table -->
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column label="序号" type="index" width="70" />
          <el-table-column label="订单编号" prop="orderIdentifier"></el-table-column>
          <el-table-column label="商户名称" prop="merchantName"></el-table-column>
          <el-table-column label="联系人" prop="name"></el-table-column>
          <el-table-column label="联系电话" prop="mobile"></el-table-column>
          <el-table-column label="评价星级" prop="star"></el-table-column>
          <el-table-column label="评价内容" prop="content"></el-table-column>
          <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>
          
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button v-if="handler.delete" @click="deleteHandler(scope.$index, scope.row)"
                >删除</el-button
              >
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
import handler from '@/mixin/handler'
import { commentPageQuery, commentDelete } from '@/axios/comment'

export default {
  mixins: [ handler],
  data() {
    return {
      list: [],
      listQuery: {
        orderIdentifier: '',
        receiveName: '',
        receiveMobile: '',
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    searchList() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      commentPageQuery(this.listQuery).then(res => {
        this.list = res.result.list
        this.total = res.result.totalCount
      })
    },
    //
    addHandler() {
      this.formType = 'add'
      this.form = { ...defaultForm }
      this.$refs['dialog'].open()
    },
    deleteHandler(index, row) {
      this.Confirm('是否继续删除？').then(() => {
        commentDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1)
          this.Notify('删除成功！')
        })
      })
    },
  }
}
</script>

<style>
</style>
