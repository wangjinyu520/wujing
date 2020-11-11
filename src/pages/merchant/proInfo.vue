<template>
  <!-- 商品管理新增编辑 -->
  <div>
    <operation :mode="6">
      <template slot="customTip">
        <p @click="goRoute()">
          <span>商品管理</span>
        </p>&nbsp;/&nbsp;
        <p @click="$router.go(-1)">
          <span>{{ title[routeQuery.type] }}</span>
        </p>&nbsp;/&nbsp;
        <p>
          <span>{{ routeQuery.id ? '编辑' : '新增' }}</span>
        </p>
      </template>
    </operation>

    <!-- main -->
    <div class="main-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="115px" style="width: 400px">
        <el-form-item label="序号：" prop>
          <NumInput v-model="form.sequence" float="0" />
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>

        <el-form-item label="商品编码：" prop="identifier">
          <el-input v-model="form.identifier"></el-input>
        </el-form-item>

        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="标题：" prop="viceName">
          <el-input v-model="form.viceName"></el-input>
        </el-form-item>

        <el-form-item label="商品图片：" prop="image">
          <Upload :mode="1" :defaultImage.sync="form.image" tip="图片建议尺寸300*300" />
        </el-form-item>

        <el-form-item label="商品分类：" prop="categoryId">
          <el-select v-model="form.categoryId">
            <el-option
              v-for="(item, index) in categories"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="原价：" prop="oldPrice">
          <NumInput v-model="form.oldPrice" :float="routeQuery.type != 3 ? '2' : '0'">
            <span slot="append">{{ routeQuery.type != 3 ? '元' : '积分' }}</span>
          </NumInput>
        </el-form-item>-->

        <el-form-item label="价格：" prop="price">
          <NumInput v-model="form.price" :float="routeQuery.type != 3 ? '2' : '0'">
            <span slot="append">{{ routeQuery.type != 3 ? '元' : '积分' }}</span>
          </NumInput>
        </el-form-item>

        <el-form-item label="结算比例：" prop="countRate" v-if="form.type != 3">
          <NumInput float="2" max="1" v-model="form.countRate" placeholder="0-1，保留两位小数"></NumInput>
        </el-form-item>

        <el-form-item label="库存：" prop="store">
          <NumInput v-model="form.store">
            <!-- <span slot="append">{{routeQuery.type != 3 ? '元':'积分'}}</span> -->
          </NumInput>
        </el-form-item>

        <el-form-item label="规格：" prop="standard" v-if="routeQuery.type == 1 && categoryType != 6">
          <div class="list-charge">
            <p>规格名称</p>
            <p style="color: #333">例：【口味】 (微辣 辣 重辣)</p>
            <ul>
              <transition v-for="(item, index) in standards" :key="index" name="fade">
                <li class="items" :class="{ 'items-last': index == standards.length - 1 }">
                  <el-input
                    style="min-width: 80px;max-width: 80px;margin-right: 10px;"
                    v-model="item.label"
                    placeholder="填写规格名称"
                  ></el-input>
                  <div>
                    <transition v-for="(tag, index) in item.children" :key="index" name="fade">
                      <li>
                        <el-input style="width: 100px;" v-model="tag.label"></el-input>
                        <i
                          class="el-icon-minus"
                          @click="deleteStandardChildren(index, item.children)"
                          v-if="item.children.length > 1"
                        ></i>
                      </li>
                    </transition>
                    <li>
                      <el-button
                        class="add-children"
                        type="primary"
                        @click="addStandardChilren(item.children)"
                      >
                        <i class="el-icon-plus"></i>
                      </el-button>
                    </li>
                  </div>
                  <i class="el-icon-close" @click="deleteStandard(index)"></i>
                </li>
              </transition>
              <li>
                <el-button type="primary" class="btn" @click="addStandard()">+添加商品规格</el-button>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item
          label="商品折扣："
          prop="discount"
          v-if="routeQuery.type == 1 || routeQuery.type == 2"
        >
          <NumInput float="15" max="1" v-model="form.discount" placeholder="0-1"></NumInput>
        </el-form-item>

        <el-form-item label="商品描述：">
          <Editor style="width: 700px;padding-top: 10px" v-model="form.description" />
          <!-- <el-input v-model="form.description" type="textarea" :rows="4" resize="none"></el-input> -->
        </el-form-item>

        <el-form-item label="限购类型：" prop="limitType">
          <el-radio-group v-model="form.limitType">
            <el-radio :label="1">不限购</el-radio>
            <el-radio :label="2">按天限购</el-radio>
            <el-radio :label="3">按人限购</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="限购数量：" prop="limitNum" v-if="form.limitType != 1">
          <NumInput v-model="form.limitNum" float="0"></NumInput>
        </el-form-item>

        <el-form-item label="状态：" v-if="routeQuery.type == 1">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.go(-1)">返回</el-button>
          <load-button type="primary" @click="confirmHandler()">确定</load-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import form from "@/mixin/form";
import Upload from "@/components/Upload";
import {
  productCreate,
  productUpdate,
  categoryPageQuery,
  productGet
} from "@/axios/goods";

