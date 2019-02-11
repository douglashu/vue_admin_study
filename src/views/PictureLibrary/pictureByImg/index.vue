<template>
  <div class="container">
    <div v-viewer :style="`height:${window_height}px`">
      <vue-waterfall-easy
        class="imgItems"
        ref="waterfall"
        :imgsArr="imgsArr"
        @click="clickFn"
        @scrollReachBottom="()=>{this.$refs.waterfall.waterfallOver()}"
        :imgWidth="200"
        :maxCols = "cols"
      >
        <div class="img-info" slot-scope="props">
          <p class="some-info">第{{props.index+1}}张图片</p>
          <p class="some-info-note">{{props.value.info}}</p>
        </div>
      </vue-waterfall-easy>
    </div>
    <el-card class="paginationBox">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
    <!-- <viewer :images="imgsArr">
      <img v-for="(item,index) in imgsArr" :src="item.src" :key="index">
    </viewer>-->
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
      window_height: window.innerHeight - 250,
      imgsArr: [
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260405&di=d963897a17e8049b0a1d77f86cfbbb25&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec6f6fd1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=c866fc4646460cbafa134ec795c07137&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0dd7912397dda14435869378b8b7d0a20df48669.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=8b3734700da4df308df46a908584b52c&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec22fae1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src: "http://photo.tuchong.com/3265851/f/337445459.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "http://wx3.sinaimg.cn/orj360/988bf6ffgy1fxykyrsfkqj20zk1hcwsw.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260405&di=d963897a17e8049b0a1d77f86cfbbb25&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec6f6fd1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=c866fc4646460cbafa134ec795c07137&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0dd7912397dda14435869378b8b7d0a20df48669.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=8b3734700da4df308df46a908584b52c&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec22fae1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src: "http://photo.tuchong.com/3265851/f/337445459.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "http://wx3.sinaimg.cn/orj360/988bf6ffgy1fxykyrsfkqj20zk1hcwsw.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260405&di=d963897a17e8049b0a1d77f86cfbbb25&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec6f6fd1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=c866fc4646460cbafa134ec795c07137&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F0dd7912397dda14435869378b8b7d0a20df48669.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548564260404&di=8b3734700da4df308df46a908584b52c&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmiddle%2F53762aebgc52bec22fae1%26690",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src: "http://photo.tuchong.com/3265851/f/337445459.jpg",
          info: "一些图片描述文字"
        },
        {
          href: "###",
          src:
            "http://wx3.sinaimg.cn/orj360/988bf6ffgy1fxykyrsfkqj20zk1hcwsw.jpg",
          info: "一些图片描述文字"
        }
      ],
      cols:Math.floor
      (0.8*window.innerWidth/200)
    };
  },
  components: {
    vueWaterfallEasy
  },
  created() {
    this.fetchData();
  },
  methods: {
    clickFn() {
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        console.log("img clicked");
      }
    },
    // 加载更多
    // getData() {
    //   this.imgsArr = this.imgsArr.concat(this.imgsArr);
    //   console.log(this.imgsArr.length);
    //   this.$refs.waterfall.waterfallOver();
    // },
    fetchData() {
      this.listLoading = true;
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items.splice(0, 10);
      //   this.listLoading = false;
      // });
    },
    // 搜索操作
    search() {
      alert(1);
    },
    // 多选操作
    handleSelectionChange(val) {
      console.log(val);
    },
    // 查看操作
    handleClick(val) {
      console.log(val);
    },
    // 点击编辑
    handleEditeClick(val) {}
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
}
.paginationBox {
  // text-align: center
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgItems {
  margin-bottom: 10px;
  overflow: hidden;
  .img-info {
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    .some-info-note{
      color: #d3d3d3;
      font-size: 12px
    }
  }
}
</style>
