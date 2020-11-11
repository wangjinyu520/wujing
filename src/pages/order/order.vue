<template>
  <div class="order">
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.verification" @click="writeoffHandler()">扫码核销</el-button>
        <el-button v-if="handler.verification" @click="printHandler()">打印</el-button>
        <el-button v-if="handler.daochu" @click="exportHandler()">导出</el-button>
        <el-button type="primary" v-if="handler.send" @click="moreOrderHandler()">批量配送/接单</el-button>
      </template>
      <template slot="search">
        <li>
          <span>订单编号：</span>
          <div>
            <el-input v-model="search.identifier" clearable></el-input>
          </div>
        </li>
        <li>
          <span>下单人姓名：</span>
          <div>
            <el-input v-model="search.name" clearable></el-input>
          </div>
        </li>
        <li>
          <span>下单人手机号：</span>
          <div>
            <el-input v-model="search.mobile" clearable></el-input>
          </div>
        </li>
        <li v-if="isPlatForm">
          <span>商户名称：</span>
          <div>
            <el-input v-model="search.merchantName" clearable></el-input>
          </div>
        </li>

        <li>
          <span>商品明细：</span>
          <div>
            <el-input v-model="search.productItem" clearable></el-input>
          </div>
        </li>
        <li>
          <span>状态：</span>
          <div>
            <el-select v-model="search.status" clearable>
              <template v-if="status != 66">
                <el-option
                  v-for="(item, index) in orderStatus"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </template>
              <template v-else>
                <el-option
                  v-show="item.value == 6 || item.value == 7"
                  v-for="(item, index) in orderStatus"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </template>
            </el-select>
          </div>
        </li>
        <li style="width: 400px">
          <span>日期：</span>
          <div>
            <DatePicker
              :datetimerange="true"
              :startDate.sync="search.startDate"
              :endDate.sync="search.endDate"
            />
          </div>
        </li>
        <li style="width: 300px">
          <span>部门名称：</span>
          <div>
            <DepartmentSelect v-model="search.departmentName" />
          </div>
        </li>
        <li style="width: 400px">
          <span>自定义部门名称：</span>
          <div>
            <DepartmentSelect :custom="true" v-model="search.superDepartmentName" />
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
        <el-tab-pane label="普通订单" name="1">
          <Table ref="Table_1" type="1" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>
        <!-- <el-tab-pane label="团购订单" name="2">
          <Table ref="Table_2" type="2" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>-->
        <el-tab-pane label="积分订单" name="3">
          <Table ref="Table_3" type="3" :search="search" @updateHandler="updateHandler" />
        </el-tab-pane>
      </el-tabs>
      <!-- table -->
    </div>

    <!-- form -->
    <el-dialog :visible.sync="dialogVisible" title="核销" width="380px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="codeName[codeType] + '：'" prop="selfPickCode">
          <el-input ref="autoInput" v-if="dialogVisible" v-model="form.selfPickCode"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Table from "./Table";
import form from "@/mixin/form";
import util from "@/mixin/util";
import moment from "moment";
import handler from "@/mixin/handler";
import { orderVerification, batchSend, orderReceive } from "@/axios/order";

export default {
  inject: {
    status: {
      default: ""
    }
  },
  mixins: [form, util, handler],
  components: {
    Table
  },
  computed: {
    isPlatForm() {
      let route = this.$route.path;
      return route.indexOf("platform") > -1;
    }
  },
  data() {
    return {
      form: { selfPickCode: "" },
      tabActive: "1",
      search: {
        productItem: "",
        merchantName: "",
        identifier: "",
        status: "",
        startDate: "",
        endDate: "",
        departmentName: "",
        superDepartmentName: "",
        name: "",
        mobile: ""
      },
      name: {
        1: "外部商家",
        2: "档口",
        3: "快餐厅"
      },
      listening: false,
      codeType: 1,
      codeName: {
        1: "核销码",
        2: "收款码"
      },
      rules: {
        selfPickCode: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.form = { selfPickCode: "" };
        this.$refs.form.clearValidate();
      }
    }
  },
  methods: {
    searchHandler() {
      this.$refs["busTable_" + this.tabActive].getList();
    },
    getList() {
      this.$refs["Table_" + this.tabActive].getList();
    },
    searchList() {
      this.$refs["Table_" + this.tabActive].searchList();
    },
    // operate
    addHandler() {
      this.formType = "add";
      this.$refs["dialog"].open();
    },
    updateHandler(row) {
      this.formType = "update";
      this.$refs["dialog"].open();
    },
    deleteHandler() {
      this.Confirm("是否继续删除？").then(() => {
        console.log("开始删除");
      });
    },
    //扫码核销
    writeoffHandler() {
      this.codeType = 1;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.autoInput.focus();
      });
    },
    //打印
    printHandler() {
      this.$refs["Table_" + this.tabActive].print();
    },
    confirm() {
      this.$validate("form").then(() => {
        this.writeoffApi();
      });
    },
    writeoffApi() {
      orderVerification({
        selfPickCode: this.form.selfPickCode
      }).then(res => {
        this.dialogVisible = false;
        this.Notify("核销成功");
        this.getList();
      });
    },
    exportHandler() {
      this.$refs["Table_" + this.tabActive].exportHandler();
    },
    //批量接单
    moreOrderHandler() {
      let tabActive = this.tabActive;
      let list = this.$refs["Table_" + tabActive].selectList;
      if (list.length == 0) {
        this.$message.warning("请选择有效订单");
        return;
      } else {
        let ids = list
          .map(item => {
            return item.id;
          })
          .join(",");
        this.Confirm("是否继续批量操作？").then(() => {
          batchSend({ ids }).then(res => {
            this.Notify("批量配送/接单成功！");
            this.$refs["Table_" + tabActive].getList();
          });
        });
      }
    }
  }
};
</script>

<style>
</style>