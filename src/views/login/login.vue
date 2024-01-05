<template>
  <div class="login-container">
    <div class="lottie-box">
      <LottieWeb :animationData="animationData" class="lottie" />
      <h1 class="intro">Wechat Bot 辅助机器人</h1>
      <div class="description">高效、简便、自动管理</div>
    </div>
    <div class="login-wrapper">
      <h1 class="login-title">扫码登录</h1>
      <div class="login-subheading">请使用微信移动端扫码二维码</div>
      <div class="qrcode-box">
        <QrcodeVue :value="botStore.qrcode" :size="200" />
        <div
          v-if="!botStore.processStatus"
          @click="startPrecess"
          class="mask-wrapper"
        >
          <icon-refresh class="icon-refresh" />
          <div class="mask-title">Restart</div>
        </div>
      </div>
    </div>
    <a-space class="setting-wrapper">
      <a-tooltip content="二维码失效或服务异常时重新启动">
        <a-button @click="startPrecess" :loading="loading" type="primary">
          <template #icon>
            <icon-sync />
          </template>
          <template #default>Restart</template>
        </a-button>
      </a-tooltip>
    </a-space>
  </div>
</template>

<script setup>
import LottieWeb from '@/components/LottieWeb.vue';
import animationData from '@/lotties/wechat.lottie.json';
import QrcodeVue from 'qrcode.vue';
import { IconSync, IconRefresh } from '@arco-design/web-vue/es/icon';
import { addBotStart, getBotAuthQrcode } from '@/api/bot.api';
import { useBotStore } from '@/store/bot';
import loadingHook from '@/hooks/loading.hook';
import { onMounted } from 'vue';

const { loading, setLoading } = loadingHook();

const botStore = useBotStore();

const startPrecess = async () => {
  setLoading(true);

  try {
    await addBotStart();

    botStore.setProcessStatus({ processStatus: true });
  } catch (error) {
    console.log('🚀 ~ file: login.vue:51 ~ startPrecess ~ error:', error);
  } finally {
    setLoading(false);
  }
};

onMounted(async () => {
  if (botStore.processStatus) {
    const { qrcode } = await getBotAuthQrcode();
    botStore.setQrcode({ qrcode });
  }
});
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  background-color: #ede9ee;

  .lottie-box {
    .lottie {
      width: 400px;
    }
    .intro {
      text-align: center;
    }

    .description {
      text-align: center;
      color: #999999;
    }
  }

  .login-wrapper {
    position: absolute;
    right: 40px;
    top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    height: 550px;
    background: #fff;
    border-radius: 10px;
    .login-title {
      font-weight: bold;
      font-size: 24px;
    }
    .login-subheading {
      color: #999999;
    }

    .qrcode-box {
      position: relative;
      margin: 40px;
      padding: 10px;
      border-radius: 10px;
      overflow: hidden;

      .mask-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        cursor: pointer;

        .icon-refresh {
          font-size: 40px;
        }

        .mask-title {
          padding-top: 10px;
          font-size: 18px;
        }
      }
    }
  }

  .setting-wrapper {
    position: absolute;
    bottom: 15px;
    left: 20px;
  }
}
</style>
