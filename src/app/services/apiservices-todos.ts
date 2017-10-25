import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Todosinformation } from '../services/todosdetails';


@Injectable()
export class ApiServiceTodos {

    private todoURL = 'http://localhost:3000/users';
    constructor(private http: Http) { }

    gettodosInformation(): Observable<Todosinformation[]> {
        return this.http
            .get(this.todoURL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Fetch article by id
    getTodoById(todoId: string): Observable<Todosinformation> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        console.log(this.todoURL + '/' + todoId);
        return this.http.get(this.todoURL + '/' + todoId)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // create todo information
    createTodo(todosinformation: Todosinformation): Observable<number> {
        console.log('inside todo working fine', this.todoURL, todosinformation);
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.todoURL, todosinformation, options)
            .map(success => success.status)
            .catch(this.handleError);

    }


    //  Update article
    updateArticle(todosinformation: Todosinformation): Observable<number> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.todoURL + '/' + todosinformation.id, todosinformation, options)
            .map(success => success.status)
            .catch(this.handleError);
    }

    // Delete using todo ID
    deleteTodoById(todoId: string): Observable<number> {
        alert('comeinghere for delete purbose');
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.todoURL + '/' + todoId)
            .map(success => success.status)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        const body = res.json();
        return body;
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
