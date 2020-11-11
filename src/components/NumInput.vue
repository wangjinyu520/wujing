<template>
  <div class="flex-center" style="height: 100%;display: block;">
    <el-input
      :disabled="disabled"
      v-model.trim="number"
      :placeholder="placeholder"
      @change="change"
    >
      <slot slot="append" name="append"></slot>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: ""
    };
  },
  props: {
    value: "",
    float: 0,
    placeholder: "",
    align: "",
    disabled: false,
    max: ""
  },
  watch: {
    number: {
      immediate: true,
      handler(val) {
        val = val + "";
        if (val) {
          let num = "";
          if (this.max + "" && parseFloat(val) > this.max) {
            num = this.max;
          } else {
            if (this.float == 0) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,0})?.*$/, "$1");
            } else if (this.float == 1) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, "$1");
            } else if (this.float == 2) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, "$1");
            } else if (this.float == 3) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,3})?.*$/, "$1");
            } else if (this.float == 8) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,8})?.*$/, "$1");
            } else if (this.float == 15) {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,15})?.*$/, "$1");
            } else {
              num = val.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, "$1");
            }
          }

          this.setNum(num);
        } else {
          this.setNum(val);
        }
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.number = val;
      }
    }
  },
  methods: {
    setNum(num) {
      this.number = num;
      this.$emit("input", num);
    },
    change(val) {
      let num = parseFloat(val);
      if (val[val.length - 1] == ".") {
        num = val.slice(0, val.length - 1);
      }
      this.setNum(num);
    }
  }
};
</script>

<style>
</style>