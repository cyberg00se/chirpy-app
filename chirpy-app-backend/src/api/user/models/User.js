const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthSchema = require("../../auth/models/Auth");

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
    name: {type: String, default: "", index: true},
    surname: {type: String, default: "", index: true},
    bio: {type: String, default: null},

    passwordHash: {type: String, default: null},
    salt: {type: String, default: null},
  },
  {
    timestamps: true,
  },
);

schema.virtual("password")
    .set(function (password) {
      this._plainPassword = password;
      if (password) {
        this.salt = crypto.randomBytes(128).toString("base64");
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, "sha256");
      } else {
        this.salt = undefined;
        this.passwordHash = undefined;
      }
    })
    .get(function () {
      return this._plainPassword;
    });

schema.virtual("hasPassword").get(function () {
  return this.passwordHash != null && this.passwordHash.length > 0;
});

schema.methods.verifyPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, "sha256") == this.passwordHash;
};

module.exports = mongoose.model("User", schema);