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
        <div class="header-wrapper-left_name-message ellipsis">
          <div class="header-wrapper-left_name ellipsis">
            {{ botStore.currentMessageInfo.contactName }}
          </div>
        </div>
      </div>
      <div class="header-wrapper_right">设置功能</div>
    </div>
  </div>
</template>

<script setup>
import { useBotStore } from '@/store/bot';
import { isExternal } from '@/utils/validate';

const botStore = useBotStore();
</script>

<style lang="less" scoped>
.message-content-header-wrapper {
  .message-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 0.5px solid #999999;
    .header-wrapper-left {
      flex: 1;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .header-wrapper-left_name-message {
        padding-left: 10px;

        .header-wrapper-left_name {
          font-weight: bold;
        }
      }
    }

    .header-wrapper_right {
      padding-left: 100px;
    }
  }
}
</style>
