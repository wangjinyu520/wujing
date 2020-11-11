<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create" type="primary" @click="addHandler()">新增</el-button>
        <el-button v-if="handler.daoru" @click="importHandler()">批量导入</el-button>
      </template>
      <template slot="search">
        <li>
          <span>商品分类：</span>
          <div>
            <el-input v-model="listQuery.name"></el-input>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="searchList()">查询</el-button>
        </div>
      </template>
    </operation>

    <div class="main-box">
      <!-- table -->
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="sequence" label="序号"></el-table-column>
          <el-table-column prop="name" label="类别名称"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="createDateStr" label="添加时间"></el-table-column>
          <el-table-column prop label="操作" width="220">
            <template slot-scope="scope">
              <el-button v-if="handler.update" type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button v-if="handler.delete" @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
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
    <Dialog ref="dialog" :type="formType" title="类别" width="380px">
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="类别名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="序号：" prop="sequence">
          <NumInput v-model="form.sequence"></NumInput>
          <div style="color: #ff4f33;font-size: 11px;line-height: 15px">*越小越靠前</div>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" :rows="3" resize="none" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>

    <!-- 导入 -->
    <Import
      ref="import"
      downloadUrl="https://pereal.oss-cn-beijing.aliyuncs.com/30d643af16e0d8694179470706e4fbf48c20d476.xls"
      importUrl="/web/category/daoru"
      :merchantId="true"
      @success="getList"
    />
  </div>
</template>

<script>
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import Import from "@/components/Import";
import {
  categoryPageQuery,
  categoryCreate,
  categoryUpdate,
  categoryDelete
} from "@/axios/goods";

const defaultForm = {
  id: 0,
  name: "",
  sequence: 0,
  viceName: "",
  remark: ""
};
export default {
  components: {
    Import
  },
  mixins: [form, handler],
  data() {
    return {
      list: [],
      form: { ...defaultForm },
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      rules: {
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        sequence: [{ required: true, message: "请填写", trigger: "blur" }]
      }
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    searchList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    getList() {
      categoryPageQuery(this.listQuery).then(res => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    //
    addHandler() {
      this.formType = "add";
      this.form = { ...defaultForm };
      this.$refs["dialog"].open();
    },
    updateHandler(row) {
      this.formType = "update";
      this.form = { ...row };
      this.$refs["dialog"].open();
    },
    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        categoryDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1);
          this.Notify("删除成功！");
        });
      });
    },
    //
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formType == "add") {
            categoryCreate(this.form).then(res => {
              this.Notify("添加成功！");
              this.getList();
              this.$refs["dialog"].close();
            });
          } else {
            categoryUpdate(this.form).then(res => {
              this.Notify("更新成功！");
              this.getList();
              this.$refs["dialog"].close();
            });
          }
        }
      });
    },
    importHandler() {
      this.$refs["import"].open();
    }
  }
};
</script>

<style>
</style>