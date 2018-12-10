import {Injectable, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {RefreshType} from "../model/refresh";
import {Router} from "@angular/router";

@Injectable()
export class TokenService implements OnInit {

  public accessTokenKey: string = "access_token";
  public refreshTokenKey: string = "refresh_token";

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router : Router) {}

  ngOnInit() {}

  public saveAccess(accessToken: string, expires: number = 604800) {
    this.cookieService.set(this.accessTokenKey, accessToken, expires, "/");
  }

  public saveRefresh(refreshToken: string) {
    this.cookieService.set(this.refreshTokenKey, refreshToken, 2147483647, "/");
  }

  public accessToken(): string {
    return this.cookieService.get(this.accessTokenKey)
  }

  public refreshToken(): string {
    return this.cookieService.get(this.refreshTokenKey)
  }

  public isTokenValid(): Observable<boolean> {
    return this.http.get<boolean>(('/api/discord/valid'))
      .map(() => true) //If 200, then it returns true.
      .catch(() =>  Observable.of<boolean>(false)) // Catching 401 with a false return.
  }

  public refresh() {
    const refreshToken = this.refreshToken();
    this.clearTokens();
    this.http.get('/api/discord/refresh', {
      params : {refresh_token : refreshToken}
    }).subscribe((res : RefreshType) => {
      this.saveAccess(res.access_token, Number(res.expires_in["expires_in"]));
      this.saveRefresh(res.refresh_token);
      this.router.navigate(["planner"])
    })
  }

  public clearTokens() {
    this.cookieService.delete(this.accessTokenKey, "/");
    this.cookieService.delete(this.refreshTokenKey, "/");
  }

  private static handleError(error : HttpErrorResponse) {
    console.error('Erreur dans TokenService', error.error);
    return Observable.throw(error);
  }

}
