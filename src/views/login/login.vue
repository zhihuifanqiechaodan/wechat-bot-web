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
        <QrcodeVue :value="qrcode" :size="200" />
      </div>
    </div>
    <div class="setting-wrapper">
      <a-button @click="openPuppetServicesModal" type="primary">
        <template #icon>
          <icon-settings />
        </template>
        <template #default>Puppet Service</template>
      </a-button>
    </div>
  </div>

  <a-modal v-model:visible="puppetServicesModalVisible" @ok="handleOk">
    <template #title> Title </template>
    <div>
      You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.
    </div>
  </a-modal>
</template>

<script setup>
import LottieWeb from '@/components/LottieWeb.vue';
import animationData from '@/lotties/wechat.lottie.json';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';
import { IconSettings } from '@arco-design/web-vue/es/icon';

const qrcode = ref('');

const puppetServicesModalVisible = ref(false);
const openPuppetServicesModal = () => {
  puppetServicesModalVisible.value = true;
};

const handleOk = () => {};
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
      padding: 40px 0;
    }
  }

  .setting-wrapper {
    position: absolute;
    bottom: 15px;
    left: 20px;
  }
}
</style>
