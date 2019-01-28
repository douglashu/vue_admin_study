<template>
  <section class="app-main">
    <HistoryTabs ></HistoryTabs>
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
import HistoryTabs from '@/components/HistoryTabs'
export default {
  name: 'AppMain',
  components:{
    HistoryTabs
  },
  computed: {
    // $route: {
    //   handler: function(route) {
    //     console.log(222,route)
    //   },
    //   immediate: true
    // }
  },
  watch: {
    // $route: {
    //   handler: function(route,val) {
    //     console.log(111,route,val)
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
