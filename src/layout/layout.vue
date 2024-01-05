<template>
  <div class="layout-wrapper">
    <sidebar />
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<style lang="less" scoped>
.layout-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #d1d6e2;

  .app-main {
    flex: 1;
  }
}
</style>
