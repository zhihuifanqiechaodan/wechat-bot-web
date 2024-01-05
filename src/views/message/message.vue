<template>
  <div class="message-container">
    <MessageList />
    <MessageContent />
  </div>
</template>

<script setup>
import MessageList from './components/MessageList.vue';
import MessageContent from './components/MessageContent.vue';
</script>

<style lang="less" scoped>
.message-container {
  display: flex;
  height: 100%;
}
</style>
