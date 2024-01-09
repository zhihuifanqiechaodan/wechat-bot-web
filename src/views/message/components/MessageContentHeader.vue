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
      <RoomFeaturePopover />
    </div>
  </div>
</template>

<script setup>
import { useBotStore } from '@/store/bot';
import { isExternal } from '@/utils/validate';
import RoomFeaturePopover from './RoomFeaturePopover.vue';

const botStore = useBotStore();
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
