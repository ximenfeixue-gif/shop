<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid">
            <!-- value值必须写，不写会报错 -->
            <el-option label="--请选择---" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历分类列表 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            v-model="form.catename"
            autocomplete="off"
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <!-- 第一种方式：采用element-ui的方式上传图片 -->
          <!-- <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change='changeImg'>
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->

          <!-- 第二种方式，利用input按钮手写 -->
          <div class="img-box">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input type="file" @change="changeImg1" />
          </div>
        </el-form-item>

        <el-form-item label="分类状态">
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
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { addCate ,oneCate,updateCate} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      imgUrl: "",
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/cateListActions",
    }),
    cancel() {
      this.info.show = false;
      this.form = { pid: "", catename: "", img: "", status: 1 };
      console.log("取消");
    },
    confirm() {
      addCate(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.reqCateList();
      });
    },
    // 处理图片的路径和相关信息
    changeImg(e) {
      console.log(e);
      // 1.处理文件大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2W");
        return;
      }
      // 2.处理文件后缀
      var ext = [".jpg", ".png", ".jpeg", ".gif"];
      var extName = e.name.slice(e.name.lastIndexOf("."));
      if (!ext.some((item) => item == extName)) {
        warningAlert("上传文件格式不正确");
        return;
      }
      // 3.上传正确的文件路径
      this.imgUrl = URL.createObjectURL(e.raw);
      // 4.再将文件存放到form.img中
      this.form.img = e.raw;
    },
    changeImg1(e) {
      console.log(e);
      // 取出文件信息
      var file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 2.处理文件后缀
      var ext = [".jpg", ".png", ".jpeg", ".gif"];
      var extName = file.name.slice(file.name.lastIndexOf("."));
      if (!ext.some((item) => item == extName)) {
        warningAlert("上传文件格式不正确");
        return;
      }
      // 3.上传正确的文件路径
      this.imgUrl = URL.createObjectURL(file);
      // 4.再将文件存放到form.img中
      this.form.img = file;
    },
    // 获取分类详情
    getDetail(id) {
      oneCate({id}).then(res=>{
        this.form=res.data.list
        this.form.id=id
        // 获取图片路径
        this.imgUrl=this.$preImg+this.form.img
      })
    },
    update(){
      updateCate(this.form).then(res=>{
        successAlert(res.data.msg)
         this.cancel();
        this.reqCateList();
      })
    }
  },
  mounted() {
    this.reqCateList();
  },
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img-box {
  height: 150px;
  width: 150px;
  border: 1px dashed blue;
  position: relative;
}
.img-box h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 150px;
}
.img-box img {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
}
.img-box input {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>