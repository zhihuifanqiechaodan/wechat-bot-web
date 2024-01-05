<template>
  <div class="message-content-reply">
    <div class="input-wrapper">
      <a-input
        @keyup.enter="handleSendText"
        v-model="messageContent"
        placeholder="Input message here and press enter to send"
      />
    </div>

    <div
      @click="handleSendText"
      class="send-wrapper"
      :class="{ 'end-wrapper_active': messageContent }"
    >
      <svg-icon name="send" class="send-icon" />
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import useMessageHook from '@/hooks/message.hook';
import SvgIcon from '@/components/SvgIcon';

const messageHook = useMessageHook();

const state = reactive({
  messageContent: '',
  loading: false
});

const { messageContent } = toRefs(state);

const handleSendText = async () => {
  if (state.messageContent.trim()) {
    state.loading = true;

    await messageHook.say({
      messageContent: state.messageContent,
      messageType: 7
    });

    state.messageContent = '';

    state.loading = false;
  }
};
</script>

<style lang="less" scoped>
.message-content-reply {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;

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
