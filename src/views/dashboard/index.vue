<template>
  <div class="dashboard-container">
    <adminDashboard></adminDashboard>   
    <!-- <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-zhishizhongxin1"></use>
    </svg> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
