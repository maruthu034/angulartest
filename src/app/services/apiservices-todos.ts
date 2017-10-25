import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Todosinformation } from '../interfaces/todosdetails';


@Injectable()
export class ApiServiceTodos {
    todosinformation: Todosinformation;
    headers: Headers;
    options: RequestOptions;

    private _postsURL = 'https://jsonplaceholder.typicode.com/todos';
    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    gettodosInformation(): Observable<Todosinformation[]> {
        return this.http
            .get(this._postsURL)
            .map((response: Response) => {
                return <Todosinformation[]>response.json();
            })
            .catch(this.handleError);
    }

    gettodosInformations(id: number): Observable<Todosinformation> {
        return this.gettodosInformation()
            // tslint:disable-next-line:no-shadowed-variable
            .map(Todosinformation => Todosinformation.find(todosinformation => todosinformation.id === id))
            .catch(this.handleError);
    }


    // updateService(url: string, param: any): Observable<any> {
    //     const body = JSON.stringify(param);
    //     return this.http
    //         .put(url, body, this.options)
    //         .map((response: Response) => {
    //             return <Todosinformation[]>response.json();
    //         })
    //         .catch(this.handleError);
    // }

    // deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
    //     return this.http
    //         .delete(url + '/?' + key + '=' + val, this.options)
    //         .map((response: Response) => {
    //             return <Todosinformation[]>response.json();
    //         })
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
