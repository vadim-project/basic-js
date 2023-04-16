const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};
  if(Array.isArray(domains) && domains.length > 0) {
    domains = domains.map(i => i.split('.').reverse());
    for(let i of domains) {
      let keys = '';
      for(let j = 0; j < i.length; j++) {
        keys += `.${i[j]}`;
        if (!result.hasOwnProperty(keys)) result[keys] = 1;
        else result[keys]++;
      }
    }
  } else return {};
  return result;
}

module.exports = {
  getDNSStats
};
