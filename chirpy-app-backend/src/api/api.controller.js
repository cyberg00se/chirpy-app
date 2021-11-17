const autoBind = require("auto-bind");
const appConfig = require("../config/default");

class ApiController {
  appConfig = appConfig;

  constructor() {
    autoBind(this);
  }
}

module.exports = {ApiController};
