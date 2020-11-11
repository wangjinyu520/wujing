<template>
  <div class="component-dept">
    <el-select
      v-if="mode == 1"
      :disabled="disabled"
      v-model="id"
      @change="change"
      filterable
      :clearable="mode != 1"
      @clear="clear"
      style="width: 100%"
    >
      <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <div v-else class="search-dept">
      <el-input
        ref="filter"
        v-model="name"
        placeholder="请输入"
        @focus="focus"
        @blur="blur"
        @clear="clear"
        @input="input"
        clearable
      ></el-input>
      <transition name="el-zoom-in-top">
        <div
          class="dept-main-bg el-select-dropdown el-popper"
          x-placement="bottom-end"
          v-show="show"
        >
          <p v-show="noFind" class="el-select-dropdown__empty">无匹配数据</p>
          <el-scrollbar v-show="!noFind" ref="scroll-bar">
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <li
                class="el-select-dropdown__item"
                :class="{ selected: id == item.id }"
                v-for="item in list"
                :key="item.id"
                :value="item.id"
                v-show="item.name.indexOf(filterName) > -1"
                @click="choose(item)"
              >{{ item.name }}</li>
            </ul>
          </el-scrollbar>
          <div x-arrow class="popper__arrow" style="left: auto;right: 35px;"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { customDepartmentQuery } from "@/axios/department";
export default {
  props: ["mode", "value", "disabled", "custom"], //1是获取ID
  data() {
    return {
      id: "",
      name: "",
      show: false,
      filterName: ""
    };
  },
  computed: {
    list() {
      if (this.custom) {
        return this.$store.state.customDepartmentList;
      } else {
        return this.$store.state.departmentList;
      }
    },
    noFind() {
      let filters = this.list.filter(item => {
        return item.name.indexOf(this.filterName) > -1;
      });
      if (filters.length == 0) {
        return true;
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.mode == 1) {
          this.id = val;
        } else {
          this.name = val;
        }
      }
    }
  },
  methods: {
    change(val) {
      console.log(val);
      console.log(this.id);
      if (this.mode == 1) {
        this.$emit("input", val);
        this.$emit("change", val);
      }
    },
    clear() {
      this.id = "";
      this.filterName = "";
      this.$emit("input", "");
      this.$refs.filter.blur();
    },
    input(val) {
      this.filterName = val;
      this.$emit("input", val);
    },
    focus() {
      this.show = true;
      this.$nextTick(() => {
        let scroll = this.$refs["scroll-bar"].wrap;
        let active = scroll.querySelector(".selected");
        if (active) {
          scroll.scrollTop = active.offsetTop - 70;
        }
      });
    },
    blur() {
      setTimeout(() => {
        this.show = false;
        this.filterName = "";
      }, 100);
    },
    choose(item) {
      console.log(item.id);
      this.id = item.id;
      this.$emit("input", item.name);
      this.$emit("trade", item);

      setTimeout(() => {
        this.filterName = "";
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.component-dept {
  .search-dept {
    position: relative;
  }
  .dept-main-bg {
    position: absolute;
    z-index: 9999;
    top: 30px;
    right: 0;
    /* left: 0; */
    min-width: 100%;
    // height: 250px;
    background: #fff;
    li {
      text-align: left;
    }
  }
  .el-scrollbar__wrap {
    max-height: 274px;
  }
}
</style>