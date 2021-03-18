<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='info' ref='add'></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from './components/list'
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        show: false,
        title: "",
        isAdd: true,
      },
    }
  },
  methods: {
    add(){
      this.info.show=true
      this.info.title='添加角色'
      this.info.isAdd=true
    },
    // 注意id的传递
    edit(id){
      this.info.show=true
      this.info.title='编辑角色'
      this.info.isAdd=false
      this.$refs.add.getDetail(id)
    }
  },
};
</script>

<style>
</style>