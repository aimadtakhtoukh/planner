import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {TokenService} from "./token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService : TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.tokenService.accessToken()}`
            }
        });

        return next.handle(request);
    }
}