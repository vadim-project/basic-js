const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine { 
  constructor(direct = true) { 
    this.direct = direct; 
  } 
 
  encrypt(message, key) { 
    if (arguments.length === 2 && message && key) { 
      let E = message.toUpperCase(); 
      let K = key.toUpperCase().repeat(E.length).slice(0, E.length); 
      let result = ''; 
      let j = 0; 
      for (let i = 0; i < E.length; i++) { 
        if (E[i].charCodeAt(0) >= 65 && E[i].charCodeAt(0) <= 90) { 
          result += String.fromCharCode(65 + ((E[i].charCodeAt(0) - 65) + (K[j].charCodeAt(0) - 65)) % 26); 
          j++; 
        } else result += E[i]; 
      } 
      result = this.direct ? result : result.split('').reverse().join(''); 
      return result; 
    } else throw new Error('Incorrect arguments!'); 
  } 
  decrypt(message, key) { 
    if (arguments.length === 2 && message && key) { 
      let E = message.toUpperCase(); 
      let K = key.toUpperCase().repeat(E.length).slice(0, E.length); 
      let result = ''; 
      let j = 0; 
      for (let i = 0; i < E.length; i++) 
      if (E[i].charCodeAt(0) >= 65 && E[i].charCodeAt(0) <= 90) { 
        let A = (E[i].charCodeAt(0) - 65) - (K[j].charCodeAt(0) - 65); 
        A = A < 0 ? A + 26 : A; 
        result += String.fromCharCode(65 + (A) % 26); 
        j++; 
      } else result += E[i]; 
      result = this.direct ? result : result.split('').reverse().join(''); 
      return result; 
    } else throw new Error('Incorrect arguments!'); 
  } 
}

module.exports = {
  VigenereCipheringMachine
};
