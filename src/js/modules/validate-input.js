

const LEAD_ZERO = /^0+/;
const NOT_NUMBERS = /[^\d]/g;
/**
 * 
 * @param {string} input 
 * @returns {boolean}
 * 
 */
export const validateInput = input =>
  input.value.replace(NOT_NUMBERS, '').replace(LEAD_ZERO, '');