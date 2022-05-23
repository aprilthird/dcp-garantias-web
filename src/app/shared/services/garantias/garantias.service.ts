import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GarantiasService {

  header = new HttpHeaders({
    'Authorization': this.authService.accessToken
  });

  dateCurrent = new Date();

  private baseApiURl = environment.apiUrl;
  private urlListaTipoDeGarantias = this.baseApiURl + '/Administracion/BandejaTipoGarantia' ;
  //garantias
  private urlMaintenanceWarranties = this.baseApiURl + '/Mantenimiento/MantenimientoGarantia';
  private urlTrayWarranties  = this.baseApiURl + '/Mantenimiento/BandejaGarantias';
  //buscar esn
  private urlFindEsn = this.baseApiURl + '/Mantenimiento/BuscarEsn';
  //buscar historial esn
  private urlFindHistoryEsn = this.baseApiURl + '/Administracion/BandejaMatricula';
  //buscar OS
  private urlFindOs = this.baseApiURl + '/Mantenimiento/BuscarOs';
  //traer bitacora
  private urlLogWarranty = this.baseApiURl + '/Core/ObtenerBitacora';


  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }

  
  //garantias
  saveWarranty(_request:any):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarranties,_request,{headers:this.header});
  }
  listWarranties(_page):Observable<any>{
    const request = {filter : {fechaFin:this.dateCurrent},page:_page};
    return this.httpClient.post(this.urlTrayWarranties, request, {headers:this.header});
  }
  deleteWarranty(_request:any):Observable<any>{
    console.log(_request);
    return this.httpClient.post(this.urlMaintenanceWarranties,_request,{headers:this.header});
  }
  //buscar ESN
  findEsn(esn:string):Observable<any>{
    const _params = new HttpParams().set('req',esn);
    return this.httpClient.get(this.urlFindEsn, {params:_params,headers:this.header});
  }
  //historial ESN
  findHistoryEsn(_esn):Observable<any>{
    const request = { filter : { esn: _esn , fechaFin:this.dateCurrent } };
    return this.httpClient.post(this.urlFindHistoryEsn, request, {headers:this.header});
  }
  //buscar OS
  findOs(os:string):Observable<any>{
    const _params = new HttpParams().set('req',os);
    return this.httpClient.get(this.urlFindOs, {params:_params,headers:this.header});
  }

  getListaTipoDeGarantias():Observable<any>{
    return this.httpClient.post(this.urlListaTipoDeGarantias, {});
  }

  //traer bitacora
  logWarranty(id):Observable<any>{
    return this.httpClient.get(this.urlLogWarranty+'/'+id,{headers:this.header});
  }
}
