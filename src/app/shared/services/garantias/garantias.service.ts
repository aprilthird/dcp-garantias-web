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

  private baseApiURl = environment.apiUrl;
  private urlListaTipoDeGarantias = this.baseApiURl + '/Administracion/BandejaTipoGarantia' ;
  //garantias
  private urlMaintenanceWarranties = this.baseApiURl + '/Mantenimiento/MantenimientoGarantias';
  private urlTrayWarranties  = this.baseApiURl + '/Mantenimiento/BandejaGarantias';
  //buscar esn
  private urlFindEsn = this.baseApiURl + '/Mantenimiento/BuscarEsn';
  //buscar OS
  private urlFindOs = this.baseApiURl + '/Mantenimiento/BuscarOs';


  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }

  
  //garantias
  saveWarranty(_request:any):Observable<any>{          
    return this.httpClient.post(this.urlMaintenanceWarranties,_request,{headers:this.header});
  }
  listWarranties():Observable<any>{
    const request = {filter : {fechaFin: '2022-05-12T09:47:38.423',fechaIni: '2022-05-12T09:47:38.423'}};
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
  //buscar OS
  findOs(os:string):Observable<any>{
    const _params = new HttpParams().set('req',os);
    return this.httpClient.get(this.urlFindOs, {params:_params,headers:this.header});
  }

  getListaTipoDeGarantias():Observable<any>{
    return this.httpClient.post(this.urlListaTipoDeGarantias, {});
  }
}
