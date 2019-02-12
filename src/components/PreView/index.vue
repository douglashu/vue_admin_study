<template>
  <div class="previewBox" v-viewer  v-loading="isLoading">
    <img class="imgItems" :class="isWidth?'containW':'containH'" :src="src" alt  @click="_preHandler" ref="imgDom" >
    <div class="preTip" @click="_preHandler">
      <i class="el-icon-zoom-in preTipIcon"></i>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";

export default {
  name: "preview",
  props: {
    imgSrc: {
      type: String,
      default:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549964914615&di=a627920a3fefa84c5daead47179f7718&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F16%2F02%2F22%2F12z58PICBDK_1024.jpg"
    }
  },
  components: {},
  data() {
    return {
      isWidth: true,
      isLoading: true,
      img:null,
      src: ""
    };
  },
  computed: {},
  created() {
    let img = new Image();
    img.src = this.imgSrc;

    // this.isLoading = false
    img.onload = () => {
      let w = img.width;
      let h = img.height;
    
      if (w >= h) {
        this.isWidth = true;
      } else {
        this.isWidth = false;
      }
      this.img = img
      this.isLoading = false;
      this.src = this.imgSrc;
    };
  },
  methods:{
      _preHandler(){
           console.log(this.img)
           event.preventDefault();
           
           this.$refs.imgDom.click() 
      }
  }
};
</script>
<style lang="scss" scoped>
.previewBox {
  max-height: 350px;
  width: 100%;
  position: relative;
  cursor: pointer;
  line-height: 100%;
  .containW {
    width: 100%;
  }
  .containH {
    height: 100%;
    max-height: 350px;
    margin: 0 auto;
    display: block;
  }
  .preTip {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: all 0.4s ease;
    text-align: center;
    vertical-align: middle;
    .preTipIcon {
      color: #fff;
      font-size: 50px;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -25px;
      margin-top: -25px;
      //   display: block
    }
    z-index: 1;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
        
