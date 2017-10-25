import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Userinformation } from '../services/carddetails';


@Injectable()
export class ApiService {
    selectedUser: Userinformation;

    private detailsURL = 'http://localhost:3000/details';
    constructor(private http: Http) {
    }

    getUserInformation(): Observable<Userinformation[]> {
        return this.http
            .get(this.detailsURL)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        const body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.statusText || error);
    }
}
