<template>
  <div>
    <el-button @click="add" type="primary">添加</el-button>
    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        isAdd: false,
      },
    };
  },
  components: {
    vAdd,
    vList
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加商品分类";
      this.info.isAdd = true;
    },
    edit(id){
        this.info.show = true;
      this.info.title = "编辑商品分类";
      this.info.isAdd = false;
      // ref属性控制通过add组件
      this.$refs.add.getDetail(id)
    }
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 10px;
}
</style>

