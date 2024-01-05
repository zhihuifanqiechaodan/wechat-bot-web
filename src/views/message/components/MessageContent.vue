<template>
  <div class="message-content">
    <div v-if="botStore.currentMessageInfo" class="message-content-box">
      <MessageContentHeader />
      <a-list
        :virtualListProps="{ height: 520 }"
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
    <div v-else class="empty">Chat Bot</div>
  </div>
</template>

<script setup>
import MessageTemplate from './MessageTemplate.vue';
import MessageContentHeader from './MessageContentHeader.vue';
import MessageContentReply from './MessageContentReply.vue';
import { useBotStore } from '@/store/bot';

const botStore = useBotStore();
</script>

<style lang="less" scoped>
.message-content {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;

  .message-content-box {
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
