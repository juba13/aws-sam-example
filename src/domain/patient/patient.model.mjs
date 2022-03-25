import { Model } from "../domain.mjs";
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

export class Patient extends Model {
  static  getModelName = () => {
    return "patient";
  } 
  constructor() {
    super(Patient.getModelName());
  }
  bindData = (input = {}) =>{
    this.name = input.name;
    this.age = input.age;
    this.gender = input.gender;
    this.email = input.email;
    this.address = input.address;
    return this;
  }
  static create = () => { return new Patient()} 
}

