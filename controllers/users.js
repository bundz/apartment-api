const UsersModel = require("../models/users");

class UsersController {
  static async create(user) {
    const id = await UsersModel.insert(user);
    return id;
  }

  static async getByEmail(email) {
    const user = await UsersModel.getByEmail(email);
    return user;
  }
}

module.exports = UsersController;
