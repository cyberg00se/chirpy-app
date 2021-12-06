const UserService = require("./user.service");
const {userPublicFilter} = require("../../filters");
const {ApiController} = require("../api.controller");
const {publicUserResponse, privateUserResponse} = require("./responses");

class UserController extends ApiController {

  constructor() {
    super();
    this.userService = new UserService();
  }

  async me(ctx) {
    let user = ctx.req.user;

    ctx.body = {
      ...privateUserResponse(ctx.req.user),
    };
  }

  async getById(ctx) {
    let user = await this.userService.getById(ctx.params.id, userPublicFilter);

    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  }

  async updatePassword(ctx) {
    const {oldPassword, newPassword, confirmNewPassword} = ctx.request.body;
    const user = ctx.req.user;
    if (this.userService.hasPassword(user)) {
      if (this.userService.verifyPassword(user, oldPassword)) {
        if (newPassword.length > 0 && newPassword === confirmNewPassword) {
          await this.userService.setUserPassword(user, newPassword);
          ctx.body = {status: "success"};
        } else {
          ctx.setAppError(400, 1);
        }
      } else {
        ctx.setAppError(400, 2);
      }
    } else {
      if (newPassword.length > 0 && newPassword === confirmNewPassword) {
        await this.userService.setUserPassword(user, newPassword);
        ctx.body = {status: "success"};
      } else {
        ctx.setAppError(400, 1);
      }
    }
  }

  async updateUser(ctx) {
    try {
      ctx.body = privateUserResponse(await this.userService.updateUser(ctx.req.user, ctx.request.body));
    } catch (error) {
      if (error.name === "ExistsEmail") {
        ctx.setAppError(400, 3);
      }
      if (error.name === "ExistsUserName") {
        ctx.setAppError(400, 4);
      }
    }
  }
}

module.exports = new UserController();