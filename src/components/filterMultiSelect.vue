<template>
  <div class="component-dept filter-multi el-select" @click.stop="stopClick">
    <div class="value-list">
      <li
        class="el-tag el-tag--info el-tag--small el-tag--light"
        v-for="item in chooseList"
        :key="item.id"
      >
        {{ item.name }}<i class="el-tag__close el-icon-close" @click.stop="choose(item)"></i>
      </li>
    </div>
    <div class="search-dept">
      <el-input
        class="custom-input"
        ref="filter"
        v-model="name"
        placeholder="请选择"
        @focus="focus"
        @clear="clear"
        @input="input"
        clearable
      ></el-input>
      <transition name="el-zoom-in-top">
        <div
          class="dept-main-bg el-select-dropdown el-popper is-multiple"
          x-placement="bottom-end"
          v-show="show"
        >
          <p v-show="noFind" class="el-select-dropdown__empty">无匹配数据</p>
          <el-scrollbar v-show="!noFind" ref="scroll-bar">
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <li
                class="el-select-dropdown__item"
                :class="{ selected: value.includes(item.id) }"
                v-for="item in list"
                :key="item.id"
                v-show="item.name.indexOf(filterName) > -1"
                @click="choose(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </el-scrollbar>
          <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { customDepartmentQuery } from '@/axios/department'
export default {
  props: ['mode', 'value', 'disabled', 'custom'], //1是获取ID
  data() {
    return {
      id: '',
      name: '',
      show: false,
      filterName: ''
    }
  },
  computed: {
    chooseList() {
      return this.list.filter(item => {
        return this.value.includes(item.id)
      })
    },
    list() {
      if (this.custom) {
        return this.$store.state.customDepartmentList
      } else {
        return this.$store.state.departmentList
      }
    },
    noFind() {
      let filters = this.list.filter(item => {
        return item.name.indexOf(this.filterName) > -1
      })
      if (filters.length == 0) {
        return true
      }
    }
  },
  created() {
    document.body.addEventListener('click', () => {
      if (this.show) {
        this.show = false
      }
    })
  },
  methods: {
    clear() {
      this.filterName = ''
      this.name = ''
      //this.$emit('input', [])
    },
    input(val) {
      this.filterName = val
    },
    focus() {
      if (!this.show) {
        this.show = true

        this.$nextTick(() => {
          let scroll = this.$refs['scroll-bar'].wrap
          let active = scroll.querySelector('.selected')
          if (active) {
            scroll.scrollTop = active.offsetTop - 70
          }
        })
      }
    },
    choose(item) {
      let value = this.value
      let findIndex = value.findIndex(res => {
        return res == item.id
      })
      if (findIndex > -1) {
        value.splice(findIndex, 1)
      } else {
        value.push(item.id)
      }
      this.$emit('input', value)
    },
    stopClick() {
      this.$refs.filter.focus()
    }
  }
}
</script>

<style lang="scss">
.component-dept.filter-multi {
  .search-dept {
    position: relative;
  }
  .dept-main-bg {
    position: absolute;
    z-index: 9999;
    top: 30px;
    left: -1px;
    /* left: 0; */
    min-width: 100%;
    // height: 250px;
    background: #fff;
    margin-bottom: 100px;
    li {
      text-align: left;
    }
  }
  .el-scrollbar__wrap {
    max-height: 274px;
  }
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  .el-select-dropdown__item.selected {
    padding-right: 36px;
  }

  .custom-input {
    display: flex;
    input {
      border: none;
    }
  }

  .el-tag.el-tag--info .el-tag__close {
    color: #fff;
    // background-color: #cfcfcf;
  }
  .value-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>