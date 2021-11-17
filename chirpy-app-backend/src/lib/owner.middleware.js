const autoBind = require("auto-bind");

class OwnerMiddleware {
  constructor(ModelService, apiField = "id", apiLocation = "params", modelField = "owner") {
    this.apiField = apiField;
    this.modelField = modelField;
    this.apiLocation = apiLocation;
    this.modelService = new ModelService();

    autoBind(this);
  }

  async owner(ctx, next) {
    let model = await this.modelService.findById(this.getIdFromContext(ctx));
    if (model[this.modelField].toString() === ctx.req.user._id.toString()) {
      await next();
    } else {
      ctx.status = 403;
    }
  }

  getIdFromContext(ctx) {
    switch (this.apiLocation) {
      case "params":
        return ctx.params[this.apiField];
      case "body":
        return ctx.request.body[this.apiField];
    }
  }
}

module.exports = {OwnerMiddleware};