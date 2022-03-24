import { Model } from "../Model.mjs";
import { validate } from "../../service/validator_service.mjs";
const schema = {
  type : "object",
  title : "The patient infomation input body",
  properties: {
    age: {type: "integer"},
    name: {type: "string"},
    gender: {type: "string"},
    mail: {type: "string"},
    address :{type: "string"}
  },
  required : ["name", "age", "mail"]
}

class Patient extends Model {
  constructor(input = {}) {
    super();
    this.#bindData(input) 
  }
  #bindData = () =>{
    this.name = input.name;
    this.age = input.age;
    this.gender = input.gender;
    this.email = input.email;
    this.address = input.address;
  }
  bindContextData = (input) =>{
    validate (schema,input)
    this.#bindData(input) 
  } 
}

