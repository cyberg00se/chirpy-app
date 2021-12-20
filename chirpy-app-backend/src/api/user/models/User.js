const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthSchema = require("../../auth/models/Auth");
const { encrypt, decrypt } = require("../../../lib/cipher/cipher.js");
const crypto = require("crypto");

const schema = new Schema(
  {
    auth: [AuthSchema],
    userName: {
      type: String,
      index: {unique: true},
      require: true,
    },
    email: {
      type: String,
      require: false,
      index: true,
      default: null,
    },
    phoneNumber: {
      type: String,
      require: false,
      index: true,
      default: null,
      set: setEncryptedPhoneNumber, 
      get: getDecryptedPhoneNumber,
    },
    DEK: {
      type: String,
      require: false,
      default: null,
    },
    name: {type: String, default: "", index: true},
    surname: {type: String, default: "", index: true},
    bio: {type: String, default: null},

    passwordHash: {type: String, default: null},
    salt: {type: String, default: null},
  },
  {
    timestamps: true,

    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
  },
);

function setEncryptedPhoneNumber(phoneNumber) {
  const newDEK = crypto.randomBytes(32);
  const encryptedPhoneNumber = encrypt(newDEK, phoneNumber);
  const encryptedNewDEK = encrypt(Buffer.from(process.env.KEK, "base64"), newDEK);

  this.DEK = encryptedNewDEK;
  return encryptedPhoneNumber;
}
function getEncryptedPhoneNumber(phoneNumber) {
  const encryptedPhoneNumber = encrypt(this.DEK, phoneNumber);
  return encryptedPhoneNumber;
}
function getDecryptedPhoneNumber(phoneNumber) {
  const decryptedDEK = decrypt(Buffer.from(process.env.KEK, "base64"), this.DEK);
  const decryptedPhoneNumber = decrypt(Buffer.from(decryptedDEK, "binary"), phoneNumber);
  return decryptedPhoneNumber;
}

module.exports = mongoose.model("User", schema);