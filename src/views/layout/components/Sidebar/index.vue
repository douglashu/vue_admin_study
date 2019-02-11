<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
   {{roles}}
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar","roles","routersArr"]),
    routes() {
      console.log('更新', this.$router.options.routes)
      return [...this.$router.options.routes,...this.routersArr];
    },
    isCollapse() {
      return false;
    }
  },
  updated(){
    
  },
  created() {
    // console.log(0,this.$router);
  },
  methods:{
    _rolesSet(item){
     
      // if(!item.meta.roles){
      //   return true
      // }
      // let key = item.meta.roles || [];
      // let role = this.roles;
      // if(key.indexOf(role)>=0){
      //   return true
      // }else{
      //   return false
      // }
      // console.log('routez',item)
       return true
    }
  }
};
</script>

<style lang="scss" scoped>
.logoBox {
  width: 100%;
  height: 50px;
  background: red;
  color: #fff;

}
</style>
