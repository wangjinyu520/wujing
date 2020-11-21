<template>
  <!-- 焦点新闻 -->
  <div class="notice">
    <Index :type="15"> </Index>
  </div>
</template>

<script>
import Index from "./index";

export default {
  components: {
    Index
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
