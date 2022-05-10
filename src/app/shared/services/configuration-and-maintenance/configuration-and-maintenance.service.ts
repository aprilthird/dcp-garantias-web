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

  private baseApiURl = environment.apiUrl;
  private urlMaintenanceConstants = this.baseApiURl + '/Administracion/MantenimientoConstantes';
  private urlTrayConstants = this.baseApiURl + '/Administracion/BandejaConstantes';
  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }

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
}
