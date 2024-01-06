import { useBotStore } from '@/store/bot';
import { addBotSay } from '@/api/bot.api';

export default () => {
  const botStore = useBotStore();

  const say = ({
    messageType,
    messageContent,
    businessCardId,
    fileUrl,
    appid,
    title,
    pagePath,
    description,
    thumbUrl,
    thumbKey,
    thumbnailUrl,
    url
  }) => {
    return new Promise((resolve, reject) => {
      const messageInfo = {
        contactId: botStore.currentMessageInfo.contactId,
        contactType: botStore.currentMessageInfo.contactType,
        messageType
      };

      switch (messageType) {
        case 1:
          messageInfo.fileUrl = fileUrl;

          break;
        case 3:
          messageInfo.businessCardId = businessCardId;

          break;
        case 6:
          messageInfo.fileUrl = fileUrl;

          break;
        case 7:
          messageInfo.messageContent = messageContent;

          break;
        case 9:
          messageInfo.appid = appid;
          messageInfo.title = title;
          messageInfo.pagePath = pagePath;
          messageInfo.description = description;
          messageInfo.thumbUrl = thumbUrl;
          messageInfo.thumbKey = thumbKey;

          break;
        case 14:
          messageInfo.description = description;
          messageInfo.thumbnailUrl = thumbnailUrl;
          messageInfo.title = title;
          messageInfo.url = url;

          break;
        default:
          break;
      }

      addBotSay(messageInfo)
        .then((value) => resolve(value))
        .catch((reason) => reject(reason));
    });
  };

  return {
    say
  };
};
