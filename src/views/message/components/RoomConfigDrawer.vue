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
      <a-form
        ref="formRef"
        :model="state.contactConfig"
        size="small"
        auto-label-width
      >
        <a-form-item label="群名称">
          <a-input
            v-model="topic"
            placeholder="Please enter something"
            allow-clear
            @change="handleContactNameChange"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="关键字回复">
          <a-switch v-model="state.contactConfig.isKeywordReplyEnabled" />
        </a-form-item>
      </a-form>
    </a-space>
  </a-drawer>
</template>

<script setup>
import { inject, ref, reactive } from 'vue';
import { useBotStore } from '@/store/bot';
import {
  addBotEditTopic,
  getBotContactConfig,
  addBotContactConfigUpdate
} from '@/api/bot.api';
import loadingHook from '@/hooks/loading.hook';

const { loading, setLoading } = loadingHook();

const botStore = useBotStore();

const roomConfigDrawerVisible = inject('roomConfigDrawerVisible');

const topic = ref('');

const state = reactive({
  contactConfig: {}
});

const onBeforeOpen = async () => {
  topic.value = botStore.currentMessageInfo?.contactName;

  const { contactConfig } = await getBotContactConfig({
    contactId: botStore.currentMessageInfo.contactId
  });

  state.contactConfig = contactConfig;
};

const handleOk = async () => {
  setLoading(true);

  await addBotContactConfigUpdate({
    contactConfig: state.contactConfig,
    contactId: botStore.currentMessageInfo.contactId
  });

  setLoading(false);

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
