import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from 'app/core/auth/auth.service';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';
import internal from 'stream';

@Injectable({
    providedIn: 'root'
})
export class DigitalToolsService {

    header = new HttpHeaders({
        'Authorization': this.authService.accessToken
    });

    dateCurrent = new Date();

    private baseApiURl = environment.apiUrl;
    private urlToolManagement = this.baseApiURl + '/Mantenimiento/MantenimientoHerramientas';
    private urlToolUserManagement = this.baseApiURl + '/Mantenimiento/MantenimientoHerramientaUsuario';
    private urlUserListManagement = this.baseApiURl + '/Mantenimiento/ObtenerListadoUsuarios';
    private urlUserManagement = this.baseApiURl + '/Mantenimiento/ObtenerUsuario';
    private urlTrayTools = this.baseApiURl + '/Mantenimiento/BandejaHerramientas';
    private urlObtainLicenses = this.baseApiURl + '/Mantenimiento/ObtenerLicencias';

    constructor(private readonly httpClient: HttpClient,
                private readonly authService: AuthService) {
    }

    toolManagement(_request: any): Observable<any> {
        return this.httpClient.post(this.urlToolManagement, _request, {headers: this.header})
    }

    toolUserManagement(_request: any): Observable<any> {
        return this.httpClient.post(this.urlToolUserManagement, _request, {headers: this.header});
    }

    userListManagement(filter, _page): Observable<any> {
        const request = {filter: filter, page: (_page - 1), pageSize: 10};
        return this.httpClient.post(this.urlUserListManagement, request, {headers: this.header});
    }

    userManagementByDocument(dni: string): Observable<any> {
        return this.userManagement(1, dni);
    }

    userManagementByUsername(usr: string): Observable<any> {
        return this.userManagement(2, usr);
    }

    userManagement(code: number, search: string): Observable<any> {
        return this.httpClient.get(this.urlUserManagement + '/' + code + '/' + search, {headers: this.header});
    }

    trayTools(filter, _page): Observable<any> {
        const request = {filter: filter, page: (_page - 1), pageSize: 10};
        return this.httpClient.post(this.urlTrayTools, request, {headers: this.header});
    }

    searchUserByUsername(usr: string): Observable<any> {
        const request = {filter: {usuario: usr}, page: 0, pageSize: 10};
        return this.httpClient.post(this.urlUserListManagement, request, {headers: this.header});
    }

    obtainLicenses(toolId: string): Observable<any> {
        return this.httpClient.get(this.urlObtainLicenses + '/' + toolId, {headers: this.header});
    }
}
