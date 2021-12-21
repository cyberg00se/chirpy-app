require("console-stamp")(console, { pattern: "dd.mm.yyyy HH:MM:ss.l" });
require('dotenv').config();
//require("./api/logger/dblog");
const Koa = require("koa");
const helmet = require("koa-helmet");
const koaValidate = require("koa-async-validator");
const cors = require("@koa/cors");
const bodyParser = require("koa-body");
const app = new Koa();

const config = require("./config/default");
module.exports.config = config;

const serverEngine = require("./server");
const httpServer = serverEngine(app.callback());
module.exports.app = app;
module.exports.httpServer = httpServer;

require("./db/connection");

const passport = require("./api/auth/passport");
const router = require("./router");
const mainMiddleware = require("./api/main/main.middleware");

app
  .use(helmet())
  .use(mainMiddleware.logger(":method :url"))
  .use(mainMiddleware.errorHandler)
  .use(mainMiddleware.setError)
  .use(bodyParser({
    multipart: true,
    urlencoded: true,
  }))
  .use(koaValidate({
    errorFormatter: (param, msg, value) => {
      const namespace = param.split(".");
      let formParam = namespace.shift();
      while (namespace.length) {
        formParam = `${formParam}[${namespace.shift}]`;
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }))
  .use(cors())
  .use(passport.initialize());

for (let r of router) {
  app.use(r.allowedMethods());
  app.use(r.routes());
}

console.info("Boot Up API");

const port = config.app.port || 3000;
httpServer.listen(port, () => {
  console.info("Started at: ", new Date());
  console.info(`Server started on ${config.app.domain}:${port} `);
});