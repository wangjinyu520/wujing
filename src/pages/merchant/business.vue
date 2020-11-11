<template>
  <div class="business">
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create&&tabActive != 4" type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>{{ name[tabActive] }}：</span>
          <div>
            <el-input v-model="search.name"></el-input>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="searchHandler()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <!-- tab -->
      <el-tabs v-model="tabActive" type="border-card">
        <el-tab-pane label="生活商家" name="1">
          <BusTable
            ref="busTable_1"
            type="1"
            :tabActive="tabActive"
            :search="search"
            @updateHandler="updateHandler"
            @settleAccountHandler="settleAccountHandler"
            :canteens="canteens"
          />
        </el-tab-pane>
        <el-tab-pane label="内部商家" name="2">
          <BusTable
            ref="busTable_2"
            type="2"
            :search="search"
            :tabActive="tabActive"
            @updateHandler="updateHandler"
            @settleAccountHandler="settleAccountHandler"
            :canteens="canteens"
          />
        </el-tab-pane>
        <el-tab-pane label="餐厅" name="3">
          <Restaurant
            ref="busTable_3"
            type="3"
            :tabActive="tabActive"
            :search="search"
            @updateHandler="updateHandler"
          />
        </el-tab-pane>
        <!-- <el-tab-pane label="生活商家" name="4">
          <LifeTable
            ref="busTable_4"
            type="4"
            :tabActive="tabActive"
            :search="search"
            @updateHandler="updateHandler"
          />
        </el-tab-pane>-->
      </el-tabs>
      <!-- table -->
    </div>

    <Dialog
      ref="dialog"
      :type="formType"
      :title="name[tabActive]"
      :width="tabActive != 3 ? '540px' : '460px'"
    >
      <!-- 商家form -->
      <el-form
        v-if="tabActive == 2 ||tabActive == 1 "
        slot="main"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="125px"
      >
        <el-form-item label="排序：" prop="sequence">
          <NumInput v-model="form.sequence"></NumInput>
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>
        <el-form-item label="商户编号：" prop="identifier">
          <el-input v-model="form.identifier"></el-input>
        </el-form-item>
        <el-form-item label="商家名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="下单时间：" prop="timeRange">
          <div class="weeks">
            <li
              v-for="item in weeks"
              :key="item.id"
              :class="{ active: activeWeeks.find(data => data.id == item.id) }"
              @click="weekClick(item)"
            >{{ item.name }}</li>
          </div>
          <div class="times">
            <div v-for="(item, index) in timesList" :key="index">
              <el-time-select
                placeholder="起始时间"
                v-model="item.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30'
                }"
              ></el-time-select>
              <span style="padding: 0 10px">至</span>
              <el-time-select
                placeholder="结束时间"
                v-model="item.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30'
                }"
              ></el-time-select>
              <span class="times-delete" v-if="timesList.length > 1" @click="timeDel(index)">删除</span>
            </div>
            <el-button @click="timesList.push({ ...defaultTime })">添加时间段</el-button>
          </div>
        </el-form-item>

        <el-form-item label="店铺地址：" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item label="联系电话：" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item label="账号：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" placeholder="默认123456"></el-input>
        </el-form-item>

        <el-form-item label="店铺图：">
          <Upload mode="1" :defaultImage.sync="form.image" tip="图片建议尺寸为240*147" />
        </el-form-item>

        <el-form-item label="店铺简介：" prop>
          <el-input v-model="form.description" type="textarea" :rows="4" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="是否自营：" prop>
          <el-radio-group v-model="form.isSelf">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务群体：" prop>
          <el-radio-group v-model="form.memberGroupConfig">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="0">部分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商家分类：" class="is-required">
          <el-radio-group v-model="form.category" :class="tabActive != 2 ? 'too-much' : ''">
            <el-radio
              v-for="(item, index) in categoryListInfo"
              :key="index"
              :label="item.category"
              v-show="(item.category == 1 && tabActive == 2) || (item.category != 1 && tabActive == 1)"
            >{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="归属餐厅：" prop="canteenId" v-if="tabActive == 2">
          <el-select v-model="form.canteenId">
            <el-option
              v-for="(item, index) in canteens"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="添加商品权限：" prop="power">
          <div class="add-power">
            <li>
              <el-checkbox :true-label="1" :false-label="0" v-model="form.isProduct">普通商品</el-checkbox>
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="form.isProductInner"
                :disabled="!form.isProduct"
              >堂食</el-checkbox>
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="form.isProductOutter"
                :disabled="!form.isProduct"
              >外卖</el-checkbox>
            </li>
            <li>
              <el-checkbox :true-label="1" :false-label="0" v-model="form.isIntegral">积分</el-checkbox>
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="form.isIntegralInner"
                :disabled="!form.isIntegral"
              >到店</el-checkbox>
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="form.isIntegralOutter"
                :disabled="!form.isIntegral"
              >快递</el-checkbox>
            </li>
          </div>
        </el-form-item>

        <!-- <el-form-item label="是否自动接单：" prop="isAutoTake" v-if="tabActive == 2">
          <el-radio-group v-model="form.isAutoTake">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>-->

        <el-form-item label="是否收取搭伙费：" prop="isPartner" v-if="tabActive == 2">
          <el-radio-group v-model="form.isPartner">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="开启一卡通支付：" prop="isCardPay" v-if="tabActive == 2">
          <el-radio-group v-model="form.isCardPay">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="关联卡类型："
          prop="cardTypeJson"
          v-if="tabActive == 2 && form.isCardPay == 1"
        >
          <div class="weeks cards">
            <li
              v-for="item in cardTypes"
              :key="item.id"
              :class="{ active: activeCards.find(data => data.id == item.id) }"
              @click="cardClick(item)"
            >{{ item.name }}</li>
          </div>
        </el-form-item>
        <el-form-item label="配送费：" prop="sendAmount">
          <NumInput float="4" v-model="form.sendAmount">
            <span slot="append">元</span>
          </NumInput>
        </el-form-item>
        <el-form-item label="减配送费满" prop="sendFreeAmount">
          <NumInput float="2" v-model="form.sendFreeAmount">
            <span slot="append">元免配送费</span>
          </NumInput>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <!-- 餐厅form -->
      <el-form
        v-if="tabActive == 3"
        slot="main"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="序号：" prop="sequence">
          <NumInput v-model="form.sequence"></NumInput>
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>
        <el-form-item label="编号：" prop="identifier">
          <el-input v-model="form.identifier"></el-input>
        </el-form-item>
        <el-form-item label="餐厅名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="image">
          <Upload :defaultImage.sync="form.image" />
        </el-form-item>
        <el-form-item label="是否开放档口：" prop="isOpen">
          <el-radio-group v-model="form.isOpen">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否开放摄像头：" prop="isCamera">
          <el-radio-group v-model="form.isCamera">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="直播地址：" prop="liveUrl" v-if="form.isCamera == 1">
          <el-input v-model="form.liveUrl"></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop>
          <el-input type="textarea" :rows="5" resize="none" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 生活form -->
      <el-form
        v-if="tabActive == 4"
        slot="main"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="属性值：" prop="category">
          <el-input v-model="form.category" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户端序号：" prop="sequence">
          <NumInput v-model="form.sequence"></NumInput>
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>
        <el-form-item label="客户端状态：" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>

    <!-- 结算核销 -->
    <!-- form -->
    <Dialog ref="settleDialog" type="normal" title="结算核销" width="400px">
      <el-form slot="main" ref="settleform" :model="settleForm" :rules="rules" label-width="81px">
        <el-form-item label="待结算：">
          <el-input readonly disabled :value="settleForm.ableAmount"></el-input>
        </el-form-item>
        <el-form-item label="结算金额：" prop="amount">
          <NumInput v-model="settleForm.amount" :max="settleForm.ableAmount"></NumInput>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" resize="none" :rows="4" v-model="settleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <load-button type="primary" @click="settleConfirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import BusTable from "./BusTable";
import Restaurant from "./Restaurant";
import LifeTable from "./lifeTable";
import form from "@/mixin/form";
import util from "@/mixin/util";
import handler from "@/mixin/handler";
import { settleAccount, categoryQuery } from "@/axios/wallet";
import {
  memberCreate,
  memberUpdate,
  canteenCreate,
  canteenUpdate,
  canteenQuery,
  merchantDelete,
  merchantPageQuery,
  merchantGet,
  merchantUpdate,
} from "@/axios/member";

let defaultForm = {
  id: 0,
  identifier: "",
  name: "",
  username: "",
  roleId: 0,
  departmentId: 0,
  address: "",
  category: 1,
  description: "",
  isAutoTake: 1,
  isIntegral: 0,
  isIntegralInner: 0,
  isIntegralOutter: 0,
  isTeam: 0,
  isTeamInner: 0,
  isTeamOutter: 0,
  isProduct: 0,
  isProductInner: 0,
  isProductOutter: 0,
  isSelf: 0,
  memberGroupConfig:1,
  source: "",
  status: 1,
  mobile: "",
  password: "",
  image: "",
  type: 1,
  startTime: "",
  endTime: "",
  sequence: 0,
  businessWeek: "",
  businessTime: "",
  canteenId: "",
  isPartner: 1,
  isCardPay: 1,
  sendAmount: "",
  sendFreeAmount: "",
};
const defaultFormRes = {
  identifier: "",
  name: "",
  liveUrl: "",
  remark: "",
  sequence: 0,
  isOpen: 1,
  isCamera: 1,
};
const defaultSettleForm = {
  merchantId: "",
  ableAmount: 0,
  amount: "",
  remark: "",
};
const defaultLifeForm = {
  name: "",
  category: 1,
  status: 0,
  sequence: 0,
};
export default {
  mixins: [form, util, handler],
  components: {
    BusTable,
    Restaurant,
    LifeTable,
  },
  data() {
    const timeValidator = (rule, val, callback) => {
      if (this.activeWeeks.length == 0) {
        callback(new Error("请完整选择下单时间"));
        return;
      }
      let findNoData = this.timesList.find((item) => {
        return !item.startTime || !item.endTime;
      });
      if (this.timesList.length == 0 || findNoData) {
        callback(new Error("请完整选择下单时间"));
        return;
      }
      callback();
    };
    const powerValidator = (rule, val, callback) => {
      if (
        !this.form.isIntegral &&
        !this.form.isIntegralInner &&
        !this.form.isIntegralOutter &&
        !this.form.isTeam &&
        !this.form.isTeamInner &&
        !this.form.isTeamOutter &&
        !this.form.isProduct &&
        !this.form.isProductInner &&
        !this.form.isProductOutter
      ) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    const cardsValidator = (rule, val, callback) => {
      if (this.activeCards.length == 0) {
        callback(new Error("请选择关联卡类型"));
      } else {
        callback();
      }
    };
    return {
      categoryListInfo: [],
      form: { ...defaultForm },
      settleForm: { ...defaultSettleForm },
      radio: "1",
      tabActive: "1",
      search: {
        name: "",
      },
      name: {
        1: "外部商家",
        2: "内部商家",
        3: "餐厅",
        4: "生活商家",
      },
      rules: {
        identifier: [{ required: true, message: "请填写", trigger: "blur" }],
        isAutoTake: [{ required: true, message: "请选择", trigger: "blur" }],
        sequence: [{ required: true, message: "请填写", trigger: "blur" }],
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        mobile: [{ required: true, message: "请填写", trigger: "blur" }],
        username: [{ required: true, message: "请填写", trigger: "blur" }],
        power: [{ required: true, validator: powerValidator, trigger: "blur" }],
        timeRange: [
          { required: true, validator: timeValidator, trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传", trigger: "blur" }],
        status: [{ required: true, message: "请选择", trigger: "blur" }],
        canteenId: [{ required: true, message: "请选择", trigger: "blur" }],
        liveUrl: [{ required: true, message: "请填写", trigger: "blur" }],
        isOpen: [{ required: true, message: "请选择", trigger: "blur" }],
        isCamera: [{ required: true, message: "请选择", trigger: "blur" }],
        isPartner: [{ required: true, message: "请选择", trigger: "blur" }],
        isCardPay: [{ required: true, message: "请选择", trigger: "blur" }],
        cardTypeJson: [
          { required: true, validator: cardsValidator, trigger: "blur" },
        ],
        amount: [{ required: true, message: "请填写", trigger: "blur" }],
        sendFreeAmount: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        sendAmount: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      weeks: [
        { id: 1, name: "周一" },
        { id: 2, name: "周二" },
        { id: 3, name: "周三" },
        { id: 4, name: "周四" },
        { id: 5, name: "周五" },
        { id: 6, name: "周六" },
        { id: 7, name: "周日" },
      ],
      activeWeeks: [], //选中的week
      cardTypes: [
        { id: 1, name: "编内卡" },
        { id: 2, name: "编外卡" },
        { id: 3, name: "编外卡30" },
        { id: 4, name: "编外卡50" },
        { id: 5, name: "编外卡(院外)" },
        { id: 6, name: "编外卡30(院外)" },
        { id: 7, name: "编外卡50(院外)" },
        { id: 8, name: "社会卡" },
        { id: 9, name: "编外卡30免" },
        { id: 10, name: "编外卡50免" },
        { id: 11, name: "编外卡30(院外)免" },
        { id: 12, name: "编外卡50(院外)免" },
        { id: 13, name: "市机关食堂社会卡" },
        { id: 14, name: "公卡" },
      ],
      activeCards: [],
      timesList: [],
      defaultTime: {
        startTime: "",
        endTime: "",
      },
      canteens: [], //餐厅 食堂下拉列表
    };
  },
  watch: {
    tabActive: {
      immediate: true,
      handler(val) {
        if (val == 1) {
          defaultForm.category = 2;
        } else if (val == 2) {
          defaultForm.category = 1;
        } else if (val == 4) {
          console.log(val);
          this.form.category = "";
        }
      },
    },
    //
    "form.isProduct": function (val) {
      if (
        this.form.isProduct &&
        !this.form.isProductInner &&
        !this.form.isProductOutter
      ) {
        this.form.isProductInner = 1;
        this.form.isProductOutter = 1;
      }
      if (!this.form.isProduct) {
        this.form.isProductInner = 0;
        this.form.isProductOutter = 0;
      }
    },
    "form.isProductInner": function (val) {
      if (!this.form.isProductInner && !this.form.isProductOutter) {
        this.form.isProduct = 0;
      }
    },
    "form.isProductOutter": function (val) {
      if (!this.form.isProductInner && !this.form.isProductOutter) {
        this.form.isProduct = 0;
      }
    },
    //
    "form.isTeam": function (val) {
      if (
        this.form.isTeam &&
        !this.form.isTeamInner &&
        !this.form.isTeamOutter
      ) {
        this.form.isTeamInner = 1;
        this.form.isTeamOutter = 1;
      }
      if (!this.form.isTeam) {
        this.form.isTeamInner = 0;
        this.form.isTeamOutter = 0;
      }
    },
    "form.isTeamInner": function (val) {
      if (!this.form.isTeamInner && !this.form.isTeamOutter) {
        this.form.isTeam = 0;
      }
    },
    "form.isTeamOutter": function (val) {
      if (!this.form.isTeamInner && !this.form.isTeamOutter) {
        this.form.isTeam = 0;
      }
    },
    //
    "form.isIntegral": function (val) {
      if (
        this.form.isIntegral &&
        !this.form.isIntegralInner &&
        !this.form.isIntegralOutter
      ) {
        this.form.isIntegralInner = 1;
        this.form.isIntegralOutter = 1;
      }
      if (!this.form.isIntegral) {
        this.form.isIntegralInner = 0;
        this.form.isIntegralOutter = 0;
      }
    },
    "form.isIntegralInner": function (val) {
      if (!this.form.isIntegralInner && !this.form.isIntegralOutter) {
        this.form.isIntegral = 0;
      }
    },
    "form.isIntegralOutter": function (val) {
      if (!this.form.isIntegralInner && !this.form.isIntegralOutter) {
        this.form.isIntegral = 0;
      }
    },
  },
  activated() {
    this.getCateen();
    this.getCategory();
  },
  methods: {
    getCategory() {
      categoryQuery().then((res) => {
        if (res.code == 0) {
          this.categoryListInfo = res.result;
        }
      });
    },
    getCateen() {
      canteenQuery({
        isOpen: 1,
        type: 1,
      }).then((res) => {
        this.canteens = res.result;
      });
    },
    searchHandler() {
      this.$refs["busTable_" + this.tabActive].searchList();
    },
    getSingleList(index) {
      this.$refs["busTable_" + index].getList();
    },
    // operate
    addHandler() {
      this.formType = "add";
      if (this.tabActive != 3) {
        this.clearWeekTime();
        this.clearCards();
        this.form = { ...defaultForm };
      } else if (this.tabActive == 3) {
        this.form = { ...defaultFormRes };
      } else if (this.tabActive == 4) {
        this.form = { ...defaultLifeForm };
      }
      this.$refs["dialog"].open();
    },
    settleAccountHandler(row) {
      this.settleForm = { ...defaultSettleForm };
      this.settleForm.ableAmount = Number(row.ableAmount);
      // this.settleForm.merchantId = row.id
      this.$store.commit("Set_MerchantId", row.id);
      this.$refs.settleDialog.open();
    },
    settleConfirm() {
      this.$validate("settleform").then(() => {
        let tabActive = this.tabActive;
        settleAccount(this.settleForm).then((res) => {
          this.Notify("核销成功！");
          this.$refs["busTable_" + tabActive].searchList();
          this.$refs.settleDialog.close();
        });
      });
    },
    clearCards() {
      this.activeCards = [];
    },
    clearWeekTime() {
      this.activeWeeks = [{ id: 1, name: "周一" }];
      this.timesList = [{ ...this.defaultTime }];
    },
    updateHandler(row) {
      this.form = {};
      this.$nextTick(() => {
        this.form = { ...row };
        this.rebackWeekTime(row);
        this.rebackCard(row);
        this.formType = "update";
        this.$refs["dialog"].open();
      });
    },
    rebackWeekTime(row) {
      this.clearWeekTime();
      let businessWeek = row.businessWeek ? JSON.parse(row.businessWeek) : {};
      let businessTime = row.businessTime ? JSON.parse(row.businessTime) : [];
      for (let weekIndex in businessWeek) {
        let id = 1;
        switch (weekIndex) {
          case "周一":
            id = 1;
            break;
          case "周二":
            id = 2;
            break;
          case "周三":
            id = 3;
            break;
          case "周四":
            id = 4;
            break;
          case "周五":
            id = 5;
            break;
          case "周六":
            id = 6;
            break;
          case "周日":
            id = 7;
            break;
        }
        let o = {
          id,
          name: weekIndex,
        };
        if (businessWeek[weekIndex] == 1) {
          this.activeWeeks.push(o);
        }
      }

      this.timesList = businessTime;
    },
    rebackCard(row) {
      this.clearCards();
      if (row.cardTypeJson) {
        this.activeCards = JSON.parse(row.cardTypeJson)
          .filter((item) => item.isCheck)
          .map((item) => {
            return {
              id: item.type,
              name: item.name,
            };
          });
      }
    },
    formatHour(val) {
      if (val) {
        if (val.split(":").length == 2) {
          val += ":00";
        }
      }
      return val;
    },
    //
    confirm() {
      let index = this.tabActive;
      if (this.tabActive == 1 || this.tabActive == 2) {
        if (this.tabActive == 1) {
          //内部
          this.form.source = 2;
        } else if (this.tabActive == 2) {
          //外部
          this.form.source = 1;
        }

        //
        let businessWeek = {
          周一: 0,
          周二: 0,
          周三: 0,
          周四: 0,
          周五: 0,
          周六: 0,
          周日: 0,
        };
        for (let week of this.activeWeeks) {
          let label = week.name;
          businessWeek[label] = 1;
        }
        this.form.businessWeek = JSON.stringify(businessWeek);

        let times = this.timesList.map((item) => {
          let o = {
            startTime: this.formatHour(item.startTime),
            endTime: this.formatHour(item.endTime),
          };
          return o;
        });
        this.form.businessTime = JSON.stringify(times);
        //cardTypeJson
        let cardTypeJson = "";
        cardTypeJson = this.cardTypes
          .map((item) => {
            let isCheck = false;
            let find = this.activeCards.find((card) => {
              return card.id == item.id;
            });
            if (find) {
              isCheck = true;
              return {
                type: item.id,
                name: item.name,
                isCheck: isCheck,
              };
            } else {
              return false;
            }
          })
          .filter((item) => item);
        this.form.cardTypeJson = JSON.stringify(cardTypeJson);
        //
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.formType == "add") {
              memberCreate(this.form).then((res) => {
                this.Notify("添加成功！");
                this.getSingleList(index);
                this.$refs["dialog"].close();
              });
            } else {
              memberUpdate(this.form).then((res) => {
                this.Notify("更新成功！");
                this.getSingleList(index);
                this.$refs["dialog"].close();
              });
            }
          }
        });
      } else if (this.tabActive == 3) {
        this.form.type = 1;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.formType == "add") {
              canteenCreate(this.form).then((res) => {
                this.Notify("添加成功！");
                this.getSingleList(index);
                this.$refs["dialog"].close();
              });
            } else {
              canteenUpdate(this.form).then((res) => {
                this.Notify("更新成功！");
                this.getSingleList(index);
                this.$refs["dialog"].close();
              });
            }
          }
        });
      } else if (this.tabActive == 4) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            merchantUpdate(this.form).then((res) => {
              this.Notify("更新成功！");
              this.getSingleList(index);
              this.$refs["dialog"].close();
            });
          }
        });
      }
    },
    weekClick(row) {
      if (this.activeWeeks.length > 0) {
        let find = false;
        for (let index in this.activeWeeks) {
          let item = this.activeWeeks[index];
          if (item.id == row.id) {
            find = true;
            this.activeWeeks.splice(index, 1);
            break;
          }
        }
        if (!find) {
          this.activeWeeks.push({ ...row });
        }
      } else {
        this.activeWeeks.push({ ...row });
      }
    },
    cardClick(row) {
      if (this.activeCards.length > 0) {
        let find = false;
        for (let index in this.activeCards) {
          let item = this.activeCards[index];
          if (item.id == row.id) {
            find = true;
            this.activeCards.splice(index, 1);
            break;
          }
        }
        if (!find) {
          this.activeCards.push({ ...row });
        }
      } else {
        this.activeCards.push({ ...row });
      }
    },
    timeDel(index) {
      this.timesList.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.times {
  & > div {
    display: flex;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    height: 30px;
  }
}
</style>
<style lang="scss" scoped>
.business {
  .add-power > li > label:first-child {
    width: 80px;
  }
  .weeks {
    li {
      position: relative;
      display: inline-block;
      text-align: center;
      border: 1px solid #dddddd;
      border-radius: 2px;
      margin-right: 10px;
      cursor: pointer;
      font-size: 11px;
      min-width: 70px;
      height: 30px;
      line-height: 30px;
    }
    li.active {
      font-weight: bold;
      color: #3388ff;
      border: 1px solid #3388ff;
    }
    li.active::before {
      content: "";
      position: absolute;
      right: 0px;
      bottom: 0px;
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url(../../assets/active.png);
      background-size: 100% 100%;
    }
  }
  .cards li {
    min-width: 98px;
  }
  .times {
    background: #f8f8f8;
    padding: 10px;
    margin-top: 5px;
  }
  .times-delete {
    color: #4891ff;
    cursor: pointer;
    // padding: 10px;
    font-size: 13px;
    width: 90px;
    padding-left: 10px;
  }
}
</style>