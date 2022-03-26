import { uuid } from "../service/common.service.mjs";
import { validate } from "../service/validator.service.mjs";

export class Model{
  #tableName;
  #schema;
  constructor(tableName , schema) {
    this.#tableName = tableName;
    this.#schema = schema;
  }

  getTableName = () => {
      return this.#tableName;
  }

  checkValidation = () =>{
    validate(this.#schema,this)
    return this;
  }
  
  generateId = () =>{
    this.id = uuid();
    return this;
  }

} 