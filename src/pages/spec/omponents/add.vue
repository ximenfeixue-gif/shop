<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称">
          <el-col :span="16"
            ><el-input
              v-model="form.specsname"
              autocomplete="off"
              :label-width="formLabelWidth"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attr"
          :key="index"
          label="规格属性"
        >
          <!-- <col>指的是列，vue中的栅格系统是24列，:span指的是占得比例 -->
          <el-col :span="16"><el-input v-model="item.value"></el-input></el-col>

          <el-button type="primary" v-if="index == 0" @click="addAttr"
            >添加规格属性</el-button
          >
          <el-button type="danger" v-else @click="delAttr(index)"
            >删除</el-button
          >
        </el-form-item>

        <el-form-item label="规格状态">
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
import { successAlert, warningAlert } from "../../../utils/alert";
import { addspec,oneSpec } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      //   自定义一个规格属性用来遍历
      attr: [{ value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqSpecList:'spec/specListActions',
      reqSpecCount:'spec/countActions'
    }),
    // 添加规格属性
    addAttr() {
      this.attr.push({ value: "" });
    },
    // 删除规格属性
    delAttr(index) {
      this.attr.splice(index, 1);
    },
    // 取消
    cancel() {
      this.info.show = false,
        this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        };
      this.attr = [{ value: "" }];
    },
    // 确定添加
    confirm() {
      if (this.attr.some((item) => item.value == "")) {
        warningAlert("规格属性不能为空");
      }
      this.form.attrs = this.attr.map((item) => item.value).join(",");
      addspec(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        // 添加规格后再次请求列表和总页数
        this.reqSpecList();
        this.reqSpecCount();
      });
    },
    // 修改页面的方法
    getDetail(id){
      oneSpec({id}).then(res=>{
        this.form=res.data.list[0]
        this.form.id=id
        var arr=res.form.attrs.split(',')
        this.attr=[{value:''}]
        for(let i in arr){
          this.attr.push({value:arr[i]})
        }
        console.log(attr);
      })
    }
  },
};
</script>

<style>
</style>