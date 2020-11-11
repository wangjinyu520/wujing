<template>
  <div class="pagination">
    <el-pagination
      background
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :current-page="pageNo"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageNo: {
      default: 1,
    },
    pageSize: {
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [5,20, 40, 80, 160, 200],
    },
    total: {
      default: 0,
    },
    layout: {
      type: String,
      default:"total, sizes, prev, pager, next, jumper",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("update:pageNo", val);
      this.$emit("change");
    },
    handleSizeChange(val) {
      this.$emit("update:pageSize", val);
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  transform: scale(0.9);
  transform-origin: right center;
  text-align: right;
  padding: 20px 0 10px;
}
</style>