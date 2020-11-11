<template>
  <div class="business">
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create" type="primary" @click="addHandler()">新增</el-button>
        <el-button v-if="handler.daoru" @click="importHandler()">批量导入</el-button>
        <el-button v-if="handler.freeze" @click="moreFreeze(1)">批量上架</el-button>
        <el-button v-if="handler.freeze" @click="moreFreeze(0)">批量下架</el-button>
      </template>
      <template slot="search">
        <li>
          <span>商品类别：</span>
          <div>
            <el-select v-model="search.categoryId" filterable clearable>
              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </li>
        <li>
          <span>商品名称：</span>
          <div>
            <el-input v-model="search.name"></el-input>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="searchList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <!-- tab -->
      <el-tabs v-model="tabActive" type="border-card">
        <el-tab-pane label="普通" name="1" v-if="power.isProduct">
          <ProTable ref="proTable_1" type="1" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>
        <!-- <el-tab-pane label="团购" name="2" v-if="power.isTeam">
          <ProTable ref="proTable_2" type="2" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>-->
        <el-tab-pane label="积分" name="3" v-if="power.isIntegral">
          <ProTable ref="proTable_3" type="3" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>
      </el-tabs>
      <!-- table -->
    </div>

    <!-- 导入 -->
    <Import
      ref="import"
      downloadUrl="http://static.huafcy.com/f4909776ce918ad11df9d77d3121c768.xls"
      importUrl="/web/product/daoru"
      :type="tabActive"
      :merchantId="true"
      @success="importSuccess"
    />
  </div>
</template>

<script>
import ProTable from "./ProTable";
import Import from "@/components/Import";
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import { getUserInfo } from "@/axios/member";
import { categoryPageQuery, plfreeze } from "@/axios/goods";

export default {
  mixins: [form, handler],
  components: {
    ProTable,
    Import
  },
  data() {
    return {
      form: {},
      tabActive: "",
      name: {
        1: "普通",
        2: "团购",
        3: "积分"
      },
      search: {
        name: "",
        categoryId: ""
      },
      power: {
        isProduct: 0,
        isTeam: 0,
        isIntegral: 0
      },
      categoryList: []
    };
  },
  watch: {
    $route: function(val, old) {
      // 解决keep 对每个不同商家商品页面查询数据的缓存
      if (val.path == "/merchant/business") {
        for (let index in this.search) {
          this.search[index] = "";
        }
      }
    }
  },
  activated() {
    this.getMemberInfo();
    this.getCategory();
  },
  methods: {
    //批量冻结
    moreFreeze(status) {
      let tabActive = this.tabActive;
      let list = this.$refs["proTable_" + tabActive].selectList;
      if (list.length == 0) {
        this.$message.warning("请选择有效商品");
        return;
      } else {
        let ids = list
          .map(item => {
            return item.id;
          })
          .join(",");
        this.Confirm("是否继续批量操作？").then(() => {
          plfreeze({ ids,status }).then(res => {
            this.Notify("批量操作成功！");
            this.$refs["proTable_" + tabActive].getList();
          });
        });
      }
    },
    getMemberInfo() {
      let merchantId = this.$store.state.merchantId;
      if (merchantId) {
        getUserInfo({ merchantId }).then(res => {
          this.$store.commit("Set_MerchantInfo", res.result);
          this.power = res.result;
          this.resetTabActive();
        });
      } else {
        this.power = this.$store.state.userInfo;
        this.resetTabActive();
      }
    },
    getCategory() {
      categoryPageQuery({
        pageNo: 1,
        pageSize: 9999
      }).then(res => {
        this.categoryList = res.result.list;
      });
    },
    resetTabActive() {
      if (this.tabActive > 0) return;
      //开发
      // this.power.isProduct = true
      // this.power.isTeam = true
      // this.power.isIntegral = true
      //开发
      if (this.power.isProduct) {
        this.tabActive = "1";
      } else if (this.power.isTeam) {
        this.tabActive = "2";
      } else if (this.power.isIntegral) {
        this.tabActive = "3";
      } else {
        this.tabActive = "";
      }
    },
    searchList() {
      this.$refs["proTable_" + this.tabActive].searchList();
    },
    getList() {
      this.$refs["proTable_" + this.tabActive].getList();
    },
    importSuccess(type) {
      //导入成功后，根据Type来让指定列表组件 从头获取数据
      this.$refs["proTable_" + type].reloadList();
    },
    // operate
    addHandler() {
      this.$router.push({
        path: "product/proInfo",
        query: { type: this.tabActive }
      });
    },
    updateHandler(row) {
      this.$router.push({
        path: "product/proInfo",
        query: { type: this.tabActive, id: row.id }
      });
    },
    deleteHandler() {
      this.Confirm("是否继续删除？").then(() => {
        console.log("开始删除");
      });
    },
    importHandler() {
      this.$refs["import"].open();
    },
    //
    confirm() {}
  }
};
</script>

<style>
</style>