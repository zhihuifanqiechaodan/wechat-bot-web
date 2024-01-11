<template>
  <div
    class="message-template"
    :class="[
      botStore.botPayload.id === props.messageInfo.talkerId
        ? 'message-template_right'
        : 'message-template_left'
    ]"
  >
    <a-avatar
      v-if="botStore.botPayload.id !== props.messageInfo.talkerId"
      :imageUrl="
        isExternal(props.messageInfo.talkerAvatar)
          ? props.messageInfo.talkerAvatar
          : ''
      "
      class="message-item_avatar"
      :size="32"
    >
      {{
        isExternal(props.messageInfo.talkerAvatar)
          ? ''
          : props.messageInfo.talkerName[0]
      }}
    </a-avatar>
    <div class="message-template_detail">
      <div class="message-template_detail-name-date">
        <div
          v-if="botStore.botPayload.id === props.messageInfo.talkerId"
          class="message-template_detail-date"
        >
          {{ formatMessageDate(props.messageInfo.messageTimestamp) }}
        </div>
        <div class="message-template_detail-name">
          {{ props.messageInfo.talkerName || '匿名用户' }}
        </div>
        <div
          v-if="botStore.botPayload.id !== props.messageInfo.talkerId"
          class="message-template_detail-date"
        >
          {{ formatMessageDate(props.messageInfo.messageTimestamp) }}
        </div>
      </div>
      <div class="message-template_detail-content">
        <a
          v-if="
            props.messageInfo.messageType === 1 &&
            isJson(props.messageInfo.messageContent)
          "
          :href="JSON.parse(props.messageInfo.messageContent).remoteUrl"
          target="_blank"
          class="message-type-1"
        >
          <div class="message-type-1_name ellipsis--l2">
            {{ JSON.parse(props.messageInfo.messageContent)._name }}
          </div>
          <div class="message-type-1_svg">
            <svg-icon
              v-if="
                JSON.parse(props.messageInfo.messageContent)._mediaType ===
                'application/pdf'
              "
              name="pdf"
              class="pdf"
            />
            <svg-icon
              v-if="
                JSON.parse(props.messageInfo.messageContent)._mediaType ===
                'application/zip'
              "
              name="zip"
              class="zip"
            />
          </div>
        </a>
        <div
          v-else-if="props.messageInfo.messageType === 2"
          class="message-type-2"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="
            props.messageInfo.messageType === 3 &&
            isJson(props.messageInfo.messageContent)
          "
          class="message-type-3"
        >
          <div class="message-type-3_avatar-name">
            <a-image
              :src="JSON.parse(props.messageInfo.messageContent).avatar"
              class="message-type-3_avatar"
            />
            <div class="message-type-3_name">
              {{ JSON.parse(props.messageInfo.messageContent).name }}
            </div>
          </div>
          <div class="message-type-3_card">个人名片</div>
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 4"
          class="message-type-4"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <a-image
          v-else-if="
            props.messageInfo.messageType === 5 &&
            isExternal(props.messageInfo.messageContent)
          "
          :src="props.messageInfo.messageContent"
          width="345"
          fit="cover"
        />
        <a-image
          v-else-if="props.messageInfo.messageType === 6"
          :src="props.messageInfo.messageContent"
          width="345"
          fit="cover"
        />
        <div
          v-else-if="props.messageInfo.messageType === 7"
          class="message-type-7"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 8"
          class="message-type-8"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 9"
          class="message-type-9"
        >
          <div class="message-type-9_iconUrl-title">
            <svg-icon name="miniProgram" class="message-type-9_iconUrl" />
            <!-- 小程序logo做了防盗链处理，改为使用默认svg展示 -->
            <!-- <a-image
        :src="JSON.parse(props.messageInfo.messageContent).iconUrl"
        class="message-type-9_iconUrl"
      /> -->
            <div class="message-type-9_title">
              {{ JSON.parse(props.messageInfo.messageContent).title }}
            </div>
          </div>
          <div class="message-type-9_description">
            {{ JSON.parse(props.messageInfo.messageContent).description }}
          </div>
          <a-image
            :src="JSON.parse(props.messageInfo.messageContent).thumbUrl"
            class="message-type-9_thumbUrl"
          >
          </a-image>
          <div class="message-type-9-miniProgram">小程序</div>
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 10"
          class="message-type-10"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 11"
          class="message-type-11"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 12"
          class="message-type-12"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-else-if="props.messageInfo.messageType === 13"
          class="message-type-13"
        >
          {{ props.messageInfo.messageContent }}
        </div>
        <a
          v-else-if="
            props.messageInfo.messageType === 14 &&
            isJson(props.messageInfo.messageContent)
          "
          :href="JSON.parse(props.messageInfo.messageContent).url"
          target="_blank"
          class="message-type-14"
        >
          <div class="message-type-14_title">
            {{ JSON.parse(props.messageInfo.messageContent).title }}
          </div>
          <div class="message-type-14_description-thumbnailUrl">
            <div class="message-type-14_description ellipsis--l3">
              {{ JSON.parse(props.messageInfo.messageContent).description }}
            </div>
            <a-image
              :src="JSON.parse(props.messageInfo.messageContent).thumbnailUrl"
              width="50"
            >
            </a-image>
          </div>
        </a>
        <video
          v-else-if="
            props.messageInfo.messageType === 15 &&
            isExternal(props.messageInfo.messageContent)
          "
          controls
          class="message-type-15"
        >
          <source :src="props.messageInfo.messageContent" type="video/mp4" />
        </video>
        <div v-else class="message-type-default">
          {{ props.messageInfo.messageContent }}
        </div>
        <div
          v-if="botStore.botPayload.id === props.messageInfo.talkerId"
          class="self-message-date"
        >
          {{ formatMessageDate(props.messageInfo.messageTimestamp) }}
        </div>
      </div>
    </div>
    <a-avatar
      v-if="botStore.botPayload.id === props.messageInfo.talkerId"
      :imageUrl="
        isExternal(props.messageInfo.talkerAvatar)
          ? props.messageInfo.talkerAvatar
          : ''
      "
      class="message-item_avatar"
      :size="32"
    >
      {{
        isExternal(props.messageInfo.talkerAvatar)
          ? ''
          : props.messageInfo.talkerName[0]
      }}
    </a-avatar>
  </div>
