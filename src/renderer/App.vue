<template>
  <div class="App">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="ES版本检查" name="ESCheck">
        <ESCheck/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import Demo from './Demo'

export default {
  components: {
    // Demo
    ESCheck: () => import('./ESCheck.vue')
  },
  data () {
    return {
      activeTab: 'ESCheck'
    }
  },
  // methods: {

  // },
  // mounted () {

  // }
}
</script>

<style lang="scss">

</style>
