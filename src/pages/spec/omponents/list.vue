<template>
  <div>
    <el-table
      :data="specData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column prop="attrs" label="规格属性"> </el-table-column>
      <!-- <template v-slot='prop'>
        <el-tag>{{prop.row.attrs}}</el-tag>
      </template> -->
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
    <!-- 分页小列表 -->
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
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      specData: "spec/specList",
      count: "spec/count",
    }),
  },
  methods: {
    ...mapActions({
      reqSpecList: "spec/specListActions",
      reqSpecCount: "spec/countActions",
      reqPage:'spec/pageActions'
    }),
    // 请求页数
    cPage(page) {
      this.reqPage(page);
      this.reqSpecList();
    },
    // 编辑页面
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqSpecList();
    this.reqSpecCount();
  },
};
</script>

<style>
</style>