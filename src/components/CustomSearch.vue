<template>
  <div class="custom-search">
    <transition name="el-zoom-in-top">
      <el-scrollbar class="main" v-show="visible">
        <template v-if="list.length > 0">
          <li
            class="el-select-dropdown__item"
            :class="{ selected: item.id == data.id }"
            v-for="item in list"
            :key="item.id"
            @click="select(item)"
          >
            {{ item[props.label] }}
          </li>
        </template>
        <p v-else class="el-select-dropdown__empty">
          无匹配数据
        </p>
      </el-scrollbar>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      data: {}
    }
  },
  props: ['props', 'list'],
  created() {
    document.body.addEventListener(
      'click',
      function() {
        this.visible = false
      }.bind(this)
    )
  },
  methods: {
    select(item) {
      this.data = item
      this.visible = false
      this.$emit('change', item)
    },
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.custom-search {
  .main {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 5px 0;
    .el-scrollbar__wrap {
      max-height: 200px;
    }
  }
}
</style>