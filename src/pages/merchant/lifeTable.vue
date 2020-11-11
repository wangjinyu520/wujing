<template>
  <div>
    <div style="height:40px"></div>
    <LoadingBox>
      <!-- 快餐厅 -->
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="sequence" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="category" label="属性值" width="150">
          <!-- <template slot-scope="scope">
            <img class="table-img" :src="scope.row.image" alt />
          </template>-->
        </el-table-column>
        <el-table-column prop="name" label="客户端状态">
          <template slot-scope="scope">{{scope.row.status?"显示":"隐藏"}}</template>
        </el-table-column>
        <el-table-column prop="sequence" label="客户端序号">
          <template slot-scope="scope">{{scope.row.sequence}}</template>
        </el-table-column>
        <el-table-column prop label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateHandler(scope.row)">编辑</el-button>
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
    <!-- form -->
    <Dialog ref="dialog" type="normal" title="编辑" width="400px">
      <!-- 生活form -->
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="120px">
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
  </div>
</template>

<script>
import {
  merchantDelete,
  merchantPageQuery,
  merchantGet,
  merchantUpdate
} from "@/axios/member";
import util from "@/mixin/util";
const defaultLifeForm = {
  name: "",
  category: 1,
  status: 0,
  sequence: 0
};
export default {
  mixins: [util],
  props: ["type", "search"],
  data() {
    return {
      form: { ...defaultLifeForm },
      list: [],
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 20,
        sort: "sequence",
        order: "asc"
      },
      total: 0,
      rules: {
        sequence: [{ required: true, message: "请选择", trigger: "blur" }],
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        status: [{ required: true, message: "请选择", trigger: "blur" }],
        category: [{ required: true, message: "请选择", trigger: "blur" }]
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
      merchantPageQuery(this.listQuery).then(res => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    updateHandler(row) {
      this.form = { ...row };
      this.formType = "update";
      this.$refs["dialog"].open();
    },
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          merchantUpdate(this.form).then(res => {
            this.Notify("更新成功！");
            this.getList();
            this.$refs["dialog"].close();
          });
        }
      });
    },
    reloadList() {
      this.listQuery.pageNo = 1;
      this.getList();
    }
  }
};
</script>

<style>
</style>