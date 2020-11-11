<template>
  <div class="dialog-component">
    <el-dialog
      ref="dialog"
      :title="setTitle"
      :visible.sync="dialogVisible"
      :width="width"
    >
      <slot name="main"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    type: {
      default: 'add'
    },
    width: {
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    setTitle() {
      if(this.type == 'add') {
        return '添加'+ this.title
      } else if(this.type == 'normal') {
        return this.title
      } else {
        return '编辑'+ this.title
      }
    }
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler(val) {
        //关闭的时候，清除已经进行过的校验
        if (!val) {
          this.$nextTick(() => {
            let childs = this.$refs['dialog'].$children
            for (let item of childs) {
              if (item.$el.className.indexOf('form') > -1) {
                item.clearValidate()
              }
            }
          })
        }
      }
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>