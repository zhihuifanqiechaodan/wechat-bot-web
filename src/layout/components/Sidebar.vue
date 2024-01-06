<template>
  <div class="sidebar-wrapper">
    <a-popover position="rt" trigger="click">
      <div class="bot-avatar">
        <a-avatar
          :imageUrl="
            isExternal(botStore.botInfo.avatar) ? botStore.botInfo.avatar : ''
          "
          :size="30"
        >
          {{
            isExternal(botStore.botInfo.avatar) ? '' : botStore.botInfo.name[0]
          }}
        </a-avatar>
      </div>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </a-popover>

    <div class="menu-item-wrapper">
      <div
        class="menu-item"
        :class="{ 'menu-item_sel': route.path === '/bot/message' }"
      >
        <icon-message size="18" />
        <div class="menu-item-title">消息</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconMessage } from '@arco-design/web-vue/es/icon';
import { useBotStore } from '@/store/bot';
import { isExternal } from '@/utils/validate';
import { useRoute } from 'vue-router';

const route = useRoute();
const botStore = useBotStore();
</script>

<style lang="less" scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  height: 100%;
  padding: 10px 0;
  user-select: none;

  .bot-avatar {
    padding: 10px 0;
    cursor: pointer;
  }

  .menu-item-wrapper {
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 10px;
      cursor: pointer;

      &.menu-item_sel {
        background-color: #fff;
      }

      .menu-item-title {
        padding-top: 5px;
      }
    }
  }
}
</style>
