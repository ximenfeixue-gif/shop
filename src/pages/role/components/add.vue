<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- defaultKey表示每次默认选中的变量 -->
          <!-- 通过ref属性来拿el-tree这个节点，然后找到控制key值的两个方法---getCheckedKeys ---setCheckedKeys-->
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="角色状态">
          <!-- active-value和inactive-value的具体值要根据接口来定 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="confirm"
          >确 定</el-button
        >
        <el-button type="primary" @click="upDate" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { addRole, oneRole, upDateRole } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      defaultKey: [], //默认选中的 key值
      formLabelWidth: "120px",
      form: {
        menus: "",
        rolename: "",
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      data: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({ 
        'reqMenuList': "menu/menuListActions",
        'reqRoleList':'role/roleListActions' }),
    cancel() {
      console.log(this.$refs.tree);
      console.log(this.$refs.tree.getCheckedKeys());
      this.info.show = false;
      this.form = {
        menus: "",
        rolename: "",
        status: 1,
      };
      this.defaultKey = this.$refs.tree.setCheckedKeys([])
    },
    confirm() {
      // 添加角色
      //   menus的内容是怎么获取的？
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      addRole(this.form).then((res) => successAlert(res.data.msg))
      this.cancel()

      this.reqRoleList()
    
    },
    getDetail(id) {
      oneRole({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // console.log(this.form.menus);
        // console.log(JSON.parse(this.form.menus));
        // this.defaultKey = this.form.menus.split('');
        this.defaultKey = JSON.parse(this.form.menus)

      });
    },
    upDate() {
      // 将menus转成数组？
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form.menus);
      upDateRole(this.form).then((res) => {
        successAlert(res.data.msg);
      });
      this.cancel()
      this.reqRoleList()
    },
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style>