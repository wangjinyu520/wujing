<template>
  <div class="side-menu">
    <div class="logo">
      武警士官后台管理系统      
    </div>   
    <el-scrollbar>
      <el-menu class="el-menu-vertical-demo" :router="true" :default-active="activeRouter">
        <div v-for="(item, index) in routerTree" :key="index">
          <el-menu-item :index="item.path" v-if="item.hidden == false && item.path">
            <img
              style="width: 15px;margin-right: 5px;"
              v-if="item.meta && item.meta.image"
              :src="require('@/assets/' + item.meta.image)"
              alt=""
            />
            <span>{{ item.name }}</span></el-menu-item
          >
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { getCookie } from '@/js-cookie'
import { getMyMenu } from '@/axios/member'

export default {
  data() {
    return {
      list: [],
      allHandler: {
        create: true,
        update: true,
        delete: true,
        daoru: true,
        freeze: true,
        resetPassword: true,
        apply: true,
        handle: true,
        close: true,
        verification: true,
        send: true,
        get: true,
        product: true,
        category: true,
        activity: true,
        promotion: true,
        order: true,
        wallet: true,
        pruchase: true,
        pageQuery: true,
        getTree: true,
        detail: true,
        charge: true,
        bindCard: true,
        refund: true,
        view: true,
        viewQrCode: true,
        book: true,
        income: true,
        open: true,
        handle: true,
        tuisong: true,
      }
    }
  },
  computed: {
    routerTree() {
      return this.$store.state.routerTree
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    activeRouter() {
      //取路由第一级
      let path = this.$route.path
      path =
        '/' +
        path.split('/').filter(item => {
          return item
        })[0]
      return path
    }
  },
  created() {
     this.getList()
  },
  watch: {
    $route: function(val) {
      // this.checkRoute()
    }
  },
  methods: {
    isContinueRoute(item) {
      let continuePaths = ['/login', '/menu', '/menu/index', '/permission']   
      // /menu菜单管理  /menu/index   /persission
      if (continuePaths.includes(item.path)) {
        console.log("111222")
        return true
      } else {
        return false
      }
    },
    checkRoute() {
      // this.$store.commit('Set_Handler', this.allHandler)
      // return //开发阶段可以开启此项来忽略每个路由的判断 以及内部按钮的权限
      let route = this.$route
      if (this.list.length == 0) {
        if (process.env.NODE_ENV != 'development') {
          //线上环境 如果不存在权限列表 跳转空路由
          this.$router.replace({
            path: '/permission'
          })
          return
        }
      }
      // 跳过路由的权限判断
      if (this.isContinueRoute(route)) return

      let code = ''
      if (route.meta && route.meta.code) {
        code = route.meta.code
      }
      let find = this.list.find(item => item.code == code)
      if (find) {
        let handler = {}
        for (let item of find.children) {
          let operation = item.code.split(':')
          if (operation && operation.length > 0) {
            operation = operation[operation.length - 1]
            handler[operation] = true
          }
        }
        this.$store.commit('Set_Handler', handler)
      } else {
        let parent = 'member:merchant:index'
        let indexCode = 'merchant'
        let find = this.findChildTarget({}, code, parent, indexCode)
        if (find) {
          // 这些页面存在于按钮之中，所以不给他们限制更深层的内部权限
          this.$store.commit('Set_Handler', this.allHandler)
        } else {
          // this.$message.warning('暂无权限访问！')
          this.$store.commit('Set_Handler', {})
          // 无权限访问路由后，先在同级路由里找，再去路由里找到能访问的第一个路由并打开
          //（不能直接打开有权限的第一级路由，需要精确找到有权限的子路由）
          let parentRoute = this.findTargetParentRoute(code)
          let findCanUse = false
          for (let child of parentRoute.children) {
            if (child.hidden == false) {
              findCanUse = true
              this.$router.replace(child)
              break
            }
          }
          // 并未在同级找到可用的路由
          if (!findCanUse) {
            let find = this.routerTree.find(route => {
              if (!route.hidden && route.meta) {
                return true
              }
            })
            if (find.children && find.children.length > 0) {
              for (let item of find.children) {
                if (!item.hidden) {
                  this.$router.replace(item)
                  break
                }
              }
            } else {
              this.$router.replace(find)
            }
          }
        }
      }
    },
    // 循环遍历所有父子路由，改变hidden值
    resetHidden(routes) {
      for (let item of routes) {
        if (this.isContinueRoute(item)) continue
        // item.hidden = false // 开发阶段可以开启此项展示全部菜单
        // this.list是后台回来的路由表
        let find = this.list.find(data => {
          if (item.meta && item.meta.code) {
            return item.meta.code == data.code
          } else {
            return false
          }
        })
        if (find) {
          item.hidden = false
        } else {
          //没找到不着急结束，存在的另一种可能，作为按钮存在，所以还要去children里找（例：merchant 商户管理）
          if (item.meta && item.meta.code) {
            let code = item.meta.code
            let parent = 'member:merchant:index' //商户管理的code
            let indexCode = 'merchant'
            this.findChildTarget(item, code, parent, indexCode)
          }
        }
        if (item.children && item.children.length > 0) {
          this.resetHidden(item.children)
        }
      }
    },
    setParentHasChild(routes) {
      for (let parent of routes) {
        if (parent.meta && parent.meta.byChildren) {
          let find = parent.children.find(item => !item.hidden)
          if (find) {
            parent.hidden = false
          }
        }
      }
    },
    findChildTarget(item, code, parent, indexCode) {
      if (code != parent && code.indexOf(indexCode) > -1) {
        let findMerchant = this.list.find(one => one.code == parent)
        if (findMerchant && findMerchant.children) {
          let child = findMerchant.children.find(two => two.code == code)
          if (child) {
            if (item) {
              item.hidden = false
              if (item.meta) {
                item.meta.initHidden = false
              } else {
                item.meta = {
                  initHidden: false
                }
              }
            }
            return true
          }
        }
      }
    },
    findTargetRoute(routes, code) {
      for (let route of routes) {
        if (this.firstRoute) {
          break
        }
        if (route.meta && route.meta.code == code) {
          this.firstRoute = route
        } else {
          if (route.children) {
            this.findTargetRoute(route.children, code)
          }
        }
      }
    },
    findTargetParentRoute(code) {
      let find = this.routerTree.find(item => {
        if(item.children) {
          let findChild = item.children.find(child => {
            if(child.meta && child.meta.code) {
              return child.meta.code == code
            } else {
              return false
            }
          })
          if(findChild) {
            return true
          }
        }
      })
      return find
    },
    getList() {
      this.$store.commit('ROUTERTREE', [])
      let routes = JSON.parse(JSON.stringify(this.$router.options.routes))
        this.$store.commit('ROUTERTREE', routes)
        // getMyMenu().then(res => {
        //   this.list = res.result    
        //   //过滤菜单显示不显示
        //   // this.resetHidden(routes)
        //   // this.setParentHasChild(routes)
        //   // this.$store.commit('ROUTERTREE', routes)
        //   //判断当前路由是否有权限
        //   // this.checkRoute()
        // })
    },
    checkCodeTrue(str) {
      let bol = false
      let data = this.list.filter(item => {
        return item.code == str
      })
      if (data && data.length > 0) {
        bol = true
      }
      return bol
    }
  }
}
</script>

<style lang="scss">
.side-menu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .logo {
    width: 100%;
    min-height: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3388ff;
    color: #fff;
    font-size: 14px;
    img {
      width: 100%;
    }
  }
  .el-menu {
    padding: 25px 15px 25px 13px;
  }
  .el-menu-item {
    padding-left: 40px !important;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    margin-bottom: 15px;
    border-radius: 3px;
  }
  .el-menu-item.is-active {
    background: #eef5ff;
    color: #303133;
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
    margin-right: -18px !important;
  }
}
</style>