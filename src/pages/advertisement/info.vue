<template>
  <div>
    <operation :mode="6">
      <template slot="customTip">
        <p @click="$router.go(-1)">
          <span v-if="type==1">广告管理</span>
          <span v-else>开屏广告</span>
        </p>&nbsp;/&nbsp;
        <p>
          <span>{{ $route.query.id ? '编辑' : '新增' }}</span>
        </p>
      </template>
    </operation>
    <loadingBox style="padding: 15px 0 50px;">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="标题：" prop="title" style="width:500px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="image">
          <Upload :defaultImage.sync="form.image" />
        </el-form-item>
        <el-form-item label="类型：" prop="type" class="adverTypeBox">
          <el-radio-group v-model="form.type" class="adverType" @change="radioChange">
            <!-- <el-radio :label="0">无</el-radio> -->
            <!-- <el-radio :label="1">网址链接</el-radio> -->
            <!-- <el-radio :label="2">商品</el-radio> -->
            <el-radio :label="3" v-if="type==1">首页轮播图</el-radio>
            <el-radio :label="4" v-if="type==2">开屏广告（消息中心）</el-radio>
            <el-radio :label="5" v-if="type==2">开屏广告（指定商家）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转跳参数：" prop="param" v-if="form.type == 4" style="width:500px">
          <el-select placeholder="请选择" v-model="param" value-key="id" @change="mesChange">
            <el-option
              v-for="(item, index) in mesList"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转跳参数：" prop="param" v-if="form.type == 5" style="width:500px">
          <el-select placeholder="请选择" v-model="param" value-key="id" @change="shopChange">
            <el-option
              v-for="(item, index) in shopList"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接：" prop="link" v-if="form.type == 1" style="width:500px">
          <el-input v-model="link"></el-input>
        </el-form-item>
        <el-form-item label="商品：" prop="goods" v-if="form.type == 2">
          <div class="form-goods-sel">
            <span>{{ selectGoods.name }}</span>
            <el-button @click="showGoodsSelect()">点击选择</el-button>
          </div>
        </el-form-item>
        <el-form-item label="排序：" v-if="type==1" prop="sequence" style="width:500px">
          <NumInput v-model="form.sequence"></NumInput>
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>
        <el-form-item label="详情：" prop="description" v-if="type==1">
          <Editor style="width: 700px;padding-top: 10px" v-model="form.description" />
        </el-form-item>
        <el-form-item label="状态：" prop="status" v-if="type==2">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.go(-1)">返回</el-button>
          <load-button type="primary" @click="confirmHandler()">确定</load-button>
        </el-form-item>
      </el-form>
    </loadingBox>
  </div>
</template>

<script>
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import {
  advertisementCreate,
  advertisementUpdate,
  advertisementGet,
  getMess,
  getShop,
} from "@/axios/advertisement";
import Editor from "@/components/Editor";
// import GoodsSelect from './GoodsSelect'

const defaultForm = {
  id: 0,
  title: "",
  image: "",
  type: 3,
  param: "",
  sequence: 0,
  description: "",
};
export default {
  components: {
    // GoodsSelect,
    Editor,
  },
  mixins: [form, handler],
  data() {
    const linkValidate = (rule, value, callback) => {
      if (this.link) {
        callback();
      } else {
        callback(new Error("请填写"));
      }
    };
    const goodsValidate = (rule, value, callback) => {
      if (this.selectGoods.id) {
        callback();
      } else {
        callback(new Error("请选择商品"));
      }
    };
    return {
      form: { ...defaultForm },
      param: "",
      type: "",
      mesList: [],
      shopList: [],
      paramValue: "",
      rules: {
        sequence: [{ required: true, message: "请填写", trigger: "blur" }],
        title: [{ required: true, message: "请填写", trigger: "blur" }],
        image: [{ required: true, message: "请选择", trigger: "blur" }],
        type: [{ required: true, message: "请填写", trigger: "blur" }],
        link: [{ required: true, validator: linkValidate, trigger: "blur" }],
        goods: [{ required: true, validator: goodsValidate, trigger: "blur" }],
        description: [{ required: true, message: "请填写", trigger: "blur" }],
        param: [{ required: true, message: "请选择", trigger: "change" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  activated() {
    let id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getMess();
    this.getShop();
    if (id) {
      this.form.id = id;
      this.getInfo();
    }
  },
  deactivated() {
    this.form = { ...defaultForm };
    this.$nextTick(() => {
      this.$refs.form.clearValidate();
    });
  },
  methods: {
    radioChange() {
      this.param = "";
      this.form.param = "";
    },
    shopChange(val) {
      this.form.param = val;
    },
    mesChange(val) {
      this.form.param = val;
    },

    getMess() {
      getMess().then((res) => {
        this.mesList = res.result;
        this.mesList = this.mesList.map((ele) => {
          return {
            name: ele.title,
            id: ele.id,
          };
        });
      });
    },
    getShop() {
      getShop().then((res) => {
        this.shopList = res.result;
        this.shopList = this.shopList.map((ele) => {
          return {
            name: ele.name,
            id: ele.id,
            category: ele.category,
            source: ele.source,
          };
        });
      });
    },
    getInfo() {
      advertisementGet({ id: this.form.id }).then((res) => {
        this.form = res.result;
        if (this.form && this.type == 2) {
          this.param = JSON.parse(this.form.param).name;
        }
        this.form.param = JSON.parse(this.form.param);
      });
    },
    confirmHandler() {
      if (!this.form.param || this.form.param == "") {
        this.$message.warning("请选择转跳参数");
        return;
      }
      this.form.param = JSON.stringify(this.form.param);
      console.log(this.form.param);
      this.$validate("form").then(() => {
        if (this.form.id) {
          advertisementUpdate(this.form).then((res) => {
            this.Notify("更新成功！");
            this.$router.go(-1);
          });
        } else {
          advertisementCreate(this.form).then((res) => {
            this.Notify("添加成功！");
            this.$router.go(-1);
          });
        }
      });
    },
  },
};
</script>

<style>
/* .adverType {
  display: flex;
  align-items: center;
  margin: 0 10px;
  height: 40px;
} */
</style>