import {Injectable, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class TokenService implements OnInit {

    public accessTokenKey : string = "access_token";
    public refreshTokenKey : string = "refresh_token";

    constructor(private cookieService : CookieService) { }

    ngOnInit() {
        console.log(this.cookieService.getAll())
    }

    // TODO ; Expires
    public saveAccess(accessToken : string) {
        this.cookieService.set(this.accessTokenKey, accessToken, 100000, "");
        this.cookieService.set(this.accessTokenKey, accessToken, 100000, "/");
    }

    public saveRefresh(refreshToken : string) {
        this.cookieService.set(this.refreshTokenKey, refreshToken, 100000, "");
        this.cookieService.set(this.refreshTokenKey, refreshToken, 100000, "/");
    }

    public accessToken() : string {
        return this.cookieService.get(this.accessTokenKey)
    }

    public refreshToken() : string {
        return this.cookieService.get(this.refreshTokenKey)
    }

    public clearTokens() {
        this.cookieService.delete(this.accessTokenKey, "");
        this.cookieService.delete(this.accessTokenKey, "/");
        this.cookieService.delete(this.refreshTokenKey, "");
        this.cookieService.delete(this.refreshTokenKey, "/");
    }

}
