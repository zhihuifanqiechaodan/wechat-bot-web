import { request } from '@/utils/request';

/**
 * @method getBotStatus
 * @param {*} data
 * @returns
 */
export const getBotStatus = (data) => {
  return request({ url: '/bot/status', method: 'get', params: data });
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
export const getBotAuthQrcode = (data) => {
  return request({ url: '/bot/authQrcode', method: 'get', params: data });
};

/**
 * @method addBotSay
 * @param {*} data
 * @returns
 */
export const addBotSay = (data) => {
  return request({ url: '/bot/say', method: 'post', data });
};

/**
 * @method addBotLogout
 * @param {*} data
 * @returns
 */
export const addBotLogout = (data) => {
  return request({ url: '/bot/logout', method: 'post', data });
};

/**
 * @method getBotInfo
 * @param {*} data
 * @returns
 */
export const getBotInfo = (data) => {
  return request({ url: '/bot/info', method: 'get', params: data });
};

/**
 * @method addBotEditTopic
 * @param {*} data
 * @returns
 */
export const addBotEditTopic = (data) => {
  return request({ url: '/bot/editTopic', method: 'post', data });
};
