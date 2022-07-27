import { ValidateHelper } from "app/shared/utils/helpers/validate.helper";

export class MasterConstantRequest {

    id:number;
    codigo:string;
    laborRate:number;
    kmRate:number;
    bfc:number;
    markup:number;
    siteLabor:number;
    estado:number;

  static createFormObject(obj: any, id:any): MasterConstantRequest {
    let estado = obj.estado == true ? 1:0;
    const newObj = new MasterConstantRequest();
    newObj.id = ValidateHelper.validNumber(id);
    newObj.codigo = ValidateHelper.validString(obj.codigo);
    newObj.laborRate = ValidateHelper.validNumber(obj.laborRate);
    newObj.kmRate = ValidateHelper.validNumber(obj.kmRate);
    newObj.bfc = ValidateHelper.validNumber(obj.bfc);
    newObj.markup = ValidateHelper.validNumber(obj.markup);
    newObj.siteLabor = ValidateHelper.validNumber(obj.siteLabor);
    newObj.estado = estado;
    return newObj;
  }
}
