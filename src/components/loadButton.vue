<template>
  <div class="btn-component">
      <!-- 按钮点击并调用接口显示Loading, 完成后Loading结束 -->
      <!-- 如果使用该按钮，就必须调用操作接口新增更新删除， 如果不是则请使用普通的el-button即可 -->
    <el-button :disabled="disabled" style="width: 100%" :loading="loading" :type="type" plain @click="click" v-if="plain">
      <slot></slot>
    </el-button>
    <el-button :disabled="disabled" style="width: 100%" :loading="loading" :type="type" @click="click" v-else>
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: ['type', 'plain', 'disabled'],
  computed: {
    loading() {
      return this.$store.state.btnLoading
    }
  },
  methods: {
    click() {
      this.$store.commit('Change_isBtnLoading', true)
      this.$emit('click')
    }
  }
}
</script>

<style>
.btn-component {
  display: inline-block;
  margin-right: 5px;
  margin-left: 4px;
}
</style>