<template>
  <div class="sidebar-wrapper">
    <BotPopover />
    <div class="menu-item-wrapper">
      <router-link
        v-for="routeItem in routeList"
        :to="routeItem.path"
        :key="routeItem.path"
        :class="{
          'menu-item_sel': route.path === routeItem.path
        }"
        class="menu-item"
      >
        <component :is="routeItem.icon" size="18"></component>
        <div class="menu-item-title">{{ routeItem.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { IconMessage, IconSettings } from '@arco-design/web-vue/es/icon';
import { useRoute } from 'vue-router';
import BotPopover from './BotPopover.vue';
import { ref, shallowRef } from 'vue';

const route = useRoute();

const routeList = ref([
  {
    path: '/bot/message',
    title: '消息',
    icon: shallowRef(IconMessage)
  },
  {
    path: '/bot/setting',
    title: '设置',
    icon: shallowRef(IconSettings)
  }
]);
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
