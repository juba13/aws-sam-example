import { error } from "../../service/error.service.mjs";
import { Model } from "../model.mjs";
const schema = {
  type : "object",
  title : "The patient infomation input body",
  properties: {
    age: {type: "integer"},
    fullname: {type: "string"},
    gender: {type: "string"},
    email: {type: "string"},
    address :{type: "string"}
  },
  required : ["fullname", "age", "email"]
}

export class Patient extends Model {

  static  getModelName = () => {
    return "patient";
  } 
  constructor() {
    super("dynamodbPatientTable",schema);
  }
  bindData = (input = {}) =>{
    this.id = input?.id;
    this.fullname = input?.fullname;
    this.age = input?.age;
    this.gender = input?.gender;
    this.email = input?.email;
    this.address = input?.address;
    return this;
  }
  static create = () => { return new Patient()} 
}

