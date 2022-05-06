import { ValidateHelper } from "app/shared/utils/helpers/validate.helper";

export class MasterConstantRequest {

    id:number;
    codigo:string;
    laborRate:number;
    kmRate:number;
    bfcMarkup:number;
    siteLabor:number;
    activo:boolean;

  static createFormObject(obj: any, id:any): MasterConstantRequest {
    const newObj = new MasterConstantRequest();
    newObj.id = ValidateHelper.validNumber(id);
    newObj.codigo = ValidateHelper.validString(obj.codigo);
    newObj.laborRate = ValidateHelper.validNumber(obj.laborRate);
    newObj.kmRate = ValidateHelper.validNumber(obj.kmRate);
    newObj.bfcMarkup = ValidateHelper.validNumber(obj.bfcMarkup);
    newObj.siteLabor = ValidateHelper.validNumber(obj.siteLabor);
    newObj.activo = ValidateHelper.validBoolean(obj.activo);
    return newObj;
  }
}
