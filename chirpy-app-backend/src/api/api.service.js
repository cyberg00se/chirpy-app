const appConfig = require("../config/default");

class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource not found!");
  }
}

class ApiService {
  appConfig = appConfig;

  constructor(model = null) {
    this.model = model;
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findByIdOrFail(find) {
    let res = await this.findById(find);
    if (!res)
      throw new ResourceNotFoundError();
    return res;
  }

  async updateById(_id, update) {
    return this.model.findOneAndUpdate({ _id }, update, { new: true });
  }

  async updateByIdOrFail(_id, update) {
    let res = await this.updateById(_id, update);
    if (!res)
      throw new ResourceNotFoundError();
    return res;
  }

  async removeById(id) {
    return this.model.findByIdAndRemove(id);
  }

  async find(find) {
    return this.model.find(find);
  }

  async findOrFail(find) {
    let res = await this.find(find);
    if (!res && res.length > 0)
      throw new ResourceNotFoundError();
    return res;
  }

  async findOne(find) {
    return this.model.findOne(find);
  }

  async findOneOrFail(find) {
    let res = await this.findOne(find);
    if (!res)
      throw new ResourceNotFoundError();
    return res;
  }

  async findSelect(form) {
    return this.model.find(form);
  }

  async remove(remove) {
    return await this.model.delete(remove);
  }
}

module.exports = { ApiService };