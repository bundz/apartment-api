const Database = require("../utils/database");
const ApartmentsModel = require("../models/apartments");

class ApartmentsController {
  static async insertApartment(apartment) {
    const id = await ApartmentsModel.insert(apartment);
    return id;
  }

  static async getApartment(apartment) {
    const id = await ApartmentsModel.findElement(apartment);
    return id;
  }

  static async getApartments(filters) {
    const result = await ApartmentsModel.findObject(filters);
    return result;
  }

  static async deleteApartment(apartment, user) {
    await ApartmentsModel.delete(apartment);
    return;
  }

  static async updateApartment(apartment, data) {
    const result = await ApartmentsModel.update(apartment, data);
    return result;
  }
}

module.exports = ApartmentsController;
