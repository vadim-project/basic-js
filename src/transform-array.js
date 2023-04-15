const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
    if (!Array.isArray(arr)) throw Error("'arr' parameter must be an instance of the Array!"); 
    let transformedArr = []; 
    for (let i = 0; i < arr.length; i++) { 
      let obj = { value: arr[i], count: 1 }; 
      switch (arr[i]) { 
        case '--discard-next': 
          if (arr.length > i + 1) { 
            i++; 
            obj = { value: arr[i], count: 0, discard: 'discard' };  
            transformedArr.push(obj); 
          } 
          break; 
        case '--discard-prev': 
          if (transformedArr.length > 0) { 
            if (transformedArr[transformedArr.length - 1].hasOwnProperty('count')) 
              transformedArr[transformedArr.length - 1].count--; 
            else { 
              obj = { value: transformedArr[transformedArr.length - 1], count: 0 }; 
              transformedArr.pop(); 
              transformedArr.push(obj); 
            } 
          } 
          break; 
        case '--double-next': 
          if (arr.length > i + 1) { 
            i++; 
            obj = { value: arr[i], count: 2 } 
            transformedArr.push(obj); 
          } 
          break; 
        case '--double-prev': 
          if (transformedArr.length > 0) { 
            if (transformedArr[transformedArr.length - 1].hasOwnProperty('count')) 
              transformedArr[transformedArr.length - 1].count++; 
            else { 
              obj = { value: transformedArr[transformedArr.length - 1], count: 2 }; 
              transformedArr.pop(); 
              transformedArr.push(obj); 
            } 
          } 
          break; 
        default: 
          transformedArr.push(arr[i]); 
          break; 
      } 
    } 
    let result = []; 
    for (let obj of transformedArr) { 
      if (obj.hasOwnProperty('count')) { 
        if (obj.count > 0 && !obj.hasOwnProperty('discard')) { 
          for (let i = 0; i < obj.count; i++) { 
            result.push(obj.value); 
          } 
        } 
      } else result.push(obj); 
    } 
    return result; 
  }

module.exports = {
  transform
};
