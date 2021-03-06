import {throwError, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";

import * as moment from "moment";

import {Entry} from "../model/entry";
import {UserWithEntries} from "../model/userWithEntries";

const API_URL = environment.apiUrl + "entry";

@Injectable()
export class EntryService {

    private dateFormat : string = "YYYY-MM-DD";

    constructor(private http: HttpClient) {}

    public getAllByUsers(start : moment.Moment, end : moment.Moment) : Observable<UserWithEntries[]>  {
        return this.http
            .get<UserWithEntries[]>(API_URL + "/withUsers", { params : {
                start : start.format(this.dateFormat),
                end : end.format(this.dateFormat)
            }})
            .pipe( catchError(EntryService.handleError));
    }

    public getForUser(userId : number, start : moment.Moment, end : moment.Moment) {
        return this.http
            .get(API_URL + '/user/' + userId, { params : {
                start : start.format(this.dateFormat),
                end : end.format(this.dateFormat)
            }})
            .pipe(catchError(EntryService.handleError));
    }

    public getById(entryId : number) {
        return this.http
            .get(API_URL + '/' + entryId)
            .pipe(catchError(EntryService.handleError));
    }

    public updateEntry(entry : Entry) {
        this.http
            .post(API_URL + '/add', entry)
            .pipe( catchError(EntryService.handleError))
            .subscribe(() => {});
    }

    private static handleError(error : HttpErrorResponse) {
        console.error('Erreur dans EntryService', error.error);
        return throwError(error);
    }

}
