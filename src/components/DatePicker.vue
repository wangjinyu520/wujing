<template>
  <div>
    <el-date-picker
      v-if="!datetimerange"
      style="width: 100%"
      v-model="dates"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      :clearable="clearable"
      @change="change"
    ></el-date-picker>

    <el-date-picker
      v-if="datetimerange"
      style="width: 100%"
      v-model="dates"
      value-format="yyyy-MM-dd HH:mm:ss"
      :format="format"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      :clearable="clearable"
      @change="change"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
    };
  },
  props: {
    clearable: true,
    startDate: "",
    endDate: "",
    pickerOptions: "",
    datetimerange: false,
    format: "",
  },
  watch: {
    startDate: {
      immediate: true,
      handler(val, old) {
        if (!this.dates) {
          this.dates = [];
        }
        if (this.startDate && this.endDate) {
          this.dates = [this.startDate, this.endDate];
        }
      },
    },
    endDate: {
      immediate: true,
      handler(val, old) {
        if (!this.dates) {
          this.dates = [];
        }
        if (this.startDate && this.endDate) {
          this.dates = [this.startDate, this.endDate];
        }
      },
    },
  },
  methods: {
    change(val) {
      if (val && val.length == 2) {
        this.$emit("update:startDate", val[0]);
        this.$emit("update:endDate", val[1]);
      } else {
        this.$emit("update:startDate", "");
        this.$emit("update:endDate", "");
      }
      this.$emit("change");
    },
  },
};
</script>

<style>
</style>