<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称">
          <el-input
            v-model="form.title"
            autocomplete="off"
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid">
            <!-- value值必须写，不写会报错 -->
            <el-option label="--请选择---" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <template>
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon">
            <!-- :label="item" 和:value="item"是什么关系 -->
            <el-option
              v-for="item in icons"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url">
            <el-option
              v-for="item in url"
              :key="item"
              :label="item"
              value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
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
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, oneMenu ,upDateMenu} from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "menu/menuList",
    }),
  },

  methods: {
    // 获取菜单详情方法，父组件menu通过ref来操作
    getDetail(id) {
      // 发起菜单详情
      // 注意，这里要大括号
      oneMenu({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        pid: "", //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      };
    },
    // 调接口提交数据
    confirm() {
      console.log(this.form);
      addMenu(this.form).then((res) => {
        // 只处理成功的结果
        successAlert(res.data.msg);
        // 成功之后要让add组件消失，调用消失的方法
        this.cancel();
        // console.log(res);
        // 再请求一次，刷新页面
        this.reqMenulist()
      });
    },
    ...mapActions({
      reqMenulist: "menu/menuListActions",
    }),
    updata() {
      // 发起修改数据请求
      upDateMenu(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        // 再请求一次，刷新页面
        this.reqMenulist()
      })
    },
  },
  mounted() {
    this.reqMenulist();
  },
  props: ["info"],
  data() {
    return {
      form: {
        pid: "", //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      },
      // 存放所有图标
      icons: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-menu",
        "el-icon-s-help",
      ],
      formLabelWidth: "120px",
      // 存放所有地址
      url: [
        "home",
        "menu",
        "role",
        "manager",
        "cate",
        "spec",
        "goods",
        "member",
        "banner",
        "seckill",
      ],
    };
  },
};
</script>

<style>
</style>