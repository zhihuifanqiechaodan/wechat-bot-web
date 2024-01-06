<template>
  <div class="message-list">
    <div class="message-box">
      <div class="message-title">消息</div>
      <a-list :virtualListProps="{ height: 570 }" :data="botStore.messageList">
        <template #item="{ item }">
          <a-list-item :key="item.contactId">
            <div
              @click="handleMessageClick(item)"
              class="message-item"
              :class="{
                'active-message-item':
                  botStore.currentMessageInfo &&
                  botStore.currentMessageInfo.contactId === item.contactId
              }"
            >
              <a-badge :count="item.unreadMessageCount" :max-count="99">
                <a-avatar
                  :imageUrl="
                    isExternal(item.contactAvatar) ? item.contactAvatar : ''
                  "
                  :size="36"
                >
                  {{
                    isExternal(item.contactAvatar) ? '' : item.contactName[0]
                  }}
                </a-avatar>
              </a-badge>
              <div class="message-item_right ellipsis">
                <div class="message-item_name-date">
                  <div class="message-item_name ellipsis">
                    {{ item.contactName }}
                  </div>
                  <div v-if="item.messageTimestamp" class="message-item_date">
                    {{ formatMessageDate(item.messageTimestamp) }}
                  </div>
                </div>
                <div class="message-item_message-unreadMessageCount">
                  <div class="message-item_message ellipsis">
                    {{ filterMessage(item) }}
                  </div>
                </div>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
// import { watch } from 'vue';
import { useBotStore } from '@/store/bot';
// import { computed } from 'vue';
import { isExternal } from '@/utils/validate';

dayjs.extend(weekday);

const botStore = useBotStore();

// const messageList = computed(() => botStore.messageList);

const filterMessage = (message) => {
  let text = '';
  switch (message.messageType) {
    case 1:
      text = '[文件]';
      break;
    case 2:
      text = '[语音]';
      break;
    case 3: {
      text = '[名片]';

      break;
    }
    case 4:
      text = '[聊天记录]';

      break;
    case 5:
      text = '[动画表情]';

      break;
    case 6:
      text = '[图片]';
      break;
    case 7:
      text = message.messageContent;
      break;
    case 8:
      text = '[位置]';
      break;
    case 9:
      text = '[小程序]';
      break;
    case 10:
      text = message.messageContent;
      break;
    case 11:
      text = message.messageContent;
      break;
    case 12:
      text = message.messageContent;
      break;
    case 13:
      text = message.messageContent;
      break;
    case 14:
      text = '[链接]';
      break;
    case 15:
      text = '[视频]';
      break;
    case 16:
      text = message.messageContent;

      break;
    default:
      text = message.messageContent;

      break;
  }

  return text;
};

// watch(
//   () => botStore.chooseContact,
//   (contact) => {
//     const message = state.messageList.find(
//       (item) => item.contactId === contact.contactId
//     );

//     const messageIndex = state.messageList.findIndex(
//       (item) => item.contactId === contact.contactId
//     );
//     if (message) {
//       state.messageList.splice(messageIndex, 1);

//       state.messageList.unshift(message);

//       handleMessageClick(message);
//     } else {
//       const message = {
//         contactId: contact.contactId,
//         contactName: contact.alias || contact.name,
//         contactAvatar: contact.avatar,
//         contactType: 0,
//         talkerId: '',
//         talkerName: '',
//         talkerAvatar: '',
//         messageId: '',
//         messageType: 0,
//         messageContent: '',
//         messageTimestamp: '',
//         unreadMessageCount: 0
//       };

//       state.messageList.unshift(message);

//       botStore.setCurrentMessageInfo(message);

//       botStore.setCurrentMessageHistoryList([]);
//     }
//   }
// );

const formatMessageDate = (date) => {
  const now = dayjs();
  const targetTime = dayjs(date);

  if (targetTime.isSame(now, 'day')) {
    return targetTime.format('HH:mm:ss');
  } else {
    return targetTime.format('YYYY/MM/DD日');
  }
};

const handleMessageClick = async (message) => {
  botStore.currentMessageInfo = message;

  for (let i = 0; i < botStore.messageList.length; i++) {
    const messageItem = botStore.messageList[i];

    if (messageItem.contactId === message.contactId) {
      messageItem.unreadMessageCount = 0;
      break;
    }
  }

  if (message.messageId) {
    botStore.currentMessageHistoryList =
      botStore.messageHistoryInfo[message.contactId];
  } else {
    botStore.messageList.unshift(message);
  }
};
</script>

<style lang="less" scoped>
.message-list {
  width: 290px;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  user-select: none;

  .message-box {
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .message-title {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: bold;
    }

    .message-item {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 5px;
      box-sizing: border-box;
      border-radius: 10px;
      cursor: pointer;
      margin: 1px 0;

      &:hover {
        background-color: #edeeee;
      }

      &.active-message-item {
        background-color: #e6f0ff;

        .message-item_right {
          .message-item_name-date {
            .message-item_date {
              color: #999999;
            }
          }
        }
      }

      .message-item_right {
        flex: 1;
        padding-left: 20px;

        .message-item_name-date {
          display: flex;
          justify-content: space-between;

          .message-item_name {
            flex: 1;
            font-weight: bold;
          }

          .message-item_date {
            padding-left: 10px;
            font-size: 12px;
            color: #b4b6b7;
          }
        }

        .message-item_message-unreadMessageCount {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .message-item_message {
            flex: 1;
            padding-right: 10px;
            font-size: 13px;
          }

          .message-item_unread-message-count {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #d64041;
            color: #fff;
            padding: 2px 4px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.message-list {
  .arco-list-wrapper {
    background-color: #fff;
  }

  .arco-list-item {
    padding: 0 5px !important;
    border-bottom: none !important;
  }

  .arco-list-item-main {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .arco-list-bordered {
    border: none;
  }
}
</style>
