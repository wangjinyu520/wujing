<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create" type="primary" @click="addHandler()">新增</el-button>
      </template>
    </operation>

    <div class="main-box">
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="date" label="序号" type="index"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <!-- <el-table-column prop="image" label="图片">
            <template slot-scope="scope">
              <img style="width: 100px;max-height: 100px;" :src="scope.row.image" alt="" />
            </template>
          </el-table-column>-->
          <!-- <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status ? '有效' : '失效' }}
            </template>
          </el-table-column>-->
          <el-table-column prop="createDateStr" label="发布日期"></el-table-column>
          <el-table-column prop label="操作" width="400">
            <template slot-scope="scope">
              <el-button v-if="handler.tuisong" type="primary" @click="sendHandler(scope.row)">消息推送</el-button>
              <el-button v-if="handler.update" type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button v-if="handler.delete" @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
              <el-button v-if="handler.view" @click="viewHandler(scope.$index, scope.row)">预览</el-button>
              <!-- <el-button v-if="handler.freeze" @click="freezeHandler(scope.row)">{{scope.row.status ? '冻结':'解冻'}}</el-button> -->
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
    <Dialog ref="dialog" :type="formType" title="预览" width="600px">
      <div class="newView" slot="main" v-if="currentDetail">
        <h2>{{currentDetail.title}}</h2>
        <h5>{{currentDetail.createTimeStr}}</h5>
        <div v-html="currentDetail.description"></div>
      </div>
      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import form from "@/mixin/form";
import handler from "@/mixin/handler";
import Editor from "@/components/Editor";
import {
  messageDelete,
  messageFreeze,
  messagePageQuery,
  messageTuisong,
  messageGet
} from "@/axios/message";

export default {
  mixins: [form, handler],
  data() {
    return {
      list: [],
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      currentDetail: null,
      formType: "normal"
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    viewHandler(index, row) {
      messageGet({
        id: row.id
      }).then(res => {
        if (res.code == 0) {
          this.currentDetail = res.result;
        } else {
          this.Warning(res.message);
        }
        if (this.currentDetail) {
          this.$refs["dialog"].open();
        }
      });
    },
    //
    addHandler() {
      this.$router.push({
        path: "index/info"
      });
    },
    sendHandler(row) {
      this.Confirm("是否继续推送?").then(() => {
        messageTuisong({
          id: row.id
        }).then(() => {
          this.Notify("推送成功！");
        });
      });
    },
    updateHandler(row) {
      this.$router.push({
        path: "index/info",
        query: {
          id: row.id
        }
      });
    },
    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        messageDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1);
          this.Notify("删除成功！");
        });
      });
    },
    freezeHandler(row) {
      let resStr = row.status ? "冻结" : "解冻";
      messageFreeze({ id: row.id }).then(res => {
        row.status = !row.status;
        this.Notify(resStr + "成功！");
      });
    },
    //
    getList() {
      messagePageQuery(this.listQuery).then(res => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formType == "add") {
            messageCreate(this.form).then(res => {
              this.Notify("添加成功");
              this.getList();
              this.$refs["dialog"].close();
            });
          } else {
            messageUpdate(this.form).then(res => {
              this.Notify("更新成功");
              this.getList();
              this.$refs["dialog"].close();
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.newView {
  width: 100%;
  overflow: hidden;
  h2 {
    font-size: 18px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
    line-height: 25px;
  }
  h5 {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
  }
}
</style>