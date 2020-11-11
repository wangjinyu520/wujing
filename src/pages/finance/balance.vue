<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.income" type="primary" @click="getMoneyHandler()"
          >收款</el-button
        >
      </template>
      <template slot="search">
        <li style="width: 300px">
          <span>时间：</span>
          <div>
            <DatePicker :startDate.sync="listQuery.startDate" :endDate.sync="listQuery.endDate" />
          </div>
        </li>
        <li>
          <span>类型：</span>
          <div>
            <el-select v-model="listQuery.type" clearable>
              <el-option
                v-for="(item, index) in types"
                v-show="!item.noSearch"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <div class="main-total">
        <li>
          <p>总营业额（云闪付、一卡通）</p>
          <p class="amount">
            {{ info.totalAmount || 0 }}（ {{ info.totalUnionAmount || 0 }}、{{
              info.totalCardAmount || 0
            }}
            ）
          </p>
        </li>
        <li class="after">
          <p>待结算（元）</p>
          <p class="amount">{{ info.ableAmount }}</p>
        </li>
        <li class="after">
          <p>已结算（元）</p>
          <p class="amount">{{ Math.abs(info.cashAmount) }}</p>
        </li>
      </div>
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="date" label="序号" type="index"> </el-table-column>
          <el-table-column prop="amount" label="金额"> </el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              {{ typesFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ statusFormat(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="createTimeStr" label="时间"> </el-table-column>
        </el-table>
        <Pagination
          :pageNo.sync="listQuery.pageNo"
          :pageSize.sync="listQuery.pageSize"
          :total="total"
          @change="getList()"
        />
      </LoadingBox>
    </div>

    <!-- 收款 -->
    <el-dialog
      :visible.sync="receiveVisible"
      :close-on-click-modal="false"
      title="收款扫码"
      width="380px"
    >
      <div
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-form ref="receiveform" :model="receiveform" :rules="rules" label-width="80px">
          <el-form-item label="收款信息：" prop="">
            <el-input
              type="textarea"
              autosize
              resize="none"
              v-model="stepOneData.msg"
              disabled
              placeholder="请扫码"
            />
            <div style="color: #ff4f33; font-size: 11px; line-height: 15px;">
              *请使用扫码盒扫码，读取付款人信息
            </div>
          </el-form-item>
          <el-form-item label="收款金额：" prop="amount" v-if="stepOneData.type == 3">
            <NumInput v-model="receiveform.amount" placeholder="收款金额" />
          </el-form-item>
        </el-form>

        <div style="text-align: center;padding-top: 25px">
          <el-button @click="receiveVisible = false">取消</el-button>
          <load-button v-if="stepOneData.type == 3" type="primary" @click="receiveConfirm()"
            >确认收款</load-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import form from '@/mixin/form'
import handler from '@/mixin/handler'
import { walletGet, walletRecord } from '@/axios/wallet'
import { orderVerification, explainMsg, explain } from '@/axios/order'

export default {
  mixins: [form, handler],
  data() {
    return {
      list: [],
      listQuery: {
        startDate: '',
        endDate: '',
        type: '',
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      types: [
        {
          label: '订单收益（云闪付）',
          value: 1
        },
        {
          label: '订单收益（一卡通）',
          value: 2
        },
        {
          label: '提现',
          value: 3
        },
        {
          label: '提现回滚',
          value: 4
        },
        {
          label: '消费奖励积分',
          value: 5,
          noSearch: true
        },
        {
          label: '积分兑换',
          value: 6,
          noSearch: true
        }
      ],
      status: [
        {
          label: '未生效',
          value: 0
        },
        {
          label: '生效',
          value: 1
        },
        {
          label: '审核中',
          value: 2
        },
        {
          label: '已驳回',
          value: 3
        }
      ],
      info: {},
      rules: {
        amount: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      loading: false,
      receiveVisible: false,
      stepOneData: {
        msg: '',
        type: ''
      },
      receiveform: {
        content: '',
        amount: ''
      },
      code: ''
    }
  },
  watch: {
    receiveVisible(val) {
      if (!val) {
        this.loading = false
        this.stepOneData = {
          msg: '',
          type: ''
        }
        this.receiveform = {
          content: '',
          amount: ''
        }
        this.code = ''
        this.$refs.receiveform.clearValidate()
      }
    }
  },
  activated() {
    this.scanInit()
    this.get()
    this.getList()
  },
  methods: {
    scanInit() {
      // 扫码
      let t = this
        console.log(123)
        let code = ''
        var lastTime, nextTime
        var lastCode, nextCode
        document.onkeypress = function(e) {
          if (!t.receiveVisible) return

          nextCode = e.which
          nextTime = new Date().getTime()
          if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
            code += String.fromCharCode(lastCode)
            if (!t.loading) {
              t.loading = true
            }
          } else if (lastCode != null && lastTime != null && nextTime - lastTime > 100) {
            code = ''
          }
          lastCode = nextCode
          lastTime = nextTime
        }
        window.onkeypress = function(e) {
          if (!t.receiveVisible) return
          if (e.which == 13) {
            console.log('扫码器监听')
            if (code) {
              explainMsg({
                content: code
              }).then(res => {
                t.receiveform.content = code
                t.loading = false
                t.stepOneData = res.result
                if (t.stepOneData.type != 3) {
                  t.$message.warning('收款人信息错误，请重新扫码')
                }
              }).catch(() => {
                t.loading = false
              })
            } else {
              t.loading = false
              t.$message.warning('扫码失败，请重新扫码')
            }
            return false
          }
        }
    },
    get() {
      walletGet().then(res => {
        this.info = res.result
      })
    },
    getList() {
      walletRecord(this.listQuery).then(res => {
        this.list = res.result.list
        this.total = res.result.totalCount
      })
    },
    statusFormat(row) {
      let status = this.status.find(item => item.value == row.status)
      return status ? status.label : ''
    },
    typesFormat(row) {
      let types = this.types.find(item => item.value == row.type)
      return types ? types.label : ''
    },
    //收款
    getMoneyHandler() {
      this.receiveVisible = true
    },
    receiveConfirm() {
      this.$validate('receiveform').then(() => {
        explain(this.receiveform).then(res => {
          this.Notify('收款成功！')
          this.getList()
          this.receiveVisible = false
        })
      })
    }
  }
}
</script>

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
  li.after {
    margin-left: 60px;
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