<template>
  <a-popover position="rt" trigger="click" content-class="setting-popover">
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
      <div class="setting-wrapper">
        <div class="bot-info">
          <a-avatar
            :imageUrl="
              isExternal(botStore.botInfo.avatar) ? botStore.botInfo.avatar : ''
            "
            :size="55"
          >
            {{
              isExternal(botStore.botInfo.avatar)
                ? ''
                : botStore.botInfo.name[0]
            }}
          </a-avatar>
          <div class="bot-name">{{ botStore.botInfo.name }}</div>
        </div>
        <a-divider />
        <div @click="handleSetting" class="setting-item">设置</div>
        <div @click="handleLogout" class="setting-item">退出登录</div>
      </div>
    </template>
  </a-popover>
</template>

<script setup>
import { isExternal } from '@/utils/validate';
import { useBotStore } from '@/store/bot';
import { addBotLogout } from '@/api/bot.api';
import { useRouter } from 'vue-router';

const router = useRouter();
const botStore = useBotStore();

const handleLogout = async () => {
  await addBotLogout();
};

const handleSetting = () => {
  router.push('/bot/setting');
};
</script>

<style lang="less" scoped>
.bot-avatar {
  padding: 10px 0;
  cursor: pointer;
}
</style>

<style lang="less">
.setting-popover {
  width: 320px;
  padding: 10px;
  border-radius: 10px;
  .setting-wrapper {
    .bot-info {
      display: flex;
      align-items: center;

      .bot-name {
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }

    .setting-item {
      padding: 10px;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        background-color: #edeeee;
      }
    }
  }
}
</style>
