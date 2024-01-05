import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBotStore = defineStore('bot', {
  state: () => {
    return {
      processStatus: false,
      qrcode: '',
      botInfo: useStorage('botPayload', {}).value,
      messageList: [],
      messageHistoryInfo: {},
      currentMessageInfo: null,
      currentMessageHistoryList: []
    };
  },
  actions: {
    /**
     * @method addBotInfo
     * @param {Object} options
     * @param {Boolean} options.processStatus
     * @returns
     */
    setProcessStatus({ processStatus }) {
      this.processStatus = processStatus;
    },
    /**
     * @method setQrcodev
     * @param {Object} options
     * @param {Boolean} options.qrcode
     * @returns
     */
    setQrcode({ qrcode }) {
      this.qrcode = qrcode;
    },
    /**
     * @method setBotInfo
     * @param {Object} options
     * @param {Boolean} options.botInfo
     * @returns
     */
    setBotInfo({ botInfo }) {
      this.botInfo = botInfo;

      useStorage('botPayload', botInfo).value = botInfo;
    }
  }
});
