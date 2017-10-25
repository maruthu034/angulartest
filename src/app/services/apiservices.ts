import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Userinformation } from '../interfaces/carddetails';


@Injectable()
export class ApiService {
    selectedUser: Userinformation;

    private _postsURL = 'https://jsonplaceholder.typicode.com/users';
    constructor(private http: Http) {
    }

    getUserInformation(): Observable<Userinformation[]> {
        return this.http
            .get(this._postsURL)
            .map((response: Response) => {
                return <Userinformation[]>response.json();
            })
            .catch(this.handleError);
    }

    getUserInformations(id: number): Observable<Userinformation> {
        return this.getUserInformation()
            // tslint:disable-next-line:no-shadowed-variable
            .map(Userinformation => Userinformation.find(selectedUser => selectedUser.id === id))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
