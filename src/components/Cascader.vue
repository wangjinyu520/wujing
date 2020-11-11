<template>
  <div>
    <el-cascader
      :disabled="disabled"
      v-model="departmentId"
      :options="options"
      :props="props"
      @change="change"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  props: {
    value: '',
    options: {
      default: []
    },
    props: {},
    disabled: {
      default: false
    }
  },
  data() {
    return {
      departmentId: [],
      item: ''
    }
  },
  watch: {
    options: {
      immediate: false,
      handler(val) {
        this.start()
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.start()
      }
    }
  },
  methods: {
    start() {
      if (!this.value) {
        this.departmentId = []
      }
      if (!this.value || !this.options) return
      if (this.value == this.departmentId) return
      this.item = ''
      this.reFind(this.value, this.options)
      if (!this.item) return
      this.departmentId = this.item.fullPath
        .split('/')
        .filter(data => data)
        .map(data => parseInt(data))
    },
    reFind(val, list) {
      if (this.item) return
      for (let item of list) {
        if (item.id == val) {
          this.item = item
        } else {
          if (item.children) {
            this.reFind(val, item.children)
          }
        }
      }
    },
    change(val) {
      this.$emit('input', val[val.length - 1])
    }
  }
}
</script>

<style>
</style>