<template>
  <!-- 新增 导入 查询 面包屑的盒子 -->
  <!-- 1只显示面包屑 2只显示操作按钮 3只显示搜索 4显示操作和搜索 5显示面包屑和搜索 6自定义面包屑-->
  <div class="operation">
    <div style="margin-right: 15px;">
      <div class="tip custom-tip" v-if="mode == 6">
        <slot name="customTip"></slot>
      </div>
      <div class="tip" v-if="mode == 1 || mode == 5">
        <p v-for="(item, index) in tip" :key="index">
          <span v-if="index > 0">&nbsp;/ </span>
          <span class="tip-name" @click="tipGoRoute(item)" v-if="index < tip.length - 1">{{
            item.name
          }}</span>
          <span class="tip-last" v-else>{{ item.name }}</span>
        </p>
      </div>
      <div class="btns" v-if="mode == 2 || mode == 4">
        <slot name="btns"></slot>
      </div>
    </div>
    <div class="search" v-if="mode == 3 || mode == 4 || mode == 5">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script>
import handler from '@/mixin/handler'
export default {
  mixins: [handler],
  props: {
    mode: {
      default: 1
    }
  },
  data() {
    return {
      tip: []
    }
  },
  created() {
    if(this.mode == 1 || this.mode == 5) {
      this.setTip()
    }
  },
  methods: {
    getRoute(pathList, arr) {
      if (pathList.length == 0) return
      let path = pathList.shift()
      for (let item of arr) {
        if (item.path.indexOf(path) > -1) {
          this.tip.push(item)
          if(item.children) {
            this.getRoute(pathList, item.children)
          }
        }
      }
    },
    setTip() {
      let pathList = this.$route.path.split('/').filter(item => item)
      let routeTree = this.$router.options.routes
      this.getRoute(pathList, routeTree)
    },
    tipGoRoute(data) {
      this.$router.push(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 5px;
  background: #f8f8f9;
  .custom-tip p:not(:last-child) {
    cursor: pointer;
  }
  .tip {
    font-size: 12px;
    color: #888;
    display: flex;
    margin-bottom: 5px;
    .tip-name {
      cursor: pointer;
      &:hover {
        color: #111;
      }
    }
    .tip-last {
      color: #111;
    }
  }
  .search {
    display: flex;
    align-items: center;
    text-align: right;
    flex: 1;
    justify-content: flex-end;
    flex-wrap: wrap;
    &>div {
      margin-left: 10px;
      margin-bottom: 5px;
    }
    &>li {
      display: flex;
      align-items: center;
      margin-left: 10px;
      margin-bottom: 5px;
      width: 200px;
      &>span {
        color: #333;
        font-size: 13px;
      }
      &>div {
        flex: 1;
      }
      &.datepick {
        max-width: 340px;
      }
    }
  }
}
</style>