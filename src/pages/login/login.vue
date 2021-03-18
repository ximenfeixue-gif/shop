<template>
  <div class="container">
    <div class="con">
      <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/request";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
       user1: "user",
    })
   
  },
  methods: {
    ...mapActions({
      'reqUser': "userActions",
    }),
    login() {
      // 第一种方式，利用vuex和seesionstorage存储信息
      // vuex里面的数据一刷新就没有了
      if (this.user.username !== "" || this.user.password !== "") {
        reqLogin(this.user).then((res) => {
          successAlert(res.data.msg);
          // 发起存储数据的请求
          this.reqUser(res.data.list);
        });
        // 跳转页面
          this.$router.push("/");

      } else {
        warningAlert("用户名或者密码不为空");
      }
      // 第二种方式通过localstorage来存储
      //   if (this.user.username !== "" || this.user.password !== "") {
      //     // 允许发起请求
      //     reqLogin(this.user).then((res) => {
      //       successAlert(res.data.msg)
      //       if(localStorage.getItem('user')!=''){
      //         localStorage.removeItem('user')
      //       }
      //       localStorage.setItem('user',JSON.stringify(res.data.list))

      //       this.$router.push("/");
      //     });
      //   } else {
      //     warningAlert("请输入用户名或者密码");
      //   }
      //   console.log(this.user);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: gray;
}
.con {
  width: 500px;
  height: 350px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-input {
  width: 300px;
  margin: 10px 0 0 100px;
}
</style>