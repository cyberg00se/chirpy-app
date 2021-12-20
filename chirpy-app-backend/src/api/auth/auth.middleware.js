const passport = require("./passport");
const {ApiMiddleware} = require("../api.middleware");

class AuthMiddleware extends ApiMiddleware {

  jwt(ctx, next) {
    let options = {
      session: false,
    };
    return passport.authenticate("jwt", options)(ctx, next);
  }

  async validateRegister (ctx, next) {
    let regexString = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,25}$/;
    ctx.checkBody("email", "bad email").optional().isEmail();
    ctx.checkBody("phoneNumber", "bad phone number").optional().isMobilePhone();
    ctx.checkBody("userName", "bad username").notEmpty().len(2, 20);
    ctx.checkBody("password").matches(regexString);
    ctx.checkBody("name").optional().len(3, 20);
    ctx.checkBody("surname").optional().len(3, 20);
    let errors = await ctx.validationErrors();
    if (errors) {
      ctx.body = errors;
      ctx.status = 400;
    }
    else
      await next();
  }
}

module.exports = new AuthMiddleware();
