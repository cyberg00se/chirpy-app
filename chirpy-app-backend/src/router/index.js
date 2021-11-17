const Router = require("koa-router");
const defaultRouter = require("./default.router");
const authorizedRouter = require("./authorized.router");

let baseRouter = new Router();
baseRouter.get('/', (ctx) => {
  ctx.body = {
   message: 'server alive',
   time: new Date(),
  };
  ctx.status = 200;
 });

module.exports = [
  baseRouter,
  defaultRouter,
  authorizedRouter,
];
