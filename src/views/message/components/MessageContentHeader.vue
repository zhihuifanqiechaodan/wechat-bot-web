<template>
  <div class="message-content-header-wrapper">
    <div class="message-content-header">
      <div class="header-wrapper-left ellipsis">
        <a-avatar
          :imageUrl="
            isExternal(botStore.currentMessageInfo.contactAvatar)
              ? botStore.currentMessageInfo.contactAvatar
              : ''
          "
          :size="36"
        >
          {{
            isExternal(botStore.currentMessageInfo.contactAvatar)
              ? ''
              : botStore.currentMessageInfo.contactName[0]
          }}
        </a-avatar>
        <div class="header-wrapper-left_name ellipsis">
          {{ botStore.currentMessageInfo.contactName }}
        </div>
      </div>
      <a-button
        v-if="botStore.currentMessageInfo.contactType === 1"
        @click="handleSetting"
        type="text"
      >
        <template #icon>
          <icon-more />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { useBotStore } from '@/store/bot';
import { isExternal } from '@/utils/validate';
import { IconMore } from '@arco-design/web-vue/es/icon';
import { inject } from 'vue';

const botStore = useBotStore();

const roomConfigDrawerVisible = inject('roomConfigDrawerVisible');

const handleSetting = () => {
  roomConfigDrawerVisible.value = true;
};
</script>

<style lang="less" scoped>
.message-content-header-wrapper {
  .message-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding-left: 15px;
    padding-right: 10px;
    box-sizing: border-box;
    border-bottom: 0.5px solid #999999;
    .header-wrapper-left {
      flex: 1;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .header-wrapper-left_name {
        flex: 1;
        width: 0;
        padding-left: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
