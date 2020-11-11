<template>
  <div class="Index">
    <div class="app-left">
      <SideMenu />
    </div>
    <div class="app-right">
      <div class="app-index">
        <LayTop />
      </div>
      <div class="app-main">
        <transition name="fade-slide" mode="out-in">
          <keep-alive v-if="!$route.meta.noKeep">
            <router-view />
          </keep-alive>
          <router-view v-else/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import LayTop from '@/components/LayTop'

export default {
  components: {
    SideMenu,
    LayTop
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.Index {
  width: 100%;
  height: 100%;
  display: flex;

  .app-left {
    width: 200px;
    min-width: 200px;
    background: #fff;
    z-index: 1;
    border-right: 1px solid #ebebeb;
  }
  .app-right {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;

    .app-index {
      height: 50px;
      min-height: 50px;
      background: #f0f0f0;
    }
    .app-main {
      flex: 1;
      overflow: auto;
      overflow: auto;
    }
  }
}
.fade-slide-enter {
  opacity: 0;
  transform: translateX(-5%);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(5%);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  // position: absolute;
  z-index: 1;
  transition: all 0.3s ease;
}
.fade-slide-enter-to,
.fade-slide-leave {
  opacity: 1;
  transform: translateX(0);
}
</style>