</template>

<script setup>
import { isExternal } from '@/utils/validate';
import { useBotStore } from '@/store/bot';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import SvgIcon from '@/components/SvgIcon';

dayjs.extend(weekday);

const botStore = useBotStore();

const props = defineProps(['messageInfo']);

const isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

const formatMessageDate = (date) => {
  const now = dayjs();
  const targetTime = dayjs(date);

  if (targetTime.isSame(now, 'day')) {
    return targetTime.format('HH:mm:ss');
  } else {
    return targetTime.format('YYYY/MM/DD日');
  }
};
</script>

<style lang="less" scoped>
.message-template {
  display: flex;
  padding: 20px;

  &.message-template_left {
    .message-template_detail {
      padding-left: 10px;

      .message-template_detail-name-date {
        .message-template_detail-date {
          padding-left: 10px;
        }
      }

      .message-template_detail-content {
        margin-top: 5px;
      }
    }
  }
  &.message-template_right {
    justify-content: flex-end;

    .message-template_detail {
      align-items: flex-end;
      padding-right: 10px;
      .message-template_detail-name-date {
        display: none;
      }

      .message-template_detail-content {
        position: relative;
        background-color: #d2e3ff;

        .self-message-date {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          transform: translateY(-100%);
          font-size: 12px;
          color: #b4b6b7;
        }
      }
    }
  }

  &:hover {
    .message-template_detail {
      .message-template_detail-name-date {
        .message-template_detail-date {
          display: block;
        }
      }
      .message-template_detail-content {
        .self-message-date {
          display: block;
        }
      }
    }
  }

  .message-template_detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    .message-template_detail-name-date {
      display: flex;
      align-items: center;

      .message-template_detail-name {
        font-weight: bold;
      }

      .message-template_detail-date {
        display: none;
        font-size: 12px;
        color: #b4b6b7;
      }
    }

    .message-template_detail-content {
      width: fit-content;
      padding: 10px;
      background-color: #ebeced;
      border-radius: 10px;

      .message-type-1 {
        display: flex;
        align-items: center;
        width: 250px;

        .message-type-1_name {
          flex: 1;
          margin-right: 10px;
          font-weight: 500;
        }

        .message-type-1_svg {
          font-size: 40px;

          .pdf {
            color: #ea5454;
          }

          .zip {
            color: #8b572a;
          }
        }
      }

      .message-type-3 {
        .message-type-3_avatar-name {
          display: flex;
          align-items: center;
          width: 250px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e6e6e6;

          .message-type-3_avatar {
            width: 36px;
            height: 36px;
          }

          .message-type-3_name {
            padding: 0 10px;
            font-weight: 500;
          }
        }

        .message-type-3_card {
          padding-top: 10px;
          font-size: 12px;
        }
      }

      .message-type-7 {
        white-space: pre-wrap;
        word-break: break-all;
      }

      .message-type-9 {
        width: 250px;

        .message-type-9_iconUrl-title {
          display: flex;
          align-items: center;
          padding-bottom: 10px;

          .message-type-9_title {
            padding-left: 5px;
            font-size: 12px;
          }
        }

        .message-type-9_description {
          padding-bottom: 10px;
        }

        .message-type-9_thumbUrl-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 250px;
          height: 200px;
          background-color: #f5f7fa;
          color: #909399;

          .el-icon {
            font-size: 30px;
          }
        }

        .message-type-9-miniProgram {
          font-size: 12px;
        }
      }

      .message-type-14 {
        width: 250px;
        .message-type-14_title {
          font-weight: 500;
          padding-bottom: 10px;
        }

        .message-type-14_description {
          flex: 1;
          padding-right: 10px;
        }

        .message-type-14_description-thumbnailUrl {
          display: flex;
          justify-content: space-between;
        }
      }

      .message-type-15 {
        width: 250px;
      }
    }
  }
}
</style>
