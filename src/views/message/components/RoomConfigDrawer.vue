<template>
  <a-drawer
    popup-container="#layout-wrapper"
    :visible="roomConfigDrawerVisible"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="350"
    :ok-loading="loading"
    @before-open="onBeforeOpen"
  >
    <template #title> 设置 </template>
    <a-space v-if="botStore.currentMessageInfo" direction="vertical" fill>
      <a-input
        v-model="topic"
        placeholder="Please enter something"
        allow-clear
        @change="handleContactNameChange"
      >
        <template #prepend> 群名称 </template>
      </a-input>
    </a-space>
  </a-drawer>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useBotStore } from '@/store/bot';
import { addBotEditTopic } from '@/api/bot.api';
import loadingHook from '@/hooks/loading.hook';

const { loading, setLoading } = loadingHook();

const botStore = useBotStore();

const roomConfigDrawerVisible = inject('roomConfigDrawerVisible');

const topic = ref('');

const onBeforeOpen = () => {
  topic.value = botStore.currentMessageInfo?.contactName;
};

const handleOk = () => {
  roomConfigDrawerVisible.value = false;
};
const handleCancel = () => {
  roomConfigDrawerVisible.value = false;
};

const handleContactNameChange = async (value) => {
  if (botStore.currentMessageInfo.contactName !== value) {
    setLoading(true);

    await addBotEditTopic({
      contactId: botStore.currentMessageInfo.contactId,
      topic: value
    });

    setLoading(false);
  }
};
</script>

<style lang="less" scoped></style>
