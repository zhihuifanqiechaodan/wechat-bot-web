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
  console.log(messageInfo);
});

currentInstance.proxy.$socket.on('stopProcess', () => {
  botStore.setProcessStatus({ processStatus: false });

  visible.value = true;
});

const handleOk = () => {
  location.reload();
};
</script>
