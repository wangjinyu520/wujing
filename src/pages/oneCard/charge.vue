<template>
  <!-- 充值管理 -->
  <div class="charge">
    <operation :mode="3">
      <template slot="btns">
        <el-button type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>姓名：</span>
          <div><el-input></el-input></div>
        </li>
        <li style="width: 300px">
          <span>部门：</span>
          <div><el-input></el-input></div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <div class="main-total">
        <li>
          <p>总金额（元）</p>
          <p class="amount">1000.00</p>
        </li>
        <li>
          <el-button type="primary" @click="history()">历史记录</el-button>
        </li>
      </div>
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span class="waiting">冻结</span>
              <span class="pass">正常</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" @click="chargeHandler(scope.row)">充值</el-button>
              <el-button type="primary" @click="freezeHandler(scope.row)">冻结</el-button>
              <el-button @click="recordHandler(scope.row)">充值记录</el-button>
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

    <!-- form -->
    <Dialog ref="dialog" :type="formType" title="充值" width="380px">
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名：" prop="name">
          <el-input :value="23" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号：" prop="name">
          <el-input :value="23" disabled></el-input>
        </el-form-item>
        <el-form-item label="充值：" prop="name">
          <NumInput>
            <span>元</span>
          </NumInput>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>

    <!-- 充值记录 -->
    <el-dialog :title="recordTitle[recordType]" class="table-dialog" :visible.sync="dialogVisible" width="600px">
      <operation :mode="3" style="margin-bottom: 10px" v-if="recordType == 1">
        <template slot="search">
          <li>
            <span>姓名：</span>
            <div><el-input></el-input></div>
          </li>
          <div>
            <el-button type="primary" @click="getRecordList()">查询</el-button>
          </div>
        </template>
      </operation>

      <el-table :data="recordList" style="width: 100%" height="300px">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span class="waiting">冻结</span>
            <span class="pass">正常</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :pageNo.sync="recordListQuery.pageNo"
        :pageSize.sync="recordListQuery.pageSize"
        :total="recordTotal"
        @change="getRecordList()"
      />
    </el-dialog>
  </div>
</template>

<script>
import form from '@/mixin/form'
export default {
  mixins: [form],
  data() {
    return {
      form: {},
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      list: [{}],
      recordList: [{}, {}],
      dialogVisible: false,
      recordListQuery: {
        pageNo: 1,
        pageSize: 20
      },
      recordTotal: 0,
      recordType: 1,
      recordTitle: {
        1: '历史记录',
        2: '充值记录'
      },
      loading: false,
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
    chargeHandler(row) {
      this.$refs.dialog.open()
    },
    freezeHandler(row) {
      this.Confirm('是否继续冻结？').then(() => {})
    },
    recordHandler(row) {
      this.recordType = 2
      this.recordListQuery.pageNo = 1
      this.getRecordList()
    },
    history() {
      this.recordType = 1
      this.recordListQuery.pageNo = 1
      this.getRecordList()
    },
    //
    getList() {},
    getRecordList() {
      this.dialogVisible = true
      let type = this.recordType
      if(type == 1) {
        //调用历史记录接口
      } else {
        //调用充值记录接口
      }
    }
  }
}
</script>

<style lang="scss">
.table-dialog .el-dialog__body {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.main-total {
  display: flex;
  align-items: flex-end;
  padding: 20px 25px;
  background: #f8f8f9;
  margin-bottom: 10px;
  li {
    margin-right: 25px;
  }
  li p {
    font-size: 12px;
    padding-left: 2px;
    color: #444444;
  }
  li p.amount {
    font-size: 24px;
    margin-top: 10px;
    padding-left: 0;
  }
}
</style>