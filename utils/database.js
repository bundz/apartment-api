const File = require("./file");

class Database {
  
  static async getFileData(file) {
    const buffer = await File.readFile(`./db/${file}.json`);
    const data = JSON.parse(buffer.toString());
    return data;
  }
  
  static async getNextId(file) {
    const data = await this.getFileData(file);
    const properties = Object.keys(data);
    
    if (properties.length < 1) {
      return 1;
    }
    
    return Number(properties[properties.length - 1]) + 1;
  }
  
  static async insert(file, obj) {
    const id = await this.getNextId(file);
    obj.id = id;
    const data = await this.getFileData(file);
    data[id] = obj;
    await File.writeFile(`./db/${file}.json`, JSON.stringify(data));
    return id;
  }
  
  static async updateDataById(file, id, data) {
    const dataObj = await this.getFileData(file);
    const dataElement = dataObj[id];

    if (!dataElement) {
      return false;
    }

    for (const keys of Object.keys(data)) {
      dataElement[keys] = data[keys];
    }
    
    dataObj[id] = dataElement;

    await File.writeFile(`./db/${file}.json`, JSON.stringify(dataObj));
    return true;
  }

  static async getDataById(file, id) {
    const dataObj = await this.getFileData(file);
    return dataObj[id];
  }

  static async deleteDataById(file, id) {
    const dataObj = await this.getFileData(file);
    delete dataObj[id];

    await File.writeFile(`./db/${file}.json`, JSON.stringify(dataObj));
    return;
  }

  //Ver com Bundz qual a melhor maneira de alterar
  
  static async listApartments(file, {
    hasGarage,
    isFurnished,
    hasElevator,
    rentPriceLessThan,
    rentPriceGreaterThan,
    salePriceLessThan,
    salePriceGreaterThan,
    bedroomsAtLeast,
    searchAddress,
  }) {
    const dataObj = await this.getFileData(file);
    let dataArr = Object.values(dataObj);
    
    if (hasGarage) {
      dataArr = dataArr.filter((dataElement) => dataElement.hasGarage);
    }

    if (isFurnished) {
      dataArr = dataArr.filter((dataElement) => dataElement.isFurnished);
    }
    
    if (hasElevator) {
      dataArr = dataArr.filter((dataElement) => dataElement.hasElevator);
    }

    if (rentPriceGreaterThan) {
      dataArr = dataArr.filter(
        (dataElement) => dataElement.rentPrice > rentPriceGreaterThan
      );
    }

    if (rentPriceLessThan) {
      dataArr = dataArr.filter(
        (dataElement) => dataElement.rentPrice < rentPriceLessThan
      );
    }

    if (salePriceGreaterThan) {
      dataArr = dataArr.filter(
        (dataElement) => dataElement.salePrice > salePriceGreaterThan
        );
    }
    
    if (salePriceLessThan) {
      dataArr = dataArr.filter(
        (dataElement) => dataElement.salePrice < salePriceLessThan
        );
      }

      if (bedroomsAtLeast) {
      dataArr = dataArr.filter(
        (dataElement) => dataElement.bedrooms >= bedroomsAtLeast
      );
    }

    if (searchAddress) {
      dataArr = dataArr.filter((dataElement) => {
        const address = searchAddress;
        const elementAddress = dataElement.address;
        return elementAddress.includes(address);
      });
    }

    return dataArr;
  }

}

module.exports = Database;