const defaultForm = {
  id: 0,
  identifier: "",
  name: "",
  viceName: "",
  categoryId: "",
  description: "",
  discount: "",
  image: "",
  oldPrice: "",
  price: "",
  remark: "",
  standard: "",
  store: 999,
  type: "",
  status: 1,
  countRate: "",
  sequence: "",
  limitType: 1,
  limitNum: ""
};
export default {
  components: {
    Upload
  },
  mixins: [form],
  computed: {
    categoryType() {
      let merchantInfo = this.$store.state.merchantInfo;
      let merchantId = this.$store.state.merchantId;
      let userInfo = this.$store.state.userInfo;
      if (merchantId) {
        return merchantInfo.category;
      } else {
        return userInfo.category;
      }
    }
  },
  data() {
    const standardValidate = (rule, value, callback) => {
      let getAllData = true;
      for (let item of this.standards) {
        if (!(item.label + "")) {
          getAllData = false;
        }
        if (item.children && item.children.length > 0) {
          for (let child of item.children) {
            if (!(child.label + "")) {
              getAllData = false;
            }
          }
        }
      }
      if (getAllData) {
        callback();
      } else {
        callback(new Error("请正确填写规格"));
      }
    };
    return {
      title: {
        1: "普通",
        2: "团购",
        3: "积分"
      },
      routeQuery: {
        type: 1
      },
      form: { ...defaultForm },

      //规格列表
      standardDefualt: {
        label: "口味",
        children: [{ label: "微辣" }, { label: "不加辣" }]
      },
      standards: [],
      categories: [],
      rules: {
        identifier: [{ required: true, message: "请填写", trigger: "blur" }],
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        oldPrice: [{ required: true, message: "请填写", trigger: "blur" }],
        price: [{ required: true, message: "请填写", trigger: "blur" }],
        categoryId: [{ required: true, message: "请填写", trigger: "blur" }],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
        standard: [
          { required: true, validator: standardValidate, trigger: "blur" }
        ],
        discount: [{ required: true, message: "请填写", trigger: "blur" }],
        store: [{ required: true, message: "请填写", trigger: "blur" }],
        limitType: [{ required: true, message: "请选择", trigger: "blur" }],
        limitNum: [{ required: true, message: "请填写", trigger: "blur" }],
        countRate: [{ required: true, message: "请填写", trigger: "blur" }]
      }
    };
  },
  activated() {
    this.routeQuery = this.$route.query;
    this.form.type = this.routeQuery.type;
    if (!this.routeQuery.type) {
      this.$message.warning("无权限添加");
      this.$router.go(-1);
    }
    this.getCategory();
    if (this.routeQuery.id) {
      this.getInfo();
    }
  },
  deactivated() {
    this.form = { ...defaultForm };
    this.standards = [];
    this.$nextTick(() => {
      this.$refs.form.clearValidate();
    });
  },
  methods: {
    goRoute() {
      let currentPath = this.$route.path;
      if (currentPath.indexOf("merchant") > -1) {
        currentPath = "/merchant/product";
      } else {
        currentPath = "/purchase/product";
      }
      this.$router.replace({ path: currentPath });
    },
    getInfo() {
      productGet({
        id: this.routeQuery.id
      }).then(res => {
        this.form = res.result;
        if (this.form.standard) {
          this.standards = JSON.parse(this.form.standard);
        }
      });
    },
    getCategory() {
      categoryPageQuery({
        pageNo: 1,
        pageSize: 999
      }).then(res => {
        this.categories = res.result.list;
      });
    },
    confirmHandler() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.confirm();
        } else {
          this.$message.warning("信息有误");
        }
      });
    },
    confirm() {
      this.form.standard = JSON.stringify(this.standards);
      if (!this.form.id) {
        productCreate(this.form).then(res => {
          this.Notify("添加成功！");
          this.$router.go(-1);
        });
      } else {
        productUpdate(this.form).then(res => {
          this.Notify("更新成功！");
          this.$router.go(-1);
        });
      }
    },
    addStandard() {
      this.standards.push(JSON.parse(JSON.stringify(this.standardDefualt)));
    },
    deleteStandard(index) {
      this.standards.splice(index, 1);
    },
    deleteStandardChildren(index, items) {
      items.splice(index, 1);
    },
    addStandardChilren(items) {
      items.push({ label: "" });
    },
    handleClose(index, list) {
      list.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-charge {
  margin-top: 10px;
  padding: 20px;
  background: #f8f8f8;
  border: 1px solid #e4e4e4;
  .items {
    position: relative;
    padding: 10px 0;
    display: flex;
    border-top: 1px solid #e4e4e4;
    .el-input {
      flex: 1;
    }
    & > span {
      margin-left: 30px;
    }
    .btn {
      margin-top: 8px;
    }
    &.items-last {
      border-bottom: 1px solid #e4e4e4;
    }
  }
  & > p {
    font-size: 12px;
    line-height: 15px;
    color: #222;
    margin-bottom: 10px;
  }
  .delete {
    color: #3388ff;
    cursor: pointer;
  }
  .el-icon-close {
    position: absolute;
    right: 1px;
    top: 3px;
    color: #878a8f;
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    transition: all 0.2s;
  }
  .el-icon-close:hover {
    color: #1e8fff;
    // font-weight: bold;
  }
  .el-icon-minus {
    transform: translateY(-1px);
    margin-left: 1px;
    background: #ffe6e6;
    border-radius: 50%;
    color: #f56c6c;
    padding: 2px;
    border: 1px solid #ffa8a8;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #fcd7d7;
    }
  }

  .add-children {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    padding: 0;
    padding-top: 1px;
    padding-left: 1px;
    .el-icon-plus {
      font-size: 11px;
      font-weight: bold;
      transform: scale(0.9);
    }
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-5%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(5%);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>