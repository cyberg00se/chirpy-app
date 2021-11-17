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

  async updateUserPassword(user, password) {
    user.password = password;
    return await user.save();
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