<template>
  <div id="app">
    <router-view v-if="show" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      path: "",    
      show: true,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.path = val.path;
      },
    },
  },
  created() {
    if (this.$store.state.token) {
      // this.$store.dispatch("Get_Department");
    }
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 3388ff
#app {
  width: 100%;
  height: 100%;
}
</style>
