<template>
  <section class="historyTabs">
    <div class="" style="text-align:right ">
        <el-button type="text"  icon="el-icon-close" class="backButton" @click="back">返回</el-button>
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
    back() {
      this.$router.go(-1);
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
    .backButton{
      float:right;
    }
}
</style>
