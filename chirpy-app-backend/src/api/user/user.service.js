const crypto = require("crypto");
const User = require("./models/User");
const {ApiService} = require("../api.service");

class UserService extends ApiService {

  constructor() {
    super(User);

    this.allowedUpdateUserFields = [
      "name",
      "surname",
      "bio",
      "userName",
      "email",
    ];
  }

  async getById(id, filter = null) {
    return await User.findOne({
      $or: [
        {_id: id},
        {userName: id},
      ],
    }).select(filter);
  }

  async findByEmail(email) {
    return await User.findOne({
      email,
    });
  }

  async findByUserName(userName) {
    return await User.findOne({
      userName,
    });
  }

  async existByEmail(email) {
    return await User.exists({
      email,
    });
  }

  async existByUserName(userName) {
    return await User.exists({
      userName,
    });
  }

  async setUserPassword(user, password) {
    if (password) {
      user.salt = crypto.randomBytes(128).toString("base64");
      user.passwordHash = crypto.pbkdf2Sync(password, user.salt, 1, 128, "sha256");
    } else {
      user.salt = undefined;
      user.passwordHash = undefined;
    }
    await user.save();
    return user;
  }
  async hasPassword(user) {
    return user.passwordHash != null && user.passwordHash.length > 0;
  }
  async verifyPassword(user, password) {
    if (!password) return false;
    if (!user.passwordHash) return false;
    return crypto.pbkdf2Sync(password, user.salt, 1, 128, "sha256") == user.passwordHash;
  }

  async updateUser(user, form) {
    let userUpdateData = this.transformUser(form);

    if ("email" in userUpdateData && userUpdateData.email != user.email) {
      if (await this.existByEmail(userUpdateData.email)) {
        throw new Error("ExistsEmail");
      }
    }

    if ("userName" in userUpdateData && userUpdateData.userName != user.userName) {
      if (await this.existByUserName(userUpdateData.userName)) {
        throw new Error("ExistsUserName");
      }
    }

    return await this.updateUserById(user._id, userUpdateData);
  }

  async updateUserById(id, form) {
    return await User.findOneAndUpdate({_id: id}, form, {new: true});
  }

  transformUser(form) {
    let res = {};
    for (const field of this.allowedUpdateUserFields) {
      if (field in form) {
        res[field] = form[field];
      }
    }
    return res;
  }
}

module.exports = UserService;