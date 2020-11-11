<template>
  <div v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
    <el-table :data="list" stripe style="width: 100%" @selection-change="selectChange">
      <el-table-column prop label type="selection"></el-table-column>
      <el-table-column prop="sequence" label="序号"></el-table-column>
      <el-table-column prop="image" label="商品图片" width="120">
        <template slot-scope="scope">
          <img style="width: 100px;max-height: 100px;" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column prop="identifier" label="商品编码"></el-table-column>
      <el-table-column prop="name" label="商品名称/标题">
        <template
          slot-scope="scope"
        >{{scope.row.name}}{{scope.row.viceName ? '/'+scope.row.viceName : ''}}</template>
      </el-table-column>
      <el-table-column prop="categoryName" label="商品分类"></el-table-column>
      <el-table-column prop :label="type != 3 ? '  现价(元) / 结算比例': '原价(积分) / 现价(积分)'" width="200">
        <template slot-scope="scope">
          <span v-if="type != 3">
            <!-- {{scope.row.oldPrice}} / -->
            {{scope.row.price}} / {{scope.row.countRate}}
          </span>
          <span v-else>{{scope.row.oldPrice}} / {{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="store" label="库存"></el-table-column>
      <el-table-column prop="limitMsg" label="限购信息"></el-table-column>
      <el-table-column prop label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            :disabled="!handler.freeze"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="statusChange(scope.row)"
          ></el-switch>
          <!-- {{ scope.row.status == 1 ? '上架' : '下架' }} -->
        </template>
      </el-table-column>
      <el-table-column prop label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="handler.update" type="primary" @click="updateHandler(scope.row)">编辑</el-button>
          <!-- <el-button type="primary" @click="freezeHandler(scope.row)">{{scope.row.status == 1 ? '冻结' : '解冻'}}</el-button> -->
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
  </div>
</template>

<script>
import {
  productPageQuery,
  productCreate,
  productUpdate,
  productDelete,
  productFreeze
} from "@/axios/goods";
import handler from "@/mixin/handler";

export default {
  mixins: [handler],
  props: ["type", "search"],
  data() {
    return {
      list: [],
      selectList:[],
      loading: false,
      listQuery: {
        name: "",
        category: "",
        pageNo: 1,
        pageSize: 20,
        sort: "sequence",
        order: "asc",
        
      },
      total: 0
    };
  },
  created() {
    this.listQuery.type = this.type;
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    // 批量操作的数据
    selectChange(selection) {
      this.selectList = selection;
      console.log(this.selectList);
    },
    searchList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      for (let index in this.search) {
        this.listQuery[index] = this.search[index];
      }
      productPageQuery(this.listQuery)
        .then(res => {
          let data = res.result;
          this.list = data.list;
          this.total = data.totalCount;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    freezeHandler(row) {
      let message = row.status == 1 ? "冻结" : "解冻";
      this.Confirm("是否继续" + message + "?").then(() => {
        productFreeze({ id: row.id }).then(res => {
          this.Notify(message + "成功！");
          this.getList();
        });
      });
    },
    updateHandler(row) {
      this.$emit("updateHandler", row);
    },
    deleteHandler(index, row) {
      this.Confirm("是否继续删除？").then(() => {
        productDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1);
          this.Notify("删除成功！");
        });
      });
    },
    reloadList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    statusChange(row) {
      productFreeze({ id: row.id })
        .then(() => {})
        .catch(() => {
          if (row.status == 1) {
            row.status = 0;
          } else {
            row.status = 1;
          }
        });
    }
  }
};
</script>

<style>
</style>