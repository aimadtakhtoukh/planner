import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {RefreshType} from "../model/refresh";

@Injectable()
export class TokenService implements OnInit {

  public accessTokenKey: string = "access_token";
  public refreshTokenKey: string = "refresh_token";

  constructor(private http: HttpClient,
              private router : Router) {}

  ngOnInit() {
    if (!this.accessToken() || this.accessToken() === "undefined") {
      localStorage.removeItem(this.accessTokenKey);
    }
    if (!this.refreshToken() || this.refreshToken() === "undefined") {
      localStorage.removeItem(this.refreshTokenKey);
    }
  }

  public saveAccess(accessToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken)
  }

  public saveRefresh(refreshToken: string) {
    localStorage.setItem(this.refreshTokenKey, refreshToken)
  }

  public accessToken(): string {
    return localStorage.getItem(this.accessTokenKey)
  }

  public refreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey)
  }

  public isTokenValid(): Observable<boolean> {
    return this.http.get<boolean>(('/api/discord/valid'))
      .map(() => true) //If 200, then it returns true.
      .catch(() => Observable.of<boolean>(false)) // Catching 401 with a false return.
  }

  public refresh() {
    const refreshToken = this.refreshToken();
    if (!refreshToken || refreshToken === "undefined") {
      this.clearTokens();
      this.router.navigate(["not-logged"])
    } else {
      this.http.get('/api/discord/refresh', {
        params : {refresh_token : refreshToken}
      }).subscribe(
        (res : RefreshType) => {
          this.clearTokens();
          this.saveAccess(res.access_token);
          this.saveRefresh(res.refresh_token);
          this.router.navigate(["planner"])
        }, () => {
          this.clearTokens();
          this.router.navigate(["not-logged"])
        })
    }
  }

  public clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private static handleError(error : HttpErrorResponse) {
    console.error('Erreur dans TokenService', error.error);
    return Observable.throw(error);
  }

}
