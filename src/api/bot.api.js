import { request } from '@/utils/request';

/**
 * @method getBotStatus
 * @param {*} data
 * @returns
 */
export const getBotStatus = () => {
  return request({ url: '/bot/status', method: 'get' });
};

/**
 * @method addBotStart
 * @param {*} data
 * @returns
 */
export const addBotStart = () => {
  return request({ url: '/bot/start', method: 'post' });
};

/**
 * @method getBotAuthQrcode
 * @param {*} data
 * @returns
 */
export const getBotAuthQrcode = () => {
  return request({ url: '/bot/authQrcode', method: 'get' });
};

/**
 * @method addBotSay
 * @param {*} data
 * @returns
 */
export const addBotSay = (data) => {
  return request({ url: '/bot/say', method: 'post', data });
};
