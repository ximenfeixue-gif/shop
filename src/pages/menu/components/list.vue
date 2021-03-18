<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <!-- template无意义标签，v-slot利用了插槽的作用域 -->
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { delMenu } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tableData: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/menuListActions",
    }),
    // 事件传递方法---传递一个事件到父组件
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      // 发起删除菜单请求
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            successAlert(res.data.msg);
            //   再发起一次数据请求，刷新页面
            this.reqMenuList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style>