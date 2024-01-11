import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBotStore = defineStore('bot', {
  state: () => {
    return {
      processStatus: false,
      qrcode: '',
      botPayload: useStorage('botPayload', {}).value,
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
     * @method setBotPayload
     * @param {Object} options
     * @param {Boolean} options.botPayload
     * @returns
     */
    setBotPayload({ botPayload }) {
      this.botPayload = botPayload;

      useStorage('botPayload', botPayload).value = botPayload;
    }
  }
});
