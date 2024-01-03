import { defineStore } from 'pinia';

export const useBotStore = defineStore('bot', {
  state: () => {
    return {
      processStatus: false,
      qrcode: '',
      botInfo: null
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
    }
  }
});
