<template>
  <div>
    <operation :mode="4">
      <template slot="btns">
        <el-button v-if="handler.create" type="primary" @click="addHandler()">+添加APP</el-button>
      </template>
    </operation>

    <div class="main-box">
      <!-- table -->
      <LoadingBox>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column label="序号" align="center" type="index" width="70" />
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">{{ typeFormat(scope.row.type) }}</template>
          </el-table-column>
          <el-table-column label="更新日志" align="center">
            <template slot-scope="scope">{{ scope.row.remark }}</template>
          </el-table-column>
          <el-table-column label="下载地址" align="center">
            <template slot-scope="scope">{{ scope.row.url }}</template>
          </el-table-column>
          <el-table-column label="版本号" align="center">
            <template slot-scope="scope">{{ scope.row.versionCode }}</template>
          </el-table-column>
          <el-table-column label="上传时间" align="center">
            <template slot-scope="scope">{{ scope.row.createTimeStr }}</template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button v-if="handler.delete" @click="deleteHandler(scope.$index, scope.row)"
                >删除</el-button
              >
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
    <Dialog ref="dialog" :type="formType" title="APP" width="380px">
      <el-form slot="main" ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="类型：" prop="type">
          <el-select v-model="form.type" style="width: 100%" @change="typeChange">
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="APP文件：" prop="url" v-if="form.type == 3 || form.type == 4">
          <Upload mode="2" :defaultImage.sync="form.url" />
        </el-form-item>
        <el-form-item label="下载地址：" prop="url" v-if="form.type == 1 || form.type == 2">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="版本：" prop="versionCode">
          <el-input v-model="form.versionCode"></el-input>
        </el-form-item>
        <el-form-item label="更新日志：" prop="remark">
          <el-input type="textarea" :rows="3" resize="none" v-model="form.remark"></el-input>
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
import Import from '@/components/Import'
import { appCreate, appUpdate, appDelete, appPageQuery } from '@/axios/app'

const defaultForm = {
  id: 0,
  type: '',
  url: '',
  versionCode: '',
  remark: ''
}
export default {
  components: {
    Import
  },
  mixins: [form, handler],
  data() {
    return {
      list: [],
      form: { ...defaultForm },
      listQuery: {
        name: '',
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      rules: {
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        url: [{ required: true, message: ' ', trigger: 'blur' }],
        versionCode: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      types: [
        {
          label: '苹果职工版本',
          value: 1
        },
        {
          label: '苹果商户版本',
          value: 2
        },
        {
          label: '安卓职工版本',
          value: 3
        },
        {
          label: '安卓商户版本',
          value: 4
        }
      ]
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      appPageQuery(this.listQuery).then(res => {
        this.list = res.result.list
        this.total = res.result.totalCount
      })
    },
    typeFormat(type) {
      let find = this.types.find(item => {
        return item.value == type
      })
      if(find) {
        return find.label
      } else {
        return ''
      }
    },
    //
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
    deleteHandler(index, row) {
      this.Confirm('是否继续删除？').then(() => {
        appDelete({ id: row.id }).then(res => {
          this.list.splice(index, 1)
          this.Notify('删除成功！')
        })
      })
    },
    //
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formType == 'add') {
            appCreate(this.form).then(res => {
              this.Notify('添加成功！')
              this.getList()
              this.$refs['dialog'].close()
            })
          } else {
            appUpdate(this.form).then(res => {
              this.Notify('更新成功！')
              this.getList()
              this.$refs['dialog'].close()
            })
          }
        }
      })
    },
    importHandler() {
      this.$refs['import'].open()
    },
    typeChange() {
      this.form.url = ''
    }
  }
}
</script>

<style>
</style>
