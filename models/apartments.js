const Database = require("../utils/database");

class ApartmentsModel {
  static async insert(apartment) {
    const id = await Database.insert("apartments", apartment);
    return id;
  }

  static async findElement(apartment) {
    const result = await Database.getDataById("apartments", apartment);
    return result;
  }

  static async findObject(filters) {
    const result = await Database.listApartments("apartments", filters);
    return result;
  }

  static async delete(apartment) {
    await Database.deleteDataById("apartments", apartment);
    return;
  }

  static async update(apartment, data) {
    const result = await Database.updateDataById("apartments", apartment, data);
    return result;
  }
}

module.exports = ApartmentsModel;
