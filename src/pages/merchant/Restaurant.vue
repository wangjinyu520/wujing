<template>
  <div>
    <LoadingBox>
      <!-- 快餐厅 -->
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="sequence" label="序号"></el-table-column>
        <el-table-column prop="identifier" label="编号"></el-table-column>
        <el-table-column prop="image" label="图片" width="150">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.image" alt />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="餐厅名称"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">空闲</span>
            <span v-if="scope.row.status == 2">正常</span>
            <span v-if="scope.row.status == 3">拥挤</span>
          </template>
        </el-table-column>
        <el-table-column prop="isOpen" label="是否开放档口">
          <template slot-scope="scope">{{scope.row.isOpen == 1 ? '是':'否'}}</template>
        </el-table-column>
        <el-table-column prop="isCamera" label="是否开放摄像头">
          <template slot-scope="scope">{{scope.row.isCamera == 1 ? '是':'否'}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateHandler(scope.row)">编辑</el-button>
            <el-button @click="deleteHandler(scope.row)">删除</el-button>
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
</template>

<script>
import { canteenDelete, canteenPageQuery, canteenGet } from "@/axios/member";
import util from "@/mixin/util";

export default {
  mixins: [util],
  props: ["type", "search"],
  data() {
    return {
      list: [],
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 20,
        sort: "sequence",
        order: "asc",
        type: 1,
      },
      total: 0,
    };
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler(val) {
        this.listQuery.name = val.name;
      },
    },
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
      canteenPageQuery(this.listQuery).then((res) => {
        this.list = res.result.list;
        this.total = res.result.totalCount;
      });
    },
    updateHandler(row) {
      this.$emit("updateHandler", row);
    },
    deleteHandler(row) {
      this.Confirm("是否继续删除？").then(() => {
        canteenDelete({ id: row.id }).then((res) => {
          this.Notify("删除成功！");
          this.getList();
        });
      });
    },
    reloadList() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
  },
};
</script>

<style>
</style>