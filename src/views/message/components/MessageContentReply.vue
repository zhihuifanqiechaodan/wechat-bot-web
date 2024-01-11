<template>
  <div class="message-content-reply">
    <a-spin :loading="loading" class="reply-spin">
      <div class="input-wrapper">
        <a-input
          @keyup.enter="handleSendText"
          v-model="messageContent"
          placeholder="Input message here and press enter to send"
          size="large"
        />
      </div>
      <div
        @click="handleSendText"
        class="send-wrapper"
        :class="{ 'end-wrapper_active': messageContent }"
      >
        <svg-icon name="send" class="send-icon" />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import useMessageHook from '@/hooks/message.hook';
import SvgIcon from '@/components/SvgIcon';
import { useBotStore } from '@/store/bot';
import { notSupportPuppets } from '@/config/bot.config';
import loadingHook from '@/hooks/loading.hook';
import { ref } from 'vue';

const messageHook = useMessageHook();
const botStore = useBotStore();
const { loading, setLoading } = loadingHook();

const messageContent = ref('');

const handleSendText = async () => {
  if (messageContent.value.trim()) {
    setLoading(true);

    await messageHook.say({
      messageContent: messageContent.value,
      messageType: 7
    });

    if (notSupportPuppets.includes(botStore.botPayload.puppet)) {
      if (botStore.messageHistoryInfo[botStore.currentMessageInfo.contactId]) {
        botStore.messageHistoryInfo[botStore.currentMessageInfo.contactId].push(
          {
            contactId: botStore.currentMessageInfo.contactId,
            contactName: botStore.currentMessageInfo.contactAvatar,
            contactAvatar: botStore.currentMessageInfo.contactAvatar,
            contactType: 0,
            talkerId: botStore.botPayload.id,
            talkerName: botStore.botPayload.name,
            talkerAvatar: botStore.botPayload.avatar,
            messageId: new Date().getTime(),
            messageType: 7,
            messageContent: messageContent.value,
            messageTimestamp: new Date().getTime(),
            unreadMessageCount: 0
          }
        );
      }
    }

    messageContent.value = '';

    setLoading(false);
  }
};
</script>

<style lang="less" scoped>
.message-content-reply {
  height: 70px;
  padding: 0 20px;

  .reply-spin {
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 10px;

    .input-wrapper {
      position: relative;
      flex: 1;
      padding-right: 10px;

      .icon-wrapper {
        position: absolute;
        right: 40px;
        top: 0;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 24px;
        color: #adafb1;

        .image-icon {
          cursor: pointer;
        }
      }
    }

    .send-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background-color: #296eff;
      border-radius: 10px;
      opacity: 0.3;

      &.end-wrapper_active {
        opacity: 1;
      }

      .send-icon {
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
}
</style>

<style lang="less">
.message-content-reply {
  .el-input {
    height: 50px;

    .el-input__wrapper {
      border-radius: 10px;
      box-shadow: none;
      padding: 0 20px;
      background-color: #f8f8f8;
    }
  }
}
</style>
@/hooks/message.hook
