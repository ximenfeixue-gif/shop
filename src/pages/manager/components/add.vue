<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              :label="item.rolename"
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="管理员状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="confirm"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="upDate" >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { addManager, oneManager, upDateManager } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/roleListActions",
      reqCount: "manager/countActions",
      reqManagerList: "manager/managerListActions",
    }),
    cancel() {
      this.info.show = false;
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 添加管理员数据到数据库中
    confirm() {
      console.log(this.form);
      addManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
      });
      // 获取总的记录数
      this.reqCount();
      // 再次请求管理员列表---》更新列表
      this.reqManagerList();
    },
    getDetail(uid) {
      oneManager({ uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    upDate() {
      upDateManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel()
        this.reqManagerList()

      });
    },
  },
  mounted() {
    this.reqRoleList();
  },
};
</script>

<style>
</style>