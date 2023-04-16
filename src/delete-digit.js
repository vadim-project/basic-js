const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) { 
  let nString = n.toString(); 
  let max = 0; 
  for (let i = 0; i < nString.length; i++) { 
    let nArray = nString.split(''); 
    nArray.splice(i, 1); 
    let qMax = Number.parseInt(nArray.join('')); 
    max = qMax > max ? qMax : max; 
  } 
  return max; 
}

module.exports = {
  deleteDigit
};
