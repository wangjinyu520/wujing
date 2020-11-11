<template>
  <!-- 轮播图 -->
  <div class="notice">
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create&&type==1" type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>标题：</span>
          <div>
            <el-input v-model="listQuery.title"></el-input>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop label="序号" type="index"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop label="图片">
            <template slot-scope="scope">
              <img style="width: 150px;" :src="scope.row.image" alt />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="状态" width="90" v-if="type==2">
            <template slot-scope="scope">
              <el-switch
                :disabled="!handler.freeze"
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column> -->
          <el-table-column prop label="操作" width="220">    
            <template slot-scope="scope">
              <el-button type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button
                @click="deleteHandler(scope.$index, scope.row)"
              >删除</el-button>
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
      <Dialog ref="dialog" :type="formType" title="轮播图" width="900px">
      <div class="dialog-common" slot="main">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          status-icon
          label-position="left"
          label-width="80px"
          size="medium"
        >
          <el-form-item label="编号" prop="identifier">
            <el-input v-model="form.identifier" size="medium" type="number" />
            <div style="font-size:12px;color:#fc9a23">* 编号越小越靠前</div>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" size="medium" />
          </el-form-item>
          <el-form-item label="图片">
            <Upload :defaultImage.sync="form.image" />
          </el-form-item>
          <!-- <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" resize="none" :rows="4"></el-input>
          </el-form-item>-->
          <el-form-item label="详情：" prop="content">
            <Editor v-model="form.content" style="width: 700px;padding-top: 8px;" />
          </el-form-item>
        </el-form>
      </div>

      <template slot="footer">
        <load-button type="primary" v-if="formType === 'add'" @click="confirm()">确定</load-button>
        <load-button type="primary" v-else @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import {
  advertisementPageQuery,
  advertisementCreate,
  advertisementUpdate,
  advertisementDelete,
  advertisementFreeze,  
} from "@/axios/advertisement";
import Editor from "@/components/Editor";
// import { categoryPageQuery, productPageQuery } from '@/axios/goods'
// import GoodsSelect from './GoodsSelect'

const defaultForm = {
  id: 0,
  title: "",
  image: "",
  type: 2,
  type: "",
  param: "",
  description: ""
};
export default {
  components: {
    // GoodsSelect,
    Editor
  },
  props: ["type"],
  mixins: [form, handler],
  data() {
    return {
      formType: "add",
      form: {}, 
      listQuery: {
        title: "",
        pageNo: 1,
        pageSize: 20,
        type:2, 
      },
      total: 0,    
      list: [],
      rules: {
        title: [{ required: true, message: "标题不能未空", trigger: "blur" }],
        identifier: [
          { required: true, message: "编号不能为空", trigger: "blur" },
        ],
        image: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      dialogVisible: false,
    };
  },

  activated() {
    this.getList();
  },
  methods: {
    statusChange(row, type) {
      advertisementFreeze({ id: row.id })
        .then(() => {})
        .catch(() => {
          if (row.status == 1) {
            row.status = 0;
          } else {
            row.status = 1;
          }
        });
    },
    getList() {
      advertisementPageQuery(this.listQuery).then(res => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    // operate
    addHandler() {
       this.form = {};
      this.form.content = "";
      this.$refs.dialog.open();
      this.formType = "add";
    },
  
    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        console.log("确定");
        advertisementDelete({ id: row.id }).then(res => {
          this.Notify("删除成功！");
          this.list.splice(index, 1);
          this.$refs.dialog.close();
        });
      });
    },
    //
    confirm() {
      this.$validate("form").then(() => {
         const params = {
        id: this.form.id,
        title: this.form.title,
        identifier: this.form.identifier || 0,
        image: this.form.image,
        content: this.form.content,
        type: 2,
        };
        this.form.param = JSON.stringify(param);
        if (!this.form.id) {
          advertisementCreate(this.form).then(res => {
            this.getList();
            this.Notify("添加成功！");
            this.$refs["dialog"].close();
          });
        } else {
          advertisementUpdate(this.form).then(res => {
            this.getList();
            this.Notify("更新成功！");
            this.$refs["dialog"].close();
          });
        }
      });
    },   
     // 弹出编辑框
    updateHandler(row) {
      this.getDetail(row.id);
    },
    getDetail(id) {
      advertisementGet({ id }).then((response) => {
        this.form = response.result;
        if (!this.form.content) this.form.content = "";
        this.form.content = response.result.content;
        this.formType = "update";
        this.$refs.dialog.open();
      });
    },
  }
};
</script>

<style lang="scss" scoped>

</style>