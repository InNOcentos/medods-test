const crypto = require("crypto");
const { hash_algorithm, hash_secret } = require("../config");
const { IV_LENGTH } = require("../constants");

const encrypt = (token) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(hash_algorithm, Buffer.from(hash_secret), iv);
  let encrypted = cipher.update(token);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (hash) => {
  let hashParts = hash.split(":");
  let iv = Buffer.from(hashParts.shift(), "hex");
  let encryptedHash = Buffer.from(hashParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(hash_algorithm, Buffer.from(hash_secret), iv);
  let decrypted = decipher.update(encryptedHash);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
