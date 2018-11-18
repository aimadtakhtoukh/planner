import {environment} from "../../../environments/environment";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import 'rxjs/add/observable/throw';

import { User } from '../model/user';
import {Observable} from "rxjs/Observable";

const API_URL = environment.apiUrl + 'user';

@Injectable()
export class UserService {

    constructor(private http : HttpClient) {}

    public getAll() : Observable<User[]> {
        return this.http.get<User[]>((API_URL + '/all'))
            .pipe(catchError(UserService.handleError));
    }

    public get(id : number) {
        return this.http.get<User>(API_URL + '/id/' + id)
            .pipe(catchError(UserService.handleError));
    }

    public getSelf() {
        return this.http.get<User>(API_URL + '/@me')
            .pipe(catchError(UserService.handleError));
    }

    public getByName(name : string) {
        return this.http.get<User>(API_URL + '/name/' + name)
            .pipe(catchError(UserService.handleError));
    }

    public create(userName : string) {
        return this.http.post(API_URL + '/add', new User({name : userName}))
            .pipe(catchError(UserService.handleError));
    }

    private static handleError(error : HttpErrorResponse) {
            console.error('Erreur dans UserService', error.error);
            return Observable.throw(error);
    }

}
