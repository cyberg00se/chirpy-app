const {ApiMiddleware} = require("../api.middleware");

class UserMiddleware extends ApiMiddleware {
    async validateNewPassword (ctx, next) {
        let regexString = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,25}$/;
        ctx.checkBody("newPassword").matches(regexString);
        ctx.checkBody("confirmNewPassword").notEmpty().len(10, 25).matches(regexString);
        let errors = await ctx.validationErrors();
        if (errors) {
          ctx.body = errors;
          ctx.status = 400;
        }
        else
          await next();
      }

}

module.exports = new UserMiddleware();