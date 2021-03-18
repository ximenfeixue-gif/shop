<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit" @del='del'></v-list>
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
        title: "添加商品",
        isAdd:true
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加菜单";
      this.info.isAdd=true

    },
    // 把id传到add组件中，通过add组件获取接口中的数据
    edit(id) {
      this.info.show = true;
      this.info.title = "编辑菜单";
      this.info.isAdd=false
      // 通过ref操作子组件的数据和方法
      this.$refs.add.getDetail(id);
    },
    del(id){
    }
  },
  components: {
    vAdd,
    vList,
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 10px;
}
</style>