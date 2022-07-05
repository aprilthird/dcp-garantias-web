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
  //agregar evaluacion de registro básico
  private urlCheckList = this.baseApiURl + '/Mantenimiento/MantenimientoCheckList';
  //agregar evaluacion de registro básico
  private urlBitacora= this.baseApiURl + '/Core/MantenimientoBitacora';

  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }

  
  //garantias
  saveWarranty(_request:any):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarranties,_request,{headers:this.header});
  }
  listWarranties(filter, _page):Observable<any>{
    const request = {filter : filter,page:(_page-1),pageSize:10};
    return this.httpClient.post(this.urlTrayWarranties, request, {headers:this.header});
  }
  deleteWarranty(_request:any):Observable<any>{
    return this.httpClient.post(this.urlMaintenanceWarranties,_request,{headers:this.header});
  }
  //buscar ESN
  checkList(_request:any):Observable<any>{          
    return this.httpClient.post(this.urlCheckList,_request,{headers:this.header});
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

    //traer bitacora
    saveBitacora(_request:any):Observable<any>{          
      return this.httpClient.post(this.urlBitacora,_request,{headers:this.header});
    }
}
