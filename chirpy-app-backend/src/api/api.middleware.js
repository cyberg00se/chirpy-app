const autoBind = require("auto-bind");
const appConfig = require("../config/default");

class ApiMiddleware {
  appConfig = appConfig;

  constructor() {
    autoBind(this);
  }
}

module.exports = {ApiMiddleware};
