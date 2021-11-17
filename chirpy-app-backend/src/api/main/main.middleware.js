const errors = require("./errors");
const {ApiMiddleware} = require("../api.middleware");

class MainMiddleware extends ApiMiddleware {

  constructor() {
    super();
  }

  async setError(ctx, next) {
    ctx.setAppError = (status = 400, code = -1, response = null) => {
      ctx.status = status;
      let isSetCode = code !== -1;
      ctx.body = {
        status: "error",
        ...isSetCode ? {errorCode: code} : {},
        ...isSetCode ? {description: errors[code]} : {},
        ...response ? {response} : {},
      };
    };
    await next();
  }

  async errorHandler(ctx, next) {
    try {
      await next();
    } 
    catch (err) {
      console.error(err);
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        statusCode: err.statusCode,
        message: err.message
      };
    }
  }

  logger(format) {
    format = format || ":method \":url\"";

    return async function (ctx, next) {
      const str = format
          .replace(":method", ctx.method)
          .replace(":url", ctx.url);

      console.info(str);
      await next();
    };
  }
}

module.exports = new MainMiddleware();
