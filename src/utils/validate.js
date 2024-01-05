/**
 * @method isExternal
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * @method isEnglish
 * @param {string} text
 * @returns
 */
export const isEnglish = (text) => {
  return /^[A-Za-z]+$/.test(text);
};

/**
 * @method isPhone
 * @param {string} text
 * @returns
 */
export const isPhone = (text) =>
  /^1(3\d|4[579]|5[0-35-9]|6[56]|7[013-8]|8\d|9[89])\d{8}$/.test(text);
