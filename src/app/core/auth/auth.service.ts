import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, pipe, throwError } from "rxjs";
import { catchError, concatMap, delay, switchMap, tap } from "rxjs/operators";
import { AuthUtils } from "app/core/auth/auth.utils";
import { UserService } from "app/core/user/user.service";
import { environment } from "environments/environment";
import { Response } from "app/shared/models/general-model";
import { NavigationService } from "../navigation/navigation.service";

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    private NavigationService: NavigationService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post("api/auth/forgot-password", email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post("api/auth/reset-password", password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError("User is already logged in.");
    }

    return this._httpClient
      .get(
        environment.apiUrl +
        `/Seguridad/ADAutenticar?usr=${credentials.usr}&psw=${credentials.psw}`
      )
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.body;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = JSON.parse(
            AuthUtils._decodeToken(response.body).data
          );
          // Return a new observable with the response
          return of(response);
        })
      );
  }

  signInAD(emailAD: string): Observable<Response> {
            // Throw error, if the user is already logged in
      // console.log(emailAD);
      // console.log('funcion que trae el token');

      if (this._authenticated) {
        return throwError("User is already logged in.");
      }
      return this._httpClient.get(environment.apiUrl + `/Seguridad/ActiveDirectory?req=${emailAD}`)
        .pipe(
          switchMap((response: any) => {
          // tap(x => console.log(x));
          // console.log(response);
          this.NavigationService.get();
          // Store the access token in the local storage
          this.accessToken = response.body;
          // Set the authenticated flag to true
          this._authenticated = true;
          // Store the user on the user service
          this._userService.user = JSON.parse(
            AuthUtils._decodeToken(response.body).data
          );
          // Return a new observable with the response
          // console.log(response);
          return of(response);
        })
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    return this._httpClient.get(environment.apiUrl + "/Seguridad/Salir").pipe(
      switchMap((response: any) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("permissions");
        localStorage.removeItem("navigation");
        sessionStorage.clear();
        this._authenticated = false;
        return of(true);
      })
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient
      .post("api/auth/refresh-access-token", {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() =>
          // Return false
          of(false)
        ),
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.accessToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;

          // Return true
          return of(true);
        })
      );
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/sign-up", user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/unlock-session", credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    return of(true);
    //  return this.getUserDataInUsingToken();
    // //  return this.signInUsingToken();
  }

  /** Obtiene la información del usuario */
  getUserDataInUsingToken(): Observable<any> {
    this._userService.user = JSON.parse(
      AuthUtils._decodeToken(this.accessToken).data
    );

    return of(true);
  }
}
