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

  static async getUserApartments(id) {
    const apartments = await UsersModel.getUserApartments(id);
    return apartments;
  }
}

module.exports = UsersController;
