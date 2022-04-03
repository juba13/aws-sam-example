const faker = require("faker");
class DBService {
  static save = (tableName, item) => {
    return item;
  };

  static batchSave = (tableName, itemList) => {
    return itemList;
  }

  static getByPk = (tableName, value) => {
    return {
      id: value,
      age: faker.random,
      fullname: faker.firstName + ' ' + faker.lastName,
      email: faker.email,
      address: faker.address
    }
  };
}
export { DBService as db }
