<template>
  <a-popover position="br" trigger="click" content-class="message-room-popover">
    <a-button type="text">
      <template #icon>
        <icon-more />
      </template>
    </a-button>
    <template #content>
      <div class="setting-wrapper">
        <div @click="handleSetting" class="setting-item">
          <icon-settings /> 设置
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup>
import { IconMore, IconSettings } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';
import { inject } from 'vue';

const visible = ref(false);

const roomConfigDrawerVisible = inject('roomConfigDrawerVisible');

const handleSetting = () => {
  roomConfigDrawerVisible.value = true;
  visible.value = false;
};
</script>

<style lang="less" scoped>
.message-room-popover {
  .setting-wrapper {
    .setting-item {
      height: 40px;
      padding: 10px;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        background-color: #edeeee;
      }
    }
  }
}
</style>

<style lang="less">
.message-room-popover {
  width: 120px;
  padding: 2px;
  border-radius: 10px;
  .arco-popover-content {
    margin: 0;
  }
}
</style>
