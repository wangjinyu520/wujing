<template>
  <div v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
    <!-- 外部内部商家 -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" type="index"></el-table-column>
      <el-table-column prop="sequence" label="排序"></el-table-column>
      <el-table-column prop="identifier" label="商户编号" width="85"></el-table-column>
      <el-table-column prop="image" label="店铺图" width="120">
        <template slot-scope="scope">
          <img style="width: 100px;" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商家名称"></el-table-column>
      <el-table-column prop="isSelf" label="是否自营" width="90">
        <template slot-scope="scope">{{ scope.row.isSelf ? '是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="memberGroupConfig" label="服务群体" width="90">
        <template slot-scope="scope">{{ scope.row.memberGroupConfig==0 ? '部分':'全部'}}</template>
      </el-table-column>
      <el-table-column prop label="商家分类">
        <template slot-scope="scope">{{ merchantTypesFormat(scope.row.category) }}</template>
      </el-table-column>

      <el-table-column prop="canteenName" label="归属餐厅"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop label="营业时间" width="139">
        <template slot-scope="scope">
          <span>{{jsonParseWeek(scope.row.businessWeek)}}</span>
          <br />
          <span>{{jsonParseTime(scope.row.businessTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="商家地址"></el-table-column>
      <el-table-column prop="username" label="登录账号"></el-table-column>
      <el-table-column label="配送费">
        <template slot-scope="scope">
          <span>配送费{{scope.row.sendAmount}}，满{{scope.row.sendFreeAmount}}免配送费</span>
        </template>
      </el-table-column>
      <el-table-column prop="qrCode" label="收款二维码" width="120">
        <template slot-scope="scope">
          <img
            @click="showQrcode(scope.row.qrCode)"
            style="width: 100px;max-height: 100px;cursor: pointer;"
            :src="scope.row.qrCode"
            alt
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="isAutoTake" label="是否自动接单" v-if="type == 2" width="100">
        <template slot-scope="scope">
          <el-switch
            :disabled="!handler.freeze"
            v-model="scope.row.isAutoTake"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row, 2)"
          >
          </el-switch>
          {{ scope.row.isAutoTake ? '是' : '否' }}
        </template>
      </el-table-column>-->
      <el-table-column prop="isPartner" label="是否收取搭伙费" v-if="type == 2" width="130">
        <template slot-scope="scope">{{ scope.row.isPartner ? '是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="isCardPay" label="是否开启一卡通支付" v-if="type == 2" width="135">
        <template slot-scope="scope">{{ scope.row.isCardPay ? '是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90">
        <template slot-scope="scope">
          <el-switch
            :disabled="!handler.freeze"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row)"
          ></el-switch>
          <!-- {{ scope.row.status == 1 ? '有效' : '无效' }} -->
        </template>
      </el-table-column>
      <el-table-column prop label="操作" width="400">
        <template slot-scope="scope">
          <div class="more-btn">
            <el-button
              v-if="handler.product"
              type="primary"
              @click="goProductHandler(scope.row)"
            >商品管理</el-button>
            <el-button
              v-if="handler.category"
              type="primary"
              @click="goCategoryHandler(scope.row)"
            >分类管理</el-button>
            <el-button
              v-if="handler.activity"
              type="primary"
              @click="goCouponHandler(scope.row)"
            >优惠卷管理</el-button>
            <el-button
              v-if="handler.promotion"
              type="primary"
              @click="goPromotionHandler(scope.row)"
            >促销管理</el-button>
            <el-button v-if="handler.order" type="primary" @click="goOrderHandler(scope.row)">订单管理</el-button>
            <el-button
              v-if="handler.wallet"
              type="primary"
              @click="goFinanceHandler(scope.row)"
            >财务结算</el-button>
            <el-button
              v-if="scope.row.memberGroupConfig==0"
              type="primary"
              @click="goPeople(scope.row)"
            >服务群体</el-button>
            <!-- <el-button
              v-if="handler.pruchase"
              type="primary"
              @click="goPurchaseHandler(scope.row)"
            >采购管理</el-button>-->
            <el-button type="primary" v-if="handler.update" @click="updateHandler(scope.row)">编辑</el-button>
            <el-button @click="settleAccountHandler(scope.row)">结算核销</el-button>
            <!-- <el-button @click="deleteHandler(scope.row)">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :pageNo.sync="listQuery.pageNo"
      :pageSize.sync="listQuery.pageSize"
      :total="total"
      @change="getList()"
    />

    <el-dialog class="table-dialog" title="收款二维码" :visible.sync="dialogVisible" width="400px">
      <img :src="qrCode" alt style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import {
  memberCreate,
  memberFreeze,
  memberPageQuery,
  canteenCreate,
  canteenUpdate,
  canteenDelete,
  canteenGet,
} from "@/axios/member";
import util from "@/mixin/util";
import handler from "@/mixin/handler";

export default {
  mixins: [util, handler],
  props: ["type", "search", "canteens"],
  data() {
    return {
      list: [],
      loading: false,
      listQuery: {
        source: "",
        name: "",
        type: 1,
        pageNo: 1,
        pageSize: 20,
      },
      total: 0,
      qrCode: "",
      dialogVisible: false,
    };
  },
  activated() {
    if (this.type == 1) {
      this.listQuery.source = 2;
    } else if (this.type == 2) {
      this.listQuery.source = 1;
    }
    this.getList();
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler(val) {
        this.listQuery.name = val.name;
      },
    },
  },
  methods: {
    searchList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      memberPageQuery(this.listQuery)
        .then((res) => {
          this.list = res.result.list;
          this.total = res.result.totalCount;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getCanteenName(id) {
      let find = this.canteens.find((item) => item.id == id);
      if (find) {
        return find.name;
      } else {
        return "";
      }
    },
    updateHandler(row) {
      this.$emit("updateHandler", row);
    },
    deleteHandler(row) {
      this.Confirm("是否继续删除？").then(() => {
        console.log("delete");
      });
    },
    settleAccountHandler(row) {
      this.$emit("settleAccountHandler", row);
    },
    statusChange(row, type) {
      memberFreeze({ id: row.id, type })
        .then(() => {})
        .catch(() => {
          if (row.status == 1) {
            row.status = 0;
          } else {
            row.status = 1;
          }
        });
    },
    showQrcode(url) {
      this.qrCode = url;
      this.dialogVisible = true;
    },
    goCategoryHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/category",
      });
    },
    goProductHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/product",
      });
    },
    goOrderHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/order",
      });
    },
    goCouponHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/coupon",
      });
    },
    goPromotionHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/promotion",
      });
    },
    goFinanceHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/finance",
      });
    },
    goPeople(row){
       this.$store.commit("Set_MerchantId", row.id);
        this.$router.push({
        path: "/merchant/serviceMember",
      });

    },
    goPurchaseHandler(row) {
      this.$store.commit("Set_MerchantId", row.id);
      this.$router.push({
        path: "/merchant/foodcategory",
      });
    },
    reloadList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    jsonParseWeek(val) {
      if (val) {
        let weeks = [];
        let data = JSON.parse(val);
        for (let index in data) {
          let item = data[index];
          if (item == 1) {
            weeks.push(index);
          }
        }
        return weeks.join("、");
      } else {
        return "";
      }
    },
    jsonParseTime(val) {
      if (val) {
        let times = [];
        let data = JSON.parse(val);
        for (let item of data) {
          let timeConcat = item.startTime + "~" + item.endTime;
          times.push(timeConcat);
        }
        return times.join("、");
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
</style>