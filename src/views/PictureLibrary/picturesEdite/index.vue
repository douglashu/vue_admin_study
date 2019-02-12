<template>
  <div class="app-container">
    <PageTopBack></PageTopBack>
    <el-row class="top">
      <el-col :span="8">
        <el-card class="PicPreBox">
          <h3 class="commonTitle">图片预览：</h3>

          <PreView  imgSrc="http://photo.tuchong.com/3265851/f/337445459.jpg"></PreView>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left:10px">
        <el-card class>
          <h3 class="commonTitle">下载量：</h3>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="替换图片">
        <div class>
          <el-upload
            class="uploadPic"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="所属类别">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="可下载">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="对以下人可见">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="全部" name="type"/>
          <el-checkbox label="员工" name="type"/>
          <el-checkbox label="管理员" name="type"/>
          <el-checkbox label="超级管理员" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-radio-group v-model="form.resource">
          <el-radio label="私密"/>
          <el-radio label="公开"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item label="描述文字">
        <div class>
          <Tinymce :height="300" v-model="content"></Tinymce>
        </div>
      </el-form-item>

      <!-- <tinymce /> -->
      <!-- <div>{{content}}</div> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class>提交编辑内容</el-button>
        <el-button @click="onCancel" class>放弃修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageTopBack from "@/components/PageTopBack";
import LineChart from "./components/LineChart";
import Tinymce from "@/components/Tinymce";
import PreView from "@/components/PreView";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      content: "我是富文本编辑器的内容",
      //tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
      editorSetting: {
        height: 400
      }
    };
  },
  components: {
    PageTopBack,
    LineChart,
    Tinymce,
    PreView
  },
  methods: {
    _handleContent(content) {
      console.log(content);
    },
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(1111, file);
    },
    handleExceed(files, fileList) {
      console.log(this.fileList);
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  margin-bottom: 10px;
}
.PicPreBox {
  position: relative;
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 800px;

  .preBoxs {
    box-sizing: border-box;
    padding: 10px;
  }
  .uploadPicBox {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0;
    top: 0;
    opacity: 0;
    transition: all 0.3s ease-in;
    .uploadPic {
      margin: 100px auto 0 auto;
      text-align: center;
    }
    &:hover {
      opacity: 0.9;
    }
  }
}
.line {
  text-align: center;
}
</style>

