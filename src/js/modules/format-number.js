/**
 *
 * @param {Number} num
 * @returns {string} formated string output
 */
export const formatNumber = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
