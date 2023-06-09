import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FallasService {

  header = new HttpHeaders({
    'Authorization': this.authService.accessToken
  });

 dateCurrent = new Date();
 
 private baseApiURl = environment.apiUrl;
 private mantenimientoFallasUrl = this.baseApiURl + '/Mantenimiento/MantenimientoFallas';
 private bandejaFallasUrl = this.baseApiURl + '/Mantenimiento/BandejaFallas';
 
  constructor(private readonly httpClient: HttpClient,
              private readonly authService: AuthService) { }
  
  mantenimientoFallas(_request:any):Observable<any>{
    return this.httpClient.post(this.mantenimientoFallasUrl,_request,{headers:this.header});    
  }
  bandejaFallas(_page:number,_filter:any):Observable<any>{
    const request = {filter : _filter,page:(_page-1),pageSize:10};
    return this.httpClient.post(this.bandejaFallasUrl, request, {headers:this.header});
  }
  bandejaBusquedaFallas(_page, _filter):Observable<any>{
    const request = {filter : _filter ,page:(_page-1),pageSize:10};
    return this.httpClient.post(this.bandejaFallasUrl, request, {headers:this.header});
  }
}
