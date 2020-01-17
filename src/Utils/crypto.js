// import CryptoJS from "crypto-js";
// import AESUtil from "crypto-js/aes";
// import UTF8 from "crypto-js/enc-utf8";
import JSEncrypt from "jsencrypt";

// export const AES = {
//   decrypt(ciphertext, key, cfg) {
//     let data;
//     const bytes = AESUtil.decrypt(ciphertext, key, cfg);
//     data = bytes.toString(UTF8);
//     try {
//       data = JSON.parse(data);
//     } catch (e) {}
//     return data;
//   },
//   encrypt(message, key, cfg) {
//     return AESUtil.encrypt(message, key, cfg).toString();
//   }
// };

export const RSA = {
  decrypt(ciphertext, key) {
    const rsa = new JSEncrypt();
    rsa.setPrivateKey(key);
    return rsa.decrypt(ciphertext);
  },
  encrypt(message, key) {
    const rsa = new JSEncrypt();
    rsa.setPublicKey(key);
    return rsa.encrypt(message);
  }
};
