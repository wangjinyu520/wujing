<template>
  <div>
    <operation :mode="4">
      <template slot="search">
        <li>
          <span>联系人：</span>
          <div>
            <el-input v-model="listQuery.receiveName"></el-input>
          </div>
        </li>
        <li>
          <span>联系电话：</span>
          <div>
            <el-input v-model="listQuery.receiveMobile"></el-input>
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
        <el-table class="print-target" :data="list" stripe style="width: 100%">
          <el-table-column label="序号" type="index" width="70" />
          <el-table-column label="联系人" prop="name"></el-table-column>
          <el-table-column label="联系电话" prop="mobile"></el-table-column>
          <el-table-column label="反馈内容" prop="content"></el-table-column>
          <el-table-column label="状态" prop>
            <template slot-scope="scope">{{scope.row.status == 0 ? '未处理':'已处理'}}</template>
          </el-table-column>
          <el-table-column label="处理意见" prop="remark"></el-table-column>

          <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>

          <el-table-column prop label="操作">
            <template slot-scope="scope">
              <!-- " -->
              <el-button
                type="primary"
                v-if="handler.handle && scope.row.status == 0"
                @click="dealHandler(scope.row)"
              >处理</el-button>
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
    <el-dialog ref="dialogSuggestion" :visible.sync="dialogVisible" title="处理意见：" width="500px">
      <el-form>
        <el-form-item>
          <el-input v-model="suggsition" type="textarea" :rows="5" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <load-button type="primary" @click="suggsitionDefine()">确定</load-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import handler from "@/mixin/handler";
import {
  suggestionPageQuery,
  suggestionDelete,
  suggestionDeal
} from "@/axios/suggestion";

export default {
  mixins: [handler],
  data() {
    return {
      list: [],
      dialogVisible: false,
      suggsition: "",
      listQuery: {
        receiveName: "",
        receiveMobile: "",
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      currID: ""
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
      suggestionPageQuery(this.listQuery).then(res => {
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
    dealHandler(row) {
      this.dialogVisible = true;
      this.currID = row.id;
      // suggestionDeal({
      //   id: row.id
      // }).then(() => {
      //   this.Notify("处理成功！");
      //   this.getList();
      // });
    },
    suggsitionDefine() {
      suggestionDeal({
        remark: this.suggsition,
        id: this.currID
      }).then(() => {
        this.suggsition=""
        this.Notify("处理成功！");
        this.getList();
      });
      this.dialogVisible = false;
    },
    suggsitinHandle() {
      this.$refs["dialogSuggestion"].close();
    },
    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        suggestionDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1);
          this.Notify("删除成功！");
        });
      });
    },
    print() {
      this.$refs.print.print();
    }
  }
};
</script>

<style>
</style>
