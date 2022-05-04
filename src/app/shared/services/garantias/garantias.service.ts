import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarantiasService {

  private baseApiURl = environment.apiUrl;
  private urlListaTipoDeGarantias = this.baseApiURl + '/Administracion/BandejaTipoGarantia' ;

  constructor(private readonly httpClient: HttpClient) { }

  getListaTipoDeGarantias():Observable<any>{
    return this.httpClient.post(this.urlListaTipoDeGarantias, {});
  }
}
