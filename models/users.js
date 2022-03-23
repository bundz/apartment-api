const Database = require("../utils/database");

class UsersModel {
  static async insert(user) {
    const id = await Database.insert("users", user);
    return id;
  }

  static async getByEmail(email) {
    const usersData = await Database.getFileData("users");
    const users = Object.values(usersData);

    for (const user of users) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }

  static async getUserApartments(id) {
    const apartments = await Database.getFileData("apartments");
    
    const keys = Object.keys(apartments);
    let apartmentsResults = [];
    
    keys.forEach((key) => {
        if (apartments[key].userId === id) {
          apartmentsResults.push(apartments[key]);
        }
    });

    return apartmentsResults;
  }
}

module.exports = UsersModel;
