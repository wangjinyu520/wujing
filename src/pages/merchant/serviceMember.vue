<template>
  <div class="mettingMember">
    <operation :mode="4">
      <template slot="search">
        <li>
          <span>姓名：</span>
          <div>
            <el-input
              v-model="listQuery.name"
              onkeyup="value=value.replace(/(\d+|\s+)/g,'')"
              placeholder="请输入"
              clearable
            ></el-input>
          </div>
        </li>
        <div>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </template>
      <template slot="btns">
        <el-button v-if="handler.create" type="primary" @click="createDialog">新增</el-button>
        <el-button v-if="handler.delete" type="primary" @click="handleDeletes" plain>批量删除</el-button>
        <el-button type="primary" v-if="handler.create" @click="importHandler()" plain>批量导入</el-button>
      </template>
    </operation>
    <div class="main-box">
      <LoadingBox>
        <el-table
          ref="newSubjectTable"
          :data="list"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" align="center" type="index" width="70" />
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="个人编号" align="center">
            <template slot-scope="scope">{{ scope.row.identifier }}</template>
          </el-table-column>
          <el-table-column label="部门" align="center">
            <template slot-scope="scope">{{ scope.row.departmentName }}</template>
          </el-table-column>
          <el-table-column label="账号" align="center">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column label="联系电话" align="center">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>
          <el-table-column label="身份证号" align="center">
            <template slot-scope="scope">{{ scope.row.idCard }}</template>
          </el-table-column>
          <el-table-column prop="formation" label="编制">
            <template slot-scope="scope">{{ scope.row.formation == 1 ? '编内' : '编外' }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                v-if="handler.delete"
                type="text"
                size="small"
                class="user-btn-default"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :pageNo.sync="listQuery.pageNo"
          :pageSize.sync="listQuery.pageSize"
          :total="total"
          @change="getList"
        />
      </LoadingBox>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <Dialog ref="dialog2" type="add" title="服务群体" width="850px">
      <div class="innerDialog-container" slot="main">
        <div style="margin-bottom:15px">
          <el-checkbox v-model="showAllCheckBox">显示已选人员</el-checkbox>
        </div>
        <div class="innerDialog-container-selection" style="margin-bottom:15px">
          <li>
            <span>人员编号：</span>
            <el-input type="text" v-model="materialListQuery.identifier"></el-input>
          </li>
          <li>
            <span>姓名：</span>
            <el-input type="text" v-model="materialListQuery.name"></el-input>
          </li>

          <el-button type="primary" @click="menuSelected()">查询</el-button>
        </div>
        <div class="innerDialog-content">
          <div class="innerDialog-header">
            <span>部门</span>
            <span>
              <el-checkbox v-model="selectAll" @change="goodsListCheckAll"></el-checkbox>人员列表
            </span>
          </div>
          <div class="innerDialog-body">
            <div class="l-ct">
              <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
                <el-menu
                  :default-active="getDefaultActive()"
                  mode="vertical"
                  class="el-menu-vertical-demo"
                  background-color="#ffffff"
                  text-color="#696f7c"
                  active-text-color="#2286d3"
                  @select="menuSelected"
                >
                  <NavMenu :nav-menus="categoryListData" />
                </el-menu>
              </el-scrollbar>
            </div>
            <div class="r-ct">
              <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
                <el-checkbox-group v-model="checkList" checked="checkList">
                  <div v-if="!showAllCheckBox">
                    <div
                      v-for="(item,index) in materialListData"
                      :key="index"
                      style="line-height: 52px;"
                    >
                      <el-checkbox
                        :label="item.id"
                        style="margin-left:80px;"
                        @change="changeMateria"
                      >{{ item.name }} （{{ item.identifier }}）</el-checkbox>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      v-for="(item,index) in checkObjList"
                      :key="index"
                      style="line-height: 52px;"
                    >
                      <el-checkbox
                        :label="item.id"
                        style="margin-left:80px;"
                        @change="changeMateria"
                      >{{ item.name }} （{{ item.username }}）</el-checkbox>
                    </div>
                  </div>
                </el-checkbox-group>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <load-button type="primary" @click="handleAdd()">确定</load-button>
      </template>
    </Dialog>
    <!-- 导入 -->
    <Import
      class="import"
      ref="import"
      downloadUrl="http://static.huafcy.com/e00a6ad40aa48645bf7461842a8d11e3.xls"
      importUrl="/web/member/group/daoru"
      :merchantId="true"
      memberGroupType="2"
      @success="getList"
    />
  </div>
</template>
<script>
import handler from "@/mixin/handler";
import form from "@/mixin/form";
import NavMenu from "./navMenu";
import { departmentQuery } from "@/axios/department";
import {
  meetingMemberPageByQo,
  meetingMemberSaveBatch,
  meetingMemberRemoveByIds,
  memberPageQuery,
} from "@/axios/member";
import Import from "@/components/Import";

// import {  } from "@/axios/member";

export default {
  components: {
    NavMenu,
    Import,
  },
  mixins: [form, handler],

  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        memberGroupType: 2,
        name: "",
      },
      form: {},
      list: null,
      total: 0,
      materialTotal: 0,
      rules: {
        name: [{ required: true, message: "名称不能未空", trigger: "blur" }],
        price: [
          { required: true, message: "人均（元）不能为空", trigger: "blur" },
        ],
      },
      multipleSelection: [],
      categoryListData: [], // 用户列表
      checkList: [], // 已选[1,2,3] checkbox
      checkObjList: [], // 已选[{id,name}]
      materialListData: [],
      dishListData: [], // 列表
      showAllCheckBox: false,
      allCheckList: [],
      materialListQuery: {
        identifier: "",
        name:""
      },
      selectAll: false,
      addMettingRow: "",
    };
  },
  activated() {
    // 获取设置设置商户群体的类型
    this.init();
  },
  methods: {
    init() {
      this.getList();
      this.getDepartment(); // 获取菜单列表
    },
    // 获取列表
    getList() {
      meetingMemberPageByQo(this.listQuery).then((response) => {
        this.list = response.result.list;
        this.total = response.result.totalCount;
        this.multipleSelection = [];
      });
    },
    handleDelete(row) {
      const params = {
        memberIds: row.id,
        memberGroupType: 2,
      };
      this.Confirm("是否继续删除？").then(() => {
        meetingMemberRemoveByIds(params).then(() => {
          this.Notify("删除成功！");
          this.getList();
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.checkList && this.checkList.length > 0) {
        const params = {
          memberGroupType: 2,
          memberIds: this.checkList.join(","),
        };
        meetingMemberSaveBatch(params).then((response) => {
          this.getList();
          this.$refs.dialog2.close();
          this.$message.success({
            type: "succss",
            message: "添加成功",
          });
        });
      } else {
        this.$message({
          message: "请选择人员！",
          type: "warning",
        });
      }
    },
    handleDeletes() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        let ids = this.multipleSelection
          .map((item) => {
            return item.id;
          })
          .join(",");
        this.Confirm("是否继续删除？").then(() => {
          meetingMemberRemoveByIds({ memberIds: ids, memberGroupType: 2 }).then(
            () => {
              this.Notify("删除成功！");
              this.getList();
            }
          );
        });
      } else {
        this.$message({
          message: "请选择其中一条或多条数据！",
          type: "warning",
        });
      }
    },
    // // 弹出弹窗
    createDialog() {
      this.form = {};
      this.stepTwoVis = true;
      this.$refs.dialog2.open();
      this.checkList = [];
      this.checkObjList = [];
      let data = this.categoryListData;
      const val = data[0] && data[0].name;
      // const val = data[0].children && data[0].children[0].id;
      this.menuSelected(val);
    },
    // 获取树形菜单默认第一项
    getDefaultActive() {
      let data = this.categoryListData;
      data = data.filter((ele) => {
        return ele.length;
      });
      const id = data[0] && data[0].id;
      return id + "";
    },
    getDepartment() {
      departmentQuery().then((res) => {
        this.categoryListData = res.result;
      });
    },
    // TODO  SEL
    // 选择菜单
    menuSelected(val) {
      this.showAllCheckBox = false;
      this.selectAll = false;
      const params = {
        type: 2, //仅查职工
        departmentName: val,
        identifier: this.materialListQuery.identifier,
        pageNo: 1,
        pageSize: 99999,
        name: this.materialListQuery.name
      };
      // 选择菜单的时候
      memberPageQuery(params).then((res) => {
        if (!res.result.list) {
          return;
        }
        this.materialTotal = res.result.totalCount;
        this.materialListData = res.result.list.map((item) => {
          item.id = item.id + ""; // 为了默认选中问题
          // item.num = item.num || 0;
          const idx = this.checkObjList.findIndex((res) => {
            return parseInt(res.id) === parseInt(item.id);
          });
          // if (idx > -1) {
          //   item.num = this.checkObjList[idx].num; // 给原料类别下原料列表赋值， 回显
          // }
          return item;
        });
      });
    },
    goodsListCheckAll(checked) {
      if (checked) {
        this.checkList = this.materialListData.map((item) => {
          return item.id;
        });
        this.checkObjList = this.materialListData.map((item) => {
          return {
            id: item.id,
            name: item.name,
            username: item.username,
          };
        });
      } else {
        this.checkList = [];
        this.checkObjList = [];
      }
    },
    // 勾选食材
    changeMateria(checked, event) {
      const index = this.materialListData.findIndex((res) => {
        return parseInt(res.id) === parseInt(event.target.value);
      });
      if (checked) {
        this.checkObjList.push({
          id: event.target.value,
          name: this.materialListData[index].name,
          username: this.materialListData[index].username,
        });
      } else {
        this.checkObjList = this.checkObjList.filter((res) => {
          return res.id !== event.target.value;
        });
      }
      console.log(this.checkList);
    },
    // 删除已选的食材
    handleClose(tag) {
      this.checkObjList.splice(this.checkObjList.indexOf(tag), 1);
      this.checkList.splice(this.checkList.indexOf(tag.id), 1);
    },
    checkShow(id) {
      if (this.showAllCheckBox) {
        if (this.checkList.includes(id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    importHandler() {
      this.$refs["import"].open();
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
  height: 80%;
}
/deep/ .import .el-dialog {
  height: auto;
}
/deep/ .el-dialog__body {
  height: calc(100% - 85px);
  // overflow: hidden;
}
/deep/ .el-dialog__footer {
  height: 50px;
}
/deep/ .innerDialog-container {
  height: 100%;
}
/deep/ .innerDialog-body {
  height: calc(100% - 40px);
}
.mettingMember {
  .innerDialog-content {
    width: 100%;
    height: calc(100% - 60px);
    border: 1px solid #f5f5f5;
    display: flex;
    flex-direction: column;

    .innerDialog-header {
      height: 40px;
      width: 100%;
      display: flex;
      background: #f5f5f5;
      span {
        line-height: 40px;
        text-align: center;
      }
      span:nth-child(1) {
        width: 320px;
        // border:1px solid #000;
      }
      span:nth-child(2) {
        width: 233px;
      }
      span:nth-child(3) {
        flex: 1;
      }
    }
    .innerDialog-body {
      width: 100%;
      flex: 1;
      // border: 1px solid #f00;
      display: flex;
      .l-ct {
        width: 320px;
        height: 100%;
        border-right: 1px solid #f5f5f5;

        position: relative;
        overflow: hidden;
        .scrollbar-wrapper {
          overflow-x: hidden !important;
        }
      }
      .r-ct {
        flex: 1;
        box-sizing: border-box;
        .pagination {
          position: absolute;
          bottom: 20px;
        }
      }
    }
  }
  .innerDialog-container-box {
    display: flex;
    justify-content: space-between;
  }
  .innerDialog-container-selection {
    display: flex;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 15px;
      span {
        width: 100px;
        font-size: 14px;
      }
      input {
        flex: 1;
      }
    }
  }
}
</style>