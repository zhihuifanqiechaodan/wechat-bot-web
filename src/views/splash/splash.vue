<template>
  <div class="splash-container">
    <LottieWeb :animationData="animationData" class="lottie" />
  </div>
</template>

<script setup>
import LottieWeb from '@/components/LottieWeb.vue';
import animationData from '@/lotties/wechat.lottie.json';
import { useRouter } from 'vue-router';

const router = useRouter();

setTimeout(() => {
  router.replace('/login');
}, 1 * 1000);
</script>

<style lang="less" scoped>
.splash-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  background-color: #ede9ee;
}
</style>
