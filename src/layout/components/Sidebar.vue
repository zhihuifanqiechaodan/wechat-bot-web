<template>
  <div class="sidebar-wrapper">
    <div class="menu-item">
      <icon-message size="18" />
      <div class="menu-item-title">消息</div>
    </div>
  </div>
</template>

<script setup>
import { IconMessage } from '@arco-design/web-vue/es/icon';
</script>

<style lang="less" scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  height: 100%;
  background-color: red;

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
}
</style>
