<template>
  <div class="navMenu">
    <label v-for="(navMenu,index) in navMenus" :key="index">
      <el-menu-item
        v-if="navMenu.children==null"
        :key="navMenu.id"
        :data="navMenu"
        :index="getIndex(navMenu.name)"  
      >
        <span slot="title">{{ navMenu.name }}</span>
      </el-menu-item>
      <el-submenu v-else :key="navMenu.name" :data="navMenu" :index="getIndex(navMenu.id)">
        <template slot="title">
          <span>{{ navMenu.name }}</span>
        </template>
        <NavMenu :nav-menus="navMenu.children" />
      </el-submenu>
    </label>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    navMenus: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getIndex(val) {
      return val + "";
    },
  },
};
</script>
<style lang="scss" scoped>
.navMenu {
  height: 100%;
  overflow: hidden;
}
</style>
