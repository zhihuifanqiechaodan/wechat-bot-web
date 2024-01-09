<template>
  <div class="message-content">
    <div
      v-if="botStore.currentMessageInfo"
      class="message-content-box"
      id="message-content-box"
    >
      <MessageContentHeader />
      <a-list
        :virtualListProps="{ height: 500 }"
        :data="botStore.currentMessageHistoryList"
      >
        <template #item="{ item }">
          <a-list-item :key="item.messageId">
            <MessageTemplate :messageInfo="item" />
          </a-list-item>
        </template>
      </a-list>
      <MessageContentReply />
    </div>
    <div v-else class="empty">Wechat Bot</div>
  </div>
  <RoomConfigDrawer />
</template>

<script setup>
import MessageTemplate from './MessageTemplate.vue';
import MessageContentHeader from './MessageContentHeader.vue';
import MessageContentReply from './MessageContentReply.vue';
import { useBotStore } from '@/store/bot';
import { ref } from 'vue';
import RoomConfigDrawer from './RoomConfigDrawer.vue';
import { provide } from 'vue';

const botStore = useBotStore();

const roomConfigDrawerVisible = ref(false);

provide('roomConfigDrawerVisible', roomConfigDrawerVisible);
</script>

<style lang="less" scoped>
.message-content {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;

  .message-content-box {
    position: relative;
    background-color: #ffffff;
    border-radius: 10px;
  }
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 48px;
  color: #dedede;
  background-color: #ffffff;
  border-radius: 10px;
}
</style>

<style lang="less">
.message-content {
  .arco-list-wrapper {
    background-color: #fff;
  }

  .arco-list-item {
    padding: 0 !important;
    border-bottom: none !important;
  }

  .arco-list-bordered {
    border: none;
  }
}
</style>
