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
  dateCurrent = new Date();
  dateLast = this.dateCurrent.getFullYear()+'-'+this.dateCurrent.getMonth()+'-'+this.dateCurrent.getDay()+'T11:59:59Z';

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

  //marca de motor
  private urlMantenimientoMarcaMotor= this.baseApiURl + '/Administracion/MantenimientoMarcaMotor';
  private urlBandejaMarcaMotor = this.baseApiURl + '/Administracion/BandejaMarcaMotor';
  
  //fallas
  private urlMantenimientoFallas= this.baseApiURl + '/Administracion/MantenimientoTipoFallas';
  private urlBandejaFallas = this.baseApiURl + '/Administracion/BandejaTipoFallas';
  
  //clientes
  private urlMaintenanceWarrantyDataClient = this.baseApiURl + '/Administracion/MantenimientoClientes';
  private urlTrayWarrantyDataClient = this.baseApiURl + '/Administracion/BandejaClientes';
  private urlSearchClientByName = this.baseApiURl + '/Administracion/BuscarClientesPorNombre';

  //matricula
  private urlMaintenanceEnrollment = this.baseApiURl + '/Administracion/MantenimientoMatricula';
  private urlTrayEnrollment = this.baseApiURl + '/Administracion/BandejaMatricula';

  //tipo de garantias
  private urlMaintenanceWarrantyTypes = this.baseApiURl + '/Administracion/MantenimientoTipoGarantia';
  private urlTrayWarrantyTypes = this.baseApiURl + '/Administracion/BandejaTipoGarantia';

  //quejas
  private urlMaintenanceComplaints = this.baseApiURl + '/Administracion/MantenimientoQuejas';
  private urlTrayComplaints  = this.baseApiURl + '/Administracion/BandejaQuejas';

  //otros reclamables
  private urlMantenimientoOtrosReclamables = this.baseApiURl + '/Administracion/MantenimientoOtrosReclamables';
  private urlBandejaOtrosReclamables  = this.baseApiURl + '/Administracion/BandejaOtrosReclamables';

  //tipo de viaje
  private urlMantenimientoTipoViajes = this.baseApiURl + '/Administracion/MantenimientoTipoViaje';
  private urlBandejaTipoViajes  = this.baseApiURl + '/Administracion/BandejaTipoViaje';
  
  //detalle de viaje
  private urlMantenimientoDetalleViajes = this.baseApiURl + '/Administracion/MantenimientoDetalleViaje';
  private urlBandejaDetalleViajes = this.baseApiURl + '/Administracion/BandejaDetalleViaje';
  
  //unidad de medida
  private urlMantenimientoUnidadMedida = this.baseApiURl + '/Administracion/MantenimientoUnidadMedida';
  private urlBandejaUnidadMedida = this.baseApiURl + '/Administracion/BandejaUnidadMedida';
  
  //area de servicio
  private urlMaintenanceServiceArea = this.baseApiURl + '/Administracion/MantenimientoAreaServicio';
  private urlTrayServiceArea = this.baseApiURl + '/Administracion/BandejaAreaServicio';

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
  listConstants(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayConstants, request, {headers:this.header});
  }
  deleteConstant(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceConstants,_request,{headers:this.header});
  }
  findConstant(_codigo:any):Observable<any>{
    const request = {filter : {codigo:_codigo},pageSize:1000};
    return this.httpClient.post(this.urlTrayConstants,request,{headers:this.header});
  }
  // srt
  listSrt(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTraySrt, request, {headers:this.header});
  }
  maintenanceSrt(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceSrt,_request,{headers:this.header});
  }
  searchSrt(_codigo:any):Observable<any>{
    const request = {filter : {codigo:_codigo},pageSize:1000};
    return this.httpClient.post(this.urlTraySrt,request,{headers:this.header});
  }

  // tipo viaje
  listTipoViaje(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaTipoViajes, request, {headers:this.header});
  }
  maintenanceTipoViaje(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoTipoViajes,_request,{headers:this.header});
  }
  listaTiposDeViajeSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlBandejaTipoViajes, request, {headers:this.header});
  }
  
  // detalle viaje
  listDetalleViaje(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaDetalleViajes, request, {headers:this.header});
  }
  maintenanceDetalleViaje(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoDetalleViajes,_request,{headers:this.header});
  }
  listaDetallesDeViajeSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlBandejaDetalleViajes, request, {headers:this.header});
  }

  // unidad de medida
  listUnidadMedida(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaUnidadMedida, request, {headers:this.header});
  }
  maintenanceUnidadMedida(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoUnidadMedida,_request,{headers:this.header});
  }

  // otros reclamables
  listOtrosReclamables(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaOtrosReclamables, request, {headers:this.header});
  }
  maintenanceOtrosReclamables(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoOtrosReclamables,_request,{headers:this.header});
  }
  listaOtrosReclamablesSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlBandejaOtrosReclamables, request, {headers:this.header});
  }

  //Partes
  listParts(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayParts, request, {headers:this.header});
  }
  maintenanceParts(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceParts,_request,{headers:this.header});
  }
  buscarParte(_codigo:any):Observable<any>{
    const request = {filter : {codigo:_codigo},pageSize:1000};
    return this.httpClient.post(this.urlTrayParts,request,{headers:this.header});
  }

  //Marca del motor
  listMarcaMotor(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaMarcaMotor, request, {headers:this.header});
  }
  listMarcaMotorSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlBandejaMarcaMotor, request, {headers:this.header});
  }
  mantenimientoMarcaMotor(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoMarcaMotor,_request,{headers:this.header});
  }

  //modelo de motor
  listEngineModels(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayEngineModel, request, {headers:this.header});
  }
  listaModelosSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
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
  listEngineApplications(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayEngineApplication, request, {headers:this.header});
  }
  maintenanceEngineApplications(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceEngineApplication,_request,{headers:this.header});
  }
  deleteEngineApplication(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceEngineApplication,_request,{headers:this.header});
  }

  // fallas
  listaFallas(_page):Observable<any>{
    const request = {filter : {},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlBandejaFallas, request, {headers:this.header});
  }
  mantenimientoFallas(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMantenimientoFallas,_request,{headers:this.header});
  }
  listaFallasSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlBandejaFallas, request, {headers:this.header});
  }
  
  //datos garantia - clientes
  listClients(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayWarrantyDataClient, request, {headers:this.header});
  }
  maintenanceClients(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarrantyDataClient,_request,{headers:this.header});
  }
  deleteClient(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceWarrantyDataClient,_request,{headers:this.header});
  }
  searchClienteByName(name:any):Observable<any>{
    return this.httpClient.get(this.urlSearchClientByName+'/'+name, {headers:this.header});
  }

  //quejas
  listComplaints(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
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
    const request = {filter : {fechaFin: '2022-05-17T18:09:08.252Z'}};
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
  listWarrantyTypes(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayWarrantyTypes, request, {headers:this.header});
  }
  maintenanceWarrantyTypes(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarrantyTypes,_request,{headers:this.header});
  }
  deleteWarrantyTypes(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceWarrantyTypes,_request,{headers:this.header});
  }

  //area de servicio
  listServiceArea(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayServiceArea, request, {headers:this.header});
  }
  listaAreasDeServicioSinPaginar():Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},pageSize:0};
    return this.httpClient.post(this.urlTrayServiceArea, request, {headers:this.header});
  }  
  maintenanceServiceArea(_request:MasterConstantRequest):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceServiceArea,_request,{headers:this.header});
  }
  deleteServiceArea(_request:any):Observable<any>{
    return this.httpClient.post(this.urlMaintenanceServiceArea,_request,{headers:this.header});
  }
  findServiceAreaByOS(_ceco:any,_codAreaServicios:any):Observable<any>{
    const request = {filter : {ceco:_ceco,codigo:_codAreaServicios}};
    return this.httpClient.post(this.urlTrayServiceArea, request, {headers:this.header});
  }  
}
