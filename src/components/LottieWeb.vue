<template>
  <div ref="container"></div>
</template>

<script setup>
import lottie from 'lottie-web';
import { ref, onMounted, onUnmounted, shallowRef, nextTick } from 'vue';

const defaultConfig = {
  renderer: 'svg',
  loop: true,
  autoplay: true
};

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  options: {
    type: Object,
    default: () => ({})
  },
  animationData: {
    type: Object,
    required: true
  }
});

const container = ref(null);
const instance = shallowRef(null);

const init = () => {
  const conf = {
    ...defaultConfig,
    ...props.options,
    animationData: props.animationData
  };
  instance.value = lottie.loadAnimation({
    container: container.value,
    ...conf
  });
};

onMounted(() => {
  nextTick(() => {
    init();
  });
});

onUnmounted(() => {
  if (instance.value && instance.value.destroy) {
    instance.value.destroy();
  }
});
</script>
