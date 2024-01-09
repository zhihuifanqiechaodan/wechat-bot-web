<template>
  <a-drawer
    popup-container="#message-content-box"
    :visible="roomConfigDrawerVisible"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="350"
  >
    <template #title> 设置 </template>
    <a-space v-if="botStore.currentMessageInfo" direction="vertical" fill>
      <a-input
        v-model="botStore.currentMessageInfo.contactName"
        placeholder="Please enter something"
        allow-clear
      >
        <template #prepend> 群名称 </template>
      </a-input>
    </a-space>
  </a-drawer>
</template>

<script setup>
import { inject } from 'vue';
import { useBotStore } from '@/store/bot';

const botStore = useBotStore();

const roomConfigDrawerVisible = inject('roomConfigDrawerVisible');

const handleOk = () => {
  roomConfigDrawerVisible.value = false;
};
const handleCancel = () => {
  roomConfigDrawerVisible.value = false;
};
</script>

<style lang="less" scoped></style>
