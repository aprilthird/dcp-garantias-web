import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpResponse } from "app/core/types/http.types";
import { Perfil } from "app/core/types/perfil.types";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CrearUsuarioService {
  _perfiles: BehaviorSubject<Perfil[]> = new BehaviorSubject(null);
  _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  _isValidUsr: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private _httpClient: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  set loading(next: boolean) {
    this._loading.next(next);
  }

  get perfiles$(): Observable<Perfil[]> {
    return this._perfiles.asObservable();
  }

  set perfiles(next) {
    this._perfiles.next(next);
  }

  get isValidUsr$(): Observable<boolean> {
    return this._isValidUsr.asObservable();
  }

  /**
   * Creación y edición de usuario
   *
   * Si data no tiene id es creación de usuario
   * Si data tiene id es edición del usuario
   *
   * @param data
   * @returns
   */
  saveUsuario(data): Observable<HttpResponse<any>> {
    if (!this._loading.value) {
      this._loading.next(true);
      return this._httpClient
        .post<HttpResponse<any>>(
          environment.apiUrl + "/Seguridad/RegistrarUsuario",
          data
        )
        .pipe(
          tap(() => {
            this._loading.next(false);
          })
        );
    }
  }

  /**
   * Obtener la información del usuario
   * @param id id del usuario
   * @returns
   */
  getUsuario(id): Observable<HttpResponse<any>> {
    this._loading.next(true);
    return this._httpClient
      .get<HttpResponse<any>>(
        environment.apiUrl + "/Seguridad/ObtenerUsuario/" + id
      )
      .pipe(
        tap(() => {
          this._loading.next(false);
        })
      );
  }

  // validateUser(usr: string): Observable<Response> {
  //   const endpoint = environment.apiUrl + "/Seguridad/ValidarUsuarioAD/" + usr;
  //   return this._httpClient.get<Response>(endpoint);
  // }

  getClintInfo(usr: string): Observable<Response> {
    const endpoint =
      environment.apiUrl + "/Seguridad/ADObtenerUsuario?usr=" + usr;
    return this._httpClient.get<Response>(endpoint);
  }
}
