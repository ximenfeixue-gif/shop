<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <!-- template无意义标签，v-slot利用了插槽的作用域 -->
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="2"
      @current-change="cPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {delManager} from '../../../utils/request'
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tableData: "manager/managerList",
      count: "manager/count",
    }),
  },
  methods: {
    ...mapActions({
      reqManagerList: "manager/managerListActions",
      reqCount: "manager/countActions",
      reqPage: "manager/pageActions",
    }),
    cPage(page) {
      console.log(page);
      this.reqPage(page);
      this.reqManagerList();
    },
    edit(uid) {
      this.$emit('edit',uid)
    },
    del(uid){
      // 发起删除菜单请求
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delManager({ uid }).then((res) => {
            successAlert(res.data.msg);
            // 这里要请求总的记录数，去除分页
            this.reqCount()
            //   再发起一次数据请求，刷新页面
            this.reqManagerList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
  mounted() {
    this.reqManagerList();
    this.reqCount();
  },
};
</script>

<style>
</style>