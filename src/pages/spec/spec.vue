<template>
  <div>
    <el-button type="primary" @click="add"> 添加 </el-button>
    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from "./omponents/add";
import vList from "./omponents/list";
export default {
  data() {
    return {
      info:{
        show:false,
        title:'',
        isAdd:true
      }
    };
  },
  components: {
    vAdd,
    vList
  },
  methods: {
  add(){
        this.info.show=true,
        this.info.title='添加规格属性',
        this.info.isAdd=true
    console.log('add打印成功');
        console.log(this.info.show,this.info.title,this.info.isAdd);
  },
  edit(id){
    this.info.show=true
    this.info.isAdd=false
    this.info.title='修改规格属性'
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