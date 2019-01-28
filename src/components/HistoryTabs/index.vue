<template>
  <section class="historyTabs">
    <div class="box-card">
      <div class="sliderBox">
        <el-button
          v-for="(item,index) in tabs"
          size="mini"
          @click="navi(item)"
          :type="current==item.name?'success':'default'"
          :key="index"
        >
          {{item.name}}
          <i class="el-icon-circle-close el-icon--right" @click.stop="delect(item)"></i>
        </el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "historyTabs",
  data() {
    return {
      tabs: [],
      current: ""
    };
  },
  computed: {},
  watch: {
    $route: {
      handler: function(route, val) {
        // console.log(222,route)
        this.tabs = this.$store.getters.historyTabs;
        this.current = route.name;
        // console.log(111,route.matched)
      },
      immediate: true
    }
  },
  methods: {
    navi(to) {
      this.$router.push(to.path);
    },
    //   删除历史记录
    delect(dst) {
      if (this.tabs.length <= 1) {
        this.$message({
          showClose: true,
          message: "警告哦，这是最后的页面了",
          type: "warning"
        });
        return false;
      }
      this.$store.dispatch("DeledctHistory", dst);

      this.$router.push(this.tabs[this.tabs.length - 1].path);
    }
  }
};
</script>

<style scoped lang="scss">
.box-card {
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  .sliderBox{
    overflow-x: scroll;
    white-space: nowrap;
    min-width: 100%;
    height: 50px
  }
}
</style>
