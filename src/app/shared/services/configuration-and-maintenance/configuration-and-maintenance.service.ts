import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { MasterConstantRequest } from 'app/shared/models/request/master-constant.request';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationAndMaintenanceService {


  header = new HttpHeaders({
    'Authorization': this.authService.accessToken
  });
  date = Date();

  private baseApiURl = environment.apiUrl;

  //enums
  private urlEnum = this.baseApiURl + '/Administracion/ObtenerEnum';
  // constantes
  private urlMaintenanceConstants = this.baseApiURl + '/Administracion/MantenimientoConstantes';
  private urlTrayConstants = this.baseApiURl + '/Administracion/BandejaConstantes';
  //srt
  private urlMaintenanceSrt = this.baseApiURl + '/Administracion/MantenimientoSrt';
  private urlTraySrt = this.baseApiURl + '/Administracion/BandejaSrt';
  //partes
  private urlMaintenanceParts = this.baseApiURl + '/Administracion/MantenimientoPartes';
  private urlTrayParts = this.baseApiURl + '/Administracion/BandejaPartes';

  //modelo de motor
  private urlMaintenanceEngineModel= this.baseApiURl + '/Administracion/MantenimientoModeloMotor';
  private urlTrayEngineModel = this.baseApiURl + '/Administracion/BandejaModeloMotor';

  //aplicacion de motor
  private urlMaintenanceEngineApplication= this.baseApiURl + '/Administracion/MantenimientoAplicacionesMotor';
  private urlTrayEngineApplication = this.baseApiURl + '/Administracion/BandejaAplicacionesMotor';

  //clientes
  private urlMaintenanceWarrantyDataClient = this.baseApiURl + '/Administracion/MantenimientoClientes';
  private urlTrayWarrantyDataClient = this.baseApiURl + '/Administracion/BandejaClientes';

  //matricula
  private urlMaintenanceEnrollment = this.baseApiURl + '/Administracion/MantenimientoMatricula';
  private urlTrayEnrollment = this.baseApiURl + '/Administracion/BandejaMatricula';

  //tipo de garantias
  private urlMaintenanceWarrantyTypes = this.baseApiURl + '/Administracion/MantenimientoTipoGarantia';
  private urlTrayWarrantyTypes = this.baseApiURl + '/Administracion/BandejaTipoGarantia';

  //quejas
  private urlMaintenanceComplaints = this.baseApiURl + '/Administracion/MantenimientoQuejas';
  private urlTrayComplaints  = this.baseApiURl + '/Administracion/BandejaQuejas';

  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }

  //Enum
  getEnum(code):Observable<any>{
    return this.httpClient.get(this.urlEnum+'/'+code,{headers:this.header});
  }

  //constantes
  saveConstant(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceConstants,_request,{headers:this.header});
  }
  listConstants():Observable<any>{
    const request = {filter : {fechaFin: "2022-05-09T17:56:50"}};
    return this.httpClient.post(this.urlTrayConstants, request, {headers:this.header});
  }
  deleteConstant(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceConstants,_request,{headers:this.header});
  }
  // srt
  listSrt():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T09:47:38.423'}};
    return this.httpClient.post(this.urlTraySrt, request, {headers:this.header});
  }
  maintenanceSrt(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceSrt,_request,{headers:this.header});
  }

  //partes
  listParts():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T09:47:38.423',fechaIni: '2022-05-12T09:47:38.423'}};
    return this.httpClient.post(this.urlTrayParts, request, {headers:this.header});
  }
  maintenanceParts(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceParts,_request,{headers:this.header});
  }

  //modelo de motor
  listEngineModels():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T16:23:11.942Z',fechaIni: '2022-05-12T16:23:11.942Z'}};
    return this.httpClient.post(this.urlTrayEngineModel, request, {headers:this.header});
  }
  maintenanceEngineModels(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceEngineModel,_request,{headers:this.header});
  }
  deleteEngineModel(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceEngineModel,_request,{headers:this.header});
  }

  //aplicacion de motor
  listEngineApplications():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T16:23:11.942Z',fechaIni: '2022-05-12T16:23:11.942Z'}};
    return this.httpClient.post(this.urlTrayEngineApplication, request, {headers:this.header});
  }
  maintenanceEngineApplications(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceEngineApplication,_request,{headers:this.header});
  }
  deleteEngineApplication(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceEngineApplication,_request,{headers:this.header});
  }

  //datos garantia - clientes
  listClients():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T16:23:11.942Z',fechaIni: '2022-05-12T16:23:11.942Z'}};
    return this.httpClient.post(this.urlTrayWarrantyDataClient, request, {headers:this.header});
  }
  maintenanceClients(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarrantyDataClient,_request,{headers:this.header});
  }
  deleteClient(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceWarrantyDataClient,_request,{headers:this.header});
  }

  //quejas
  listComplaints():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T16:23:11.942Z',fechaIni: '2022-05-12T16:23:11.942Z'}};
    return this.httpClient.post(this.urlTrayComplaints, request, {headers:this.header});
  }
  maintenanceComplaints(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceComplaints,_request,{headers:this.header});
  }
  deleteComplaint(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceComplaints,_request,{headers:this.header});
  }

  //matriculas
  listEnrollment():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-13T15:59:21.335Z'}};
    return this.httpClient.post(this.urlTrayEnrollment, request, {headers:this.header});
  }
  listEnrollmentByEsn(_esn:string):Observable<any>{
    const request = {filter : {esn:_esn} };
    return this.httpClient.post(this.urlTrayEnrollment, request, {headers:this.header});
  }
  maintenanceEnrollment(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceEnrollment,_request,{headers:this.header});
  }
  deleteEnrollment(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceEnrollment,_request,{headers:this.header});
  }

  //tipo de garantias
  listWarrantyTypes():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-13T15:59:21.335Z',fechaIni: '2022-05-13T15:59:21.335Z'}};
    return this.httpClient.post(this.urlTrayWarrantyTypes, request, {headers:this.header});
  }
  maintenanceWarrantyTypes(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarrantyTypes,_request,{headers:this.header});
  }
  deleteWarrantyTypes(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceWarrantyTypes,_request,{headers:this.header});
  }
}
