<template>
  <div>
    <el-table
      :data="cateData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column label="图片">
        <template v-slot="prop">
          <!-- 通过插槽的作用域来取图片路径 -->
          <img :src="$preImg + prop.row.img" alt="" />
        </template>
      </el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import { delCate } from "../../../utils/request";
import { successAlert,errorAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      cateData: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/cateListActions",
    }),
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
          delCate({ id }).then((res) => {
            successAlert(res.data.msg);
            //   再发起一次请求，刷新页面
            this.reqCateList();
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
    this.reqCateList();
  },
};
</script>

<style scoped>
img {
  height: 120px;
}
</style>