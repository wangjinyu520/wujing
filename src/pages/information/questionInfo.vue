
<template>
  <div>
    <operation :mode="6">
      <template slot="customTip">
        <p @click="$router.replace({ path: '/information/question' })"><span>问卷调查</span></p>
        &nbsp;/&nbsp;
        <p>
          <span>{{ routeQuery.id ? '编辑' : '新增' }}</span>
        </p>
      </template>
    </operation>

    <!-- main -->
    <div class="main-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 400px">
        <el-form-item label="标题：" prop="name">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="调查日期：">
          <el-date-picker
            style="width: 100%"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            v-model="form.times"
            type="date"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="调查内容：">
          <div class="list-charge" v-for="(question, index) in questions" :key="index">
            <p>第{{ index + 1 }}题</p>
            <ul>
              <li v-for="(item, index) in question.items" :key="index">
                <el-input v-model="item.label" placeholder="请输入题干"></el-input>
                <span
                  class="delete"
                  @click="deleteItem(index, question.items)"
                  v-if="question.items.length > 1"
                  >删除</span
                >
              </li>
              <li>
                <el-button class="btn" @click="addItem(question.items)">添加选项</el-button>
                <el-button
                  class="btn"
                  @click="deleteQuestion(index, questions)"
                  v-if="questions.length > 1"
                  >删除题干</el-button
                >
              </li>
            </ul>
          </div>
          <li>
            <el-button class="btn" type="primary" @click="addQuestion()">添加单选题</el-button>
          </li>
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.go(-1)">取消</el-button>
          <load-button type="primary" @click="confirmHandler()">确定</load-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import form from '@/mixin/form'

export default {
  mixins: [form],
  components: {
    Editor
  },
  data() {
    return {
      questions: [
        {
          items: [
            {
              label: '124'
            }
          ]
        }
      ],
      form: {
        times: []
      },
      routeQuery: {}
    }
  },
  activated() {
    this.routeQuery = this.$route.query
  },
  methods: {
    addQuestion() {
      this.questions.push({ items: [{ label: '' }] })
    },
    addItem(items) {
      items.push({ label: '' })
    },
    deleteItem(index, items) {
      items.splice(index, 1)
    },
    deleteQuestion(index, questions) {
      questions.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-charge {
  padding: 20px;
  background: #f8f8f8;
  margin-bottom: 10px;
  & > p {
    font-size: 12px;
    line-height: 15px;
  }
  li {
    display: flex;
    .el-input {
      flex: 1;
    }
    & > span {
      margin-left: 30px;
    }
    .btn {
      margin-top: 8px;
    }
  }
  .delete {
    color: #3388ff;
    cursor: pointer;
  }
}
</style>