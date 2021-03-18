<template>
  <el-container>
    <!-- ***侧边栏*** -->
    <el-aside>
      <!-- default-active默认激活 -->
      <!-- 在el-menu菜单里添加router属性表示---》是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统导航</span>
          </template>
          <!-- /--指的是一级路由，menu指的是二级路由的出口 -->
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/manager">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城导航</span>
          </template>

          <el-menu-item index="/cate">商品分类</el-menu-item>
          <el-menu-item index="/spec">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- ***左边*** -->
    <el-container>
      <!-- 上边 -->
      <el-header height="80px"
        >{{ user.username }}
        <el-button @click="logOut">退出</el-button></el-header
      >
      <!-- 下边 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      'reqUser': "userActions",
    }),
    logOut() {
      // 第一步清空用户信息
      // this.reqUser(null);
      // 第二步跳转页面s
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style scoped>
.el-container {
  height: 100vw;
}
.el-header {
  background-color: rgb(187, 161, 161);
  line-height: 80px;
  text-align: right;
}
.el-aside {
  background-color: rgb(71, 68, 68);
}
</style>