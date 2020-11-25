<template>
  <div style="height: 100%">
    <div class="lay-top">
      <el-scrollbar
        ref="scroll-bar"
        v-if="show"
        style="width: calc(100% - 160px)"
      >
        <div class="menu-items">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
          >
            <el-menu-item
              v-for="item in list"
              :key="item.path"
              :index="item.one + '/' + item.path"
              v-show="!item.hidden"
              >{{ item.name }}</el-menu-item
            >
            <!-- v-show="!item.hidden" -->
          </el-menu>
          <div style="width: 100px"></div>
        </div>
      </el-scrollbar>

      <el-dropdown trigger="click" @command="change">
        <div class="user-info">
          <div>
            <!-- <img :src="userInfo.image" alt="" /> -->
            <span>{{ userInfo.name }}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="userInfo">个人中心</el-dropdown-item> -->
          <el-dropdown-item command="logout">退 出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- form -->
    <Dialog ref="dialog" :type="formType" title="个人信息" width="380px">
      <el-form
        slot="main"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="头像：" prop="image">
          <Upload :defaultImage.sync="form.image" />
        </el-form-item>

        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="账号：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" placeholder="默认123456"></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <load-button type="primary" @click="confirm()">确定</load-button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { removeCookie } from "@/js-cookie";
import { memberLoginOut, getUserInfo } from "@/axios/member";
// memberUpdate

export default {
  data() {
    return {
      formType: "update",
      title: "",
      name: "",
      list: [],
      form: {},
      rules: {
        // image: [{ required: true, message: '请上传', trigger: 'blur' }],
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        username: [{ required: true, message: "请填写", trigger: "blur" }]
      },
      show: false,
      scrollLeft: 0
    };
  },
  computed: {
    activeIndex() {
      let path = this.$route.path;
      path = path.split("/").filter(item => {
        return item;
      });
      path = "/" + path[0] + "/" + path[1];
      return path;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    routerTree() {
      return this.$store.state.routerTree;
    }
  },
  created() {},
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          let dom = this.$refs["scroll-bar"].wrap;
          dom.addEventListener("scroll", e => {
            this.scrollLeft = e.target.scrollLeft;
          });
          dom.scrollLeft = this.scrollLeft;
        });
      }
    },
    routerTree: {
      handler(val, old) {
        if (!old || old.length == 0) {
          this.setTop();
        }
      }
    },
    $route: {
      immediate: true,
      handler(val, old) {
        //处理菜单滚动后，切换到其他模块 重置scrollLeft
        if (!old || val.matched[0].path != old.matched[0].path) {
          this.scrollLeft = 0;
        }
        if (this.routerTree) {
          this.setTop();
        }
      }
    }
  },
  methods: {
    setTop() {
      this.show = false;
      this.title = this.$route.name;

      let path =
        "/" +
        this.$route.path.split("/").filter(item => {
          return item;
        })[0];
      let routerTree = this.$store.state.routerTree;
      for (let one of routerTree) {
        if (path == one.path) {
          this.list = one.children.map(item => {
            item.one = one.path;
            if (item.meta && item.meta.alwaysHidden && !item.meta.initHidden) {
              item.hidden = true;
              if (
                item.meta.alwaysIgnore &&
                item.meta.alwaysIgnore.includes(this.$route.path)
              ) {
                item.hidden = false;
              }
            }
            return item;
          });
          break;
        }
      }
      this.$nextTick(() => {
        this.show = true;
      });
    },
    change(value) {
      if (value == "logout") {
        this.logout();
      } else if (value == "userInfo") {
        this.form = { ...this.$store.state.userInfo };
        this.$refs.dialog.open();
      }
    },
    getUserInfo() {
      getUserInfo().then(res => {
        this.name = res.result.name;
        this.$store.commit("SETUSERINFO", res.result);
      });
    },
    logout() {
      memberLoginOut().then(res => {
        removeCookie("jh-token");
        this.$router.push({
          path: "/login"
        });
      });
    },
    confirm() {
      this.$validate("form").then(() => {
        // memberUpdate(this.form).then(() => {
        //   this.Notify('更新成功！')
        //   this.$refs.dialog.close()
        //   getUserInfo().then(res => {
        //     this.$store.commit('Set_UserInfo', res.result)
        //   })
        // })
      });
    }
  }
};
</script>

<style lang="scss">
.lay-top {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  background: #3388ff;
  .el-scrollbar__thumb,
  .el-scrollbar__thumb:hover {
    background-color: #fff;
  }
  .el-scrollbar__bar.is-horizontal {
    bottom: 0;
  }
  .menu-items {
    display: flex;
    ul {
      display: flex;
    }
  }
  .title {
    font-size: 15px;
    letter-spacing: 1px;
    color: #fff;
  }

  .top-right {
    display: flex;
    align-items: center;
    .logout {
      cursor: pointer;
      color: #fff;
      margin-left: 15px;
      font-size: 12px;
    }
  }

  .el-menu {
    height: 100%;
    background: transparent;
    border-bottom: none;
    li {
      line-height: 40px;
      height: 100%;
      color: #fff;
      padding: 0;
      margin: 0 20px;
      font-size: 13px;
      &:hover,
      &:active,
      &:focus {
        color: #fff !important;
        background: transparent !important;
      }
    }
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }

  .logout {
    color: #fff;
    cursor: pointer;
    font-size: 12px;
  }
  .user-info {
    cursor: pointer;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
    img {
      width: 28px;
      height: 28px;
      border-radius: 14px;
      margin-right: 8px;
    }
    span {
      color: #fff;
      font-size: 13px;
      letter-spacing: 1px;
    }
  }
  .el-icon-caret-bottom {
    color: #fff;
    font-size: 11px;
    padding-left: 4px;
  }
}
</style>
