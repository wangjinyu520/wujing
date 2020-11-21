<template>
  <!-- 轮播图 -->
  <div class="notice">
    <operation :mode="4">
      <template slot="btns">
        <el-button type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>书名：</span>
          <div>
            <el-input v-model="listQuery.name" clearable></el-input>
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
          <el-table-column prop="sequence" label="序号"></el-table-column>
          <el-table-column prop label="图片">
            <template slot-scope="scope">
              <img style="width: 150px" :src="scope.row.image" alt />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="书名"></el-table-column>
          <el-table-column prop="identifier" label="索引号"></el-table-column>
          <el-table-column prop="auth" label="作者"></el-table-column>
          <el-table-column prop="year" label="年限"></el-table-column>
          <el-table-column prop="area" label="籍贯"></el-table-column>
          <el-table-column prop="org" label="出版社"></el-table-column>
          <el-table-column prop="orgDate" label="出版日期"></el-table-column>
          <el-table-column prop="num" label="浏览量"></el-table-column>
          <el-table-column
            prop="createTimeStr"
            label="发布时间"
          ></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="statusChange(scope.row.id)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="primary" @click="updateHandler(scope.row)"
                >编辑</el-button
              >
              <el-button @click="deleteHandler(scope.$index, scope.row)"
                >删除</el-button
              >
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
    <Dialog ref="dialog" :type="formType" width="700px">
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
          <el-form-item label="序号" prop="sequence">
            <el-input v-model="form.sequence" size="medium" type="number" />
            <div style="font-size: 12px; color: #fc9a23">* 序号越大越靠前</div>
          </el-form-item>

          <el-form-item label="书名" prop="name">
            <el-input v-model="form.name" size="medium" />
          </el-form-item>
          <el-form-item label="图片" prop="image">
            <Upload :defaultImage.sync="form.image" />
          </el-form-item>
          <el-form-item label="索引号">
            <el-input v-model="form.identifier" size="medium" />
          </el-form-item>
          <el-form-item label="作者" prop="auth">
            <el-input v-model="form.auth" size="medium" />
          </el-form-item>
          <el-form-item label="年限" prop="year">
            <el-input v-model="form.year" size="medium" />
          </el-form-item>
          <el-form-item label="籍贯" prop="area">
            <el-input v-model="form.area" size="medium" />
          </el-form-item>
          <el-form-item label="出版社" prop="org">
            <el-input v-model="form.org" size="medium" />
          </el-form-item>
          <el-form-item label="出版日期" prop="orgDate">
            <el-date-picker
              v-model="form.orgDate"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item
            label="详情："
           
          >
            <Editor
              v-model="form.description"
              style="width: 700px; padding-top: 8px"
            />
          </el-form-item> -->
        </el-form>
      </div>

      <template slot="footer">
        <load-button type="primary" v-if="formType === 'add'" @click="confirm()"
          >确定</load-button
        >
        <load-button type="primary" v-else @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import {
  bookCreate,
  bookpUpdate,
  bookPageQuery,
  bookDelete,
  bookFreeze,
  bookGet
} from "@/axios/book";
import Editor from "@/components/Editor";

export default {
  components: {
    Editor
  },
  props: ["type"],
  mixins: [form, handler],
  data() {
    return {
      formType: "add",
      form: {
        status: 1
      },
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      list: [],
      rules: {
        title: [{ required: true, message: "标题不能未空", trigger: "blur" }],
        sequence: [
          { required: true, message: "序号不能为空", trigger: "blur" }
        ],
        area: [{ required: true, message: "不能为空", trigger: "blur" }],
        auth: [{ required: true, message: "不能为空", trigger: "blur" }],
        image: [{ required: true, message: "不能为空", trigger: "change" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        org: [{ required: true, message: "不能为空", trigger: "blur" }],
        orgDate: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true, message: "不能为空", trigger: "blur" }],
        year: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        identifier: [{ required: true, message: "不能为空", trigger: "blur" }],
        image: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  //  filters(){
  //    formType(val){
  //     if(type)
  //    }
  //  },
  activated() {
    this.getList();
  },
  methods: {
    statusChange(id) {
      bookFreeze({ id }).then(response => {});
    },
    getList() {
      bookPageQuery(this.listQuery).then(res => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    // operate
    addHandler() {
      this.form = { status: 1 };
      this.form.description = "";
      // this.form.status=1
      this.$refs.dialog.open();
      this.formType = "add";
    },

    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        console.log("确定");
        bookDelete({ id: row.id }).then(res => {
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
          area: this.form.title,
          auth: this.form.sequence,
          image: this.form.image,
          name: this.form.name,
          org: this.form.org,
          orgDate: this.form.orgDate,
          sequence: this.form.sequence,
          status: this.form.status,
          year: this.form.year,
          identifier: this.form.identifier
        };

        if (!this.form.id) {
          bookCreate(params).then(res => {
            this.getList();
            this.Notify("添加成功！");
            this.$refs["dialog"].close();
          });
        } else {
          bookpUpdate(params).then(res => {
            this.getList();
            this.Notify("更新成功！");
            this.$refs["dialog"].close();
          });
        }
      });
    },
    // 弹出编辑框
    updateHandler(row) {
      this.form = Object.assign(row, {});
      this.formType = "update";
      this.$refs.dialog.open();
      //   this.getDetail(row.id);
    },
    getDetail(id) {
      bookGet({ id }).then(response => {
        this.form = response.result;
        // if (!this.form.description) this.form.description = "";
        this.form.description = response.result.description;
        this.formType = "update";
        this.$refs.dialog.open();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
