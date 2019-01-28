<template>
  <div class="container">
    <el-card class="box">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        multiple
        :auto-upload="false"
        ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    </el-card>
  </div>
</template> 

<script>
// import { getList } from "@/api/table";
import vueWaterfallEasy from "vue-waterfall-easy";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  filters: {},
  data() {
    return {
      dialogImageUrl: [],
      dialogVisible: false
    };
  },
  components: {
    vueWaterfallEasy
  },
  created() {},
  methods: {
    submitUpload() {
      console.log(1)
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 700px;
  // background: red;
  box-sizing: border-box;
  padding: 0 20px;
  .box {
    margin-top: 20px;
  }
}
</style>
