<template>
  <router-view></router-view>

  <a-modal
    v-model:visible="visible"
    hide-cancel
    :mask-closable="false"
    :closable="false"
    @ok="handleOk"
  >
    <template #title> 异常提示 </template>
    <div>当前用户退出登录或服务异常</div>
  </a-modal>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useBotStore } from '@/store/bot';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Notification } from '@arco-design/web-vue';

const router = useRouter();
const currentInstance = getCurrentInstance();
const botStore = useBotStore();

const visible = ref(false);

currentInstance.proxy.$socket.on('qrcode', ({ qrcode }) => {
  botStore.setQrcode({ qrcode });
});

currentInstance.proxy.$socket.on('onLogin', ({ botPayload }) => {
  botStore.setBotInfo({ botInfo: botPayload });

  router.replace('/bot/message');
});

currentInstance.proxy.$socket.on('onMessage', ({ messageInfo }) => {
  if (botStore.messageHistoryInfo[messageInfo.contactId]) {
    botStore.messageHistoryInfo[messageInfo.contactId].push(messageInfo);
  } else {
    botStore.messageHistoryInfo[messageInfo.contactId] = [messageInfo];
  }

  const messageIndex = botStore.messageList.findIndex(
    (item) => item.contactId === messageInfo.contactId
  );

  if (botStore.currentMessageInfo?.contactId === messageInfo.contactId) {
    messageInfo.unreadMessageCount = 0;
  } else {
    messageInfo.unreadMessageCount =
      (botStore.messageList[messageIndex]?.unreadMessageCount || 0) + 1;
  }

  if (messageIndex !== -1) {
    botStore.messageList.splice(messageIndex, 1);

    botStore.messageList.unshift(messageInfo);
  } else {
    botStore.messageList.unshift(messageInfo);
  }
});

currentInstance.proxy.$socket.on('onLogout', () => {
  botStore.setProcessStatus({ processStatus: false });

  visible.value = true;
});

currentInstance.proxy.$socket.on('stopProcess', () => {
  botStore.setProcessStatus({ processStatus: false });

  visible.value = true;
});

currentInstance.proxy.$socket.on('onRoomTopic', ({ editRoomTopicInfo }) => {
  const { roomPayload, topic, changerPayload } = editRoomTopicInfo;

  if (botStore.currentMessageInfo?.contactId === roomPayload.id) {
    botStore.currentMessageInfo.contactName = topic;
  }

  const index = botStore.messageList.findIndex(
    (item) => item.contactId === roomPayload.id
  );

  if (index !== -1) {
    botStore.messageList[index].contactName = topic;

    Notification.info({
      title: '群名称变更',
      content: `${changerPayload.name}修改群名为"${topic}"`,
      duration: 5 * 1000
    });
  }
});

const handleOk = () => {
  location.reload();
};
</script>
