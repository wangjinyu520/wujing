<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button type="primary" @click="addHandler()">新增</el-button>
      </template>
    </operation>

    <div class="main-box">
      <LoadingBox>
        <el-table
          row-key="id"
          :tree-props="{ children: 'children' }"
          :data="list"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="date" label="序号" type="index"> </el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="code" label="索引"></el-table-column>
          <el-table-column prop="" label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" v-if="!scope.row.parentId" @click="addChildHandler(scope.row)">添加子分类</el-button>
              <el-button type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button @click="deleteHandler(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <Pagination
          :pageNo.sync="listQuery.pageNo"
          :pageSize.sync="listQuery.pageSize"
          :total="total"
          @change="getList()"
        /> -->
      </LoadingBox>
    </div>
    <!-- form -->
    <Dialog ref="dialog" :type="formType" title="菜单" width="380px">
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父级菜单：" prop="name">
          <el-input :value="form.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="索引：" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { getTree, menuCreate, menuUpdate, menuDelete } from '@/axios/menu'

const defaultForm = {
  id: 0,
  parentId: '',
  parentName: '',
  name: '',
  code: ''
}
export default {
  data() {
    return {
      formType: 'add',
      form: { ...defaultForm },
      list: [],
      rules: {
        name: [{ required: true, message: '请填写', trigger: 'blur' }],
        code: [{ required: true, message: '请填写', trigger: 'blur' }]
      }
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      getTree().then(res => {
        this.list = res.result
      })
    },
    addHandler() {
      this.formType = 'add'
      this.form = { ...defaultForm }
      this.$refs['dialog'].open()
    },
    addChildHandler(row) {
      this.addHandler()
      this.form.parentId = row.id
      this.form.parentName = row.name
    },
    updateHandler(row) {
      this.formType = 'update'
      this.form = { ...row }
      this.$refs['dialog'].open()
    },
    deleteHandler(row) {
      this.Confirm('是否继续删除？').then(() => {
        menuDelete({ id: row.id }).then(() => {
          this.Notify('删除成功！')
          this.getList()
        })
      })
    },
    //
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formType == 'add') {
            menuCreate(this.form).then(res => {
              this.Notify('添加成功！')
              this.getList()
              this.$refs['dialog'].close()
            })
          } else {
            menuUpdate(this.form).then(res => {
              this.Notify('更新成功！')
              this.getList()
              this.$refs['dialog'].close()
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>