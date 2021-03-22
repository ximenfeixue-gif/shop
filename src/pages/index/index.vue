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
        <!-- 遍历侧边菜单目录 -->
        <template v-for="item in user.menus">
          <!-- 判断children -->
          <el-submenu :index="item.title" :key="item.id" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="i in item.children"
              :key="i.id"
              :index="i.url"
              >{{ i.title }}</el-menu-item
            >
          </el-submenu>
          <!-- 此处遍历的是只有菜单 -->
          <el-menu-item v-else :key="item.id" :index="item.url">{{
            item.title
          }}</el-menu-item>
        </template>
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
      reqUser: "userActions",
    }),
    logOut() {
      // 第一步清空用户信息
      this.reqUser(null);
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