<template>
  <!-- 字典管理 -->
  <div class="substation">
    <operation :mode="4">
      <template slot="btns">
        <el-button  type="primary" @click="addHandler()">新增</el-button>
      </template>
      <template slot="search">
        <li>
          <span>名称：</span>
          <div><el-input v-model="listQuery.name"></el-input></div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
    </operation>
    <div class="main-box">
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="" label="序号" type="index"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="code" label="code"> </el-table-column>
          <el-table-column prop="value" label="value"> </el-table-column>
          <el-table-column prop="image" label="图片">
            <template slot-scope="scope">
              <img style="max-width: 100px;max-height: 100px" :src="scope.row.image" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column prop="" label="操作" width="200">
            <template slot-scope="scope">
              <el-button  type="primary" @click="updateHandler(scope.row)">编辑</el-button>
              <el-button  @click="deleteHandler(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :pageNo.sync="listQuery.pageNo"
          :pageSize.sync="listQuery.pageSize"
          :total="total"
          @change="getList()"
        />
      </LoadingBox>
    </div>

    <!-- form -->
    <Dialog ref="dialog" :type="formType" title="字典" width="380px">
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="code：" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="value：" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="image">
          <Upload :defaultImage.sync="form.image" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" type="textarea" resize="none" :rows="4"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import form from '@/mixin/form'
import handler from '@/mixin/handler'
import {
  dictionaryPageQuery,
  dictionaryCreate,
  dictionaryUpdate,
  dictionaryDelete,
  dictionaryGet
} from '@/axios/dictionary'

const defaultForm = {
  id: 0,
  name: '',
  code: '',
  value: '',
  image: '',
  remark: ''
}
export default {
  mixins: [form, handler],
  data() {
    return {
      formType: 'add',
      form: {},
      listQuery: {
        name: '',
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      list: [],
      rules: {
        name: [{ required: true, message: '请填写', trigger: 'blur' }],
        code: [{ required: true, message: '请填写', trigger: 'blur' }],
        value: [{ required: true, message: '请填写', trigger: 'blur' }],
      }
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      dictionaryPageQuery(this.listQuery).then(res => {
        this.list = res.result.list
        this.total = res.result.totalCount
      })
    },
    // operate
    addHandler() {
      this.formType = 'add'
      this.form = { ...defaultForm }
      this.$refs['dialog'].open()
    },
    updateHandler(row) {
      this.formType = 'update'
      this.form = { ...row }
      this.$refs['dialog'].open()
    },
    resetPwdHandler() {
      this.Confirm('是否继续重置密码？').then(() => {
        console.log('确定')
      })
    },
    deleteHandler(index, row) {
      this.Confirm('是否继续删除？').then(() => {
        dictionaryDelete({id: row.id}).then(() => {
          this.Notify('删除成功！')
          this.list.splice(index, 1)
        })
      })
    },
    //
    confirm() {
      this.$validate('form').then(() => {
        if (this.formType == 'add') {
          dictionaryCreate(this.form).then(() => {
            this.Notify('添加成功！')
            this.$refs['dialog'].close()
            this.getList()
          })
        } else {
          dictionaryUpdate(this.form).then(() => {
            this.Notify('更新成功！')
            this.$refs['dialog'].close()
            this.getList()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>