import { uuid } from "../../service/common_service.mjs";
export class Model{
    constructor(input = {}) {
      super();
      this.uuid = uuid();
    }
} 