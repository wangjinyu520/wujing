<template>
  <!-- 统一做loading处理 -->
  <div
    class="loading-component"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style>
</style>