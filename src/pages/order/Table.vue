<template>
  <div v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
    <!-- 支付订单 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      class="table-btn"
      @selection-change="selectChange"
    >
      <el-table-column prop label type="selection" :selectable="checkBoxAble"></el-table-column>
      <el-table-column prop label="序号" type="index"></el-table-column>
      <el-table-column prop="identifier" label="订单编号"></el-table-column>
      <el-table-column prop label="配送方式">
        <template slot-scope="scope">{{ scope.row.sendType == 1 ? '自提' : '配送' }}</template>
      </el-table-column>
      <el-table-column prop label="收货信息/自提地址" width="135">
        <template slot-scope="scope">
          <div v-if="scope.row.sendType == 1">
            <span v-if="scope.row.selfPickAddress">{{ scope.row.selfPickAddress }} 、</span>
            <span>{{ scope.row.selfPickCode }}</span>
          </div>
          <div v-if="scope.row.sendType == 2">
            <span v-if="scope.row.receiveName">{{ scope.row.receiveName }} 、</span>
            <span v-if="scope.row.receiveMobile">{{ scope.row.receiveMobile }} 、</span>
            <span v-if="scope.row.receiveAddress">{{ scope.row.receiveAddress }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop label="下单人">
        <template slot-scope="scope">
          {{ scope.row.name }}
          <br />
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="type != 3"
        width="205"
        prop
        :label="'实付金额（含搭伙费） / 结算金额 / 搭伙费' + (type != 3 ? '（元）' : '（积分）')"
      >
        <template
          slot-scope="scope"
        >{{ scope.row.payAmount }} / {{ scope.row.countAmount }} / {{ scope.row.partnerAmount }}</template>
      </el-table-column>
      <!-- <el-table-column
        v-if="type == 3"
        prop="totalAmount"
        :label="'应付金额（积分）'"
        width="120"
      ></el-table-column>-->
      <el-table-column v-if="type == 3" prop="payAmount" :label="'实付金额（积分）'" width="120"></el-table-column>
      <el-table-column prop="payAmount" label="优惠信息" width="150">
        <template slot-scope="scope" v-if="type != 3">
          <span>满减优惠：{{ scope.row.promotionSubtractAmount }}元</span>
          <br />
          <span>优惠券金额：{{ scope.row.couponSubtractAmount }}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" label="商户名称" v-if="isPlatForm"></el-table-column>
      <el-table-column prop="productItem" label="商品明细"></el-table-column>
      <el-table-column prop="statusStr" label="状态">
        <template slot-scope="scope">
          {{ scope.row.statusStr }}
          <br />
          {{ scope.row.status == 6 ? '退款理由：' + scope.row.refundRemark : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="departmentName" label="部门名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createTimeStr" label="创建时间"></el-table-column>
      <el-table-column prop label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="
              (scope.row.status == 2 || scope.row.status == 26) &&
                scope.row.sendType == 2 &&
                handler.send
            "
            @click="sendHandler(scope.row)"
          >确认配送</el-button>
          <el-button
            type="primary"
            v-if="
              (scope.row.status == 2 || scope.row.status == 26) &&
                scope.row.sendType == 1 &&
                handler.send
            "
            @click="sendHandler(scope.row)"
          >确认接单</el-button>

          <el-button
            type="primary"
            v-if="scope.row.status == 6 && handler.refund"
            @click="backHandler(scope.row, true)"
          >确认退款</el-button>
          <el-button
            type="primary"
            v-if="scope.row.status == 6 && handler.refund"
            @click="backHandler(scope.row, false)"
          >拒绝退款</el-button>
          <el-button
            type="primary"
            v-if="scope.row.status == 3 && handler.receive"
            @click="confirmReceive(scope.row)"
          >确认收货</el-button>
          <el-button v-if="scope.row.logisticsNo" @click="logisticsHandler(scope.row)">查看物流</el-button>
          <el-button @click="dealHandler(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 积分兑换订单 -->
    <Pagination
      :pageNo.sync="listQuery.pageNo"
      :pageSize.sync="listQuery.pageSize"
      :total="total"
      @change="getList()"
    />

    <!-- 物流详情 -->
    <el-dialog class="table-dialog" title="物流详情" :visible.sync="logisticsVisible" width="600px">
      <LoadingBox>
        <div class="logistics">
          <li v-for="(item, index) in logisticsList" :key="index" :class="{ active: index == 0 }">
            <p class="time">{{ item.time }}</p>
            <p class="content">{{ item.status }}</p>
          </li>
        </div>
      </LoadingBox>
    </el-dialog>
    <!-- 确认发货 -->
    <Dialog ref="sendDialog" type="normal" title="物流信息" width="400px">
      <el-form slot="main" ref="sendform" :model="sendForm" :rules="rules" label-width="115px">
        <el-form-item label="配送/快递公司：" prop="logisticsCompany">
          <el-input v-model="sendForm.logisticsCompany"></el-input>
        </el-form-item>
        <el-form-item label="配送/快递单号：" prop="logisticsNo">
          <el-input v-model="sendForm.logisticsNo"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="sendConfirm()">确定配送</load-button>
      </template>
    </Dialog>

    <!-- 订单详情 -->
    <el-dialog
      class="table-dialog order-info"
      ref="dialog"
      title="订单详情"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <div class="order-header">
        <div>
          <li>
            <span>订单编号：</span>
            <span>{{ orderInfo.identifier }}</span>
          </li>
          <li>
            <span>订单分类：</span>
            <span>{{ orderTypesFormat(orderInfo.type) }}</span>
          </li>
        </div>
        <div>
          <li>
            <span>订单状态：</span>
            <span>{{ orderInfo.statusStr || orderStatusFormat(orderInfo.status) }}</span>
          </li>
          <li>
            <span>操作人：</span>
            <span>{{ orderInfo.updaterStr }}</span>
          </li>
        </div>
      </div>
      <div class="order-main">
        <li>
          <span>配送方式：</span>
          <span>{{ orderInfo.sendType == 1 ? '自提' : '配送' }}</span>
          <span style="padding: 0 18px;"></span>
          <span>备注：</span>
          <span>{{ orderInfo.remark }}</span>
        </li>
        <li v-if="orderInfo.sendType == 1">
          <span>自提信息：</span>
          <span>{{ orderInfo.selfPickAddress }} 、{{ orderInfo.selfPickCode }}</span>
        </li>
        <li v-if="orderInfo.sendType == 2">
          <span>收货人信息：</span>
          <span>
            {{ orderInfo.receiveName }} 、{{ orderInfo.receiveMobile }} 、{{
            orderInfo.receiveAddress
            }}
          </span>
        </li>
        <li>
          <span>下单人：</span>
          <span>{{ orderInfo.name }} / {{ orderInfo.mobile }}</span>
        </li>
        <li>
          <span>实付金额（含搭伙费）{{ type != 3 ? '(元)' : '(积分)' }}：</span>
          <span>{{ orderInfo.payAmount }}</span>
          <span style="padding: 0 18px;"></span>
          <span>结算金额{{ type != 3 ? '(元)' : '(积分)' }}：</span>
          <span>{{ orderInfo.countAmount }}</span>
          <span style="padding: 0 18px;"></span>
          <span>搭伙费{{ type != 3 ? '(元)' : '(积分)' }}：</span>
          <span>{{ orderInfo.partnerAmount }}</span>
        </li>
        <!-- <li>
          <span>结算价格：</span><span>{{ orderInfo.countPrice }}</span>
        </li>-->
        <li>
          <span>满减促销：</span>
          <span>{{ orderInfo.promotionSubtractAmount }}</span>
          <span style="padding: 0 20px;"></span>
          <span>优惠券金额：</span>
          <span>{{ orderInfo.couponSubtractAmount }}</span>
        </li>
        <li>
          <span>下单时间：</span>
          <span>{{ orderInfo.createTimeStr }}</span>
        </li>
        <li v-if="orderInfo.payTime">
          <span>付款时间：</span>
          <span>{{ orderInfo.payTime }}</span>
        </li>
        <li v-if="orderInfo.sendTime">
          <span>配送时间：</span>
          <span>{{ orderInfo.sendTime }}</span>
        </li>
        <li v-if="orderInfo.receiveTime">
          <span>收货时间：</span>
          <span>{{ orderInfo.receiveTime }}</span>
        </li>
      </div>
      <div class="order-footer">
        <p>商品明细</p>
        <div class="item-bg">
          <div class="items" v-for="(item, index) in orderInfo.orderProductVOS" :key="index">
            <img :src="item.image" alt />
            <div class="info">
              <p class="name">
                <span>{{ item.name }}</span>
                <span
                  v-if="item.limitMsg"
                  style="font-size: 12px;font-weight: normal"
                >（{{ item.limitMsg }}）</span>
              </p>
              <p class="price">价格 : {{ item.price }} &nbsp;&nbsp; 数量 : {{ item.num }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <Print ref="print" :list="list" :props="printProps[type != 3 ? '1' : '2']" />
  </div>
</template>

<script>
import {
  orderSend,
  orderVerification,
  orderPageQuery,
  orderGet,
  orderRefund,
  orderRefundRefuse,
  orderPageQueryBuyGuard,
  viewLogistics,
  orderDaochu,
  daochuBuyGuard,
  orderReceive
} from "@/axios/order";
import util from "@/mixin/util";
import handler from "@/mixin/handler";
import Print from "@/components/print";

const defaultSendForm = {
  id: "",
  logisticsCompany: "",
  logisticsNo: ""
};
export default {
  inject: {
    status: {
      default: ""
    }
  },
  components: {
    Print
  },
  mixins: [util, handler],
  props: ["type", "search"],
  data() {
    return {
      list: [],
      loading: false,
      listQuery: {
        status: "",
        type: "",
        merchantName: "",
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      dialogVisible: false,
      orderInfo: {},
      logisticsVisible: false,
      logisticsList: [],
      sendForm: { ...defaultSendForm },
      selectList: [],
      rules: {
        logisticsCompany: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        logisticsNo: [{ required: true, message: "请填写", trigger: "blur" }]
      },
      printProps: {
        1: [
          {
            index: "index",
            label: "序号",
            width: "50px"
          },
          {
            index: "identifier",
            label: "订单编号",
            width: "80px"
          },
          {
            index: "sendType",
            label: "配送方式",
            custom: function(type) {
              return type == 1 ? "自提" : "配送";
            },
            width: "50px"
          },
          {
            index: "",
            label: "收货信息/自提地址",
            custom: function(values, data) {
              if (data.sendType == 1) {
                return [data.selfPickAddress, data.selfPickCode].join("、");
              } else if (data.sendType == 2) {
                return [
                  data.receiveName,
                  data.receiveMobile,
                  data.receiveAddress
                ].join("、");
              }
            },
            width: "100px"
          },
          {
            index: "",
            label: "下单人",
            custom: function(value, data) {
              return `${data.name}<br />
                    ${data.mobile}`;
            },
            width: "100px"
          },
          {
            index: ["payAmount", "countAmount", "partnerAmount"],
            label: "实付金额（含搭伙费）/结算金额/搭伙费（元）",
            custom: function(value) {
              return value.join("/");
            },
            width: "50px"
          },
          {
            index: "",
            label: "优惠信息",
            custom: function(value, data) {
              return `<span>满减优惠：${data.promotionSubtractAmount}元</span><br />
                    <span>优惠券金额：${data.couponSubtractAmount}元</span>`;
            },
            width: "100px"
          },
          {
            index: "productItem",
            label: "商品明细",
            width: "100px"
          },
          {
            index: "statusStr",
            label: "状态",
            width: "100px"
          },
          {
            index: "departmentName",
            label: "部门名称",
            width: "50px"
          },
          {
            index: "createTimeStr",
            label: "创建时间",
            width: "50px"
          }
        ],
        //积分订单
        2: [
          {
            index: "index",
            label: "序号",
            width: "50px"
          },
          {
            index: "identifier",
            label: "订单编号",
            width: "80px"
          },
          {
            index: "sendType",
            label: "配送方式",
            custom: function(type) {
              return type == 1 ? "自提" : "配送";
            },
            width: "50px"
          },
          {
            index: "",
            label: "收货信息/自提地址",
            custom: function(values, data) {
              if (data.sendType == 1) {
                return [data.selfPickAddress, data.selfPickCode].join("、");
              } else if (data.sendType == 2) {
                return [
                  data.receiveName,
                  data.receiveMobile,
                  data.receiveAddress
                ].join("、");
              }
            },
            width: "100px"
          },
          {
            index: "",
            label: "下单人",
            custom: function(value, data) {
              return `${data.name}<br />
                    ${data.mobile}`;
            },
            width: "100px"
          },
          {
            index: ["payAmount", "countAmount"],
            label: "实付金额（积分）",
            custom: function(value) {
              return value.join("/");
            },
            width: "50px"
          },
          {
            index: "",
            label: "优惠信息",
            custom: function(value, data) {
              return `<span>满减优惠：${data.promotionSubtractAmount}元</span><br />
                    <span>优惠券金额：${data.couponSubtractAmount}元</span>`;
            },
            width: "100px"
          },
          {
            index: "productItem",
            label: "商品明细",
            width: "100px"
          },
          {
            index: "statusStr",
            label: "状态",
            width: "50px"
          },
          {
            index: "departmentName",
            label: "部门名称",
            width: "50px"
          },
          {
            index: "createTimeStr",
            label: "创建时间",
            width: "50px"
          }
        ]
      }
    };
  },
  computed: {
    isPlatForm() {
      let route = this.$route.path;
      return route.indexOf("platform") > -1;
    }
  },
  activated() {
    this.listQuery.type = this.type;
    this.getList();
  },
  methods: {
    mergeQuery() {
      for (let index in this.search) {
        let item = this.search[index];
        this.listQuery[index] = item;
      }
    },
    searchList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    getList() {
      this.mergeQuery();
      this.loading = true;
      let listQuery = { ...this.listQuery };
      if (this.status == 66 && !listQuery.status) {
        listQuery.status = 66;
      }
      if (this.isPlatForm) {
        orderPageQueryBuyGuard(listQuery)
          .then(res => {
            this.loading = false;
            this.list = res.result.list;
            this.total = res.result.totalCount;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        orderPageQuery(listQuery)
          .then(res => {
            this.loading = false;
            this.list = res.result.list;
            this.total = res.result.totalCount;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    reloadList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    sendHandler(row) {
      this.sendForm.id = row.id;
      this.sendForm.logisticsCompany = "";
      this.sendForm.logisticsNo = "";
      if (row.sendType == 2) {
        //配送
        this.$refs.sendDialog.open();
      } else {
        this.Confirm("是否确认接单？").then(() => {
          this.sendApi();
        });
      }
    },
    sendConfirm() {
      this.$validate("sendform").then(() => {
        this.sendApi();
      });
    },
    sendApi() {
      orderSend(this.sendForm).then(res => {
        this.$refs.sendDialog.close();
        this.Notify("开始配送！");
        this.getList();
      });
    },
    backHandler(row, bol) {
      this.Confirm(bol ? "确认退款？" : "是否继续拒绝退款？").then(() => {
        if (bol) {
          orderRefund({
            orderId: row.id
          }).then(() => {
            this.Notify("退款成功！");
            this.getList();
          });
        } else {
          orderRefundRefuse({
            orderId: row.id
          }).then(() => {
            this.Notify("拒绝成功！");
            this.getList();
          });
        }
      });
    },
    dealHandler(row) {
      orderGet({ id: row.id }).then(res => {
        this.orderInfo = res.result;
        this.dialogVisible = true;
      });
    },
    logisticsHandler(row) {
      this.logisticsVisible = true;
      this.logisticsList = [];
      viewLogistics({
        id: row.id
      }).then(res => {
        this.logisticsList = res.result;
      });
    },
    checkBoxAble(row, index) {
      if (row.status == 2 || row.status == 26) {
        return true;
      } else {
        return false;
      }
    },
    // 确认收货
    confirmReceive(row) {
      this.Confirm("是否确认收货？").then(() => {
        orderReceive({ id: row.id }).then(res => {
          this.getList();
        });
      });
    },
    selectChange(selection) {
      this.selectList = selection;
    },
    print() {
      this.$refs.print.print();
    },
    exportHandler() {
      if (this.isPlatForm) {
        daochuBuyGuard(this.listQuery).then(res => {
          this.Notify("导出成功！");
          window.open(res.result, "_blank");
        });
      } else {
        orderDaochu(this.listQuery).then(res => {
          this.Notify("导出成功！");
          window.open(res.result, "_blank");
        });
      }
    }
  }
};
</script>

<style lang="scss">
.logistics {
  height: 350px;
  overflow-y: auto;
  padding: 0 20px;
  li {
    padding: 10px 0;
    border-bottom: 1px solid #ebebeb;
  }
  .time {
    margin-bottom: 5px;
  }
  .content {
    font-size: 14px;
  }
  li.active p {
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped>
.order-header {
  padding: 15px 10px;
  border-bottom: 1px solid #ebebeb;
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    li {
      margin-right: 70px;
    }
  }
  & > div:last-child {
    margin-bottom: 0;
  }
}

.order-main {
  padding: 15px 10px;
  border-bottom: 1px solid #ebebeb;
  li {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.order-footer {
  padding: 20px 10px;
  & > p {
    font-size: 14px;
    color: #303133;
    font-weight: bold;
  }
  & > .item-bg {
    display: flex;
    flex-wrap: wrap;
  }
  .items {
    width: calc(50% - 10px);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 15px;
    margin-top: 10px;
    background: #f7f7f7;
    &:nth-of-type(2n-1) {
      margin-right: 20px;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 2px;
      margin-right: 10px;
    }
    .info {
      .name {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .price {
        color: #888888;
        font-size: 12px;
      }
    }
  }
}
</style>