import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
url:string="http://localhost/UserServices/api/userapi"//"http://localhost:62659/api/userapi"
  constructor(private _http: Http) { }

  get(): Observable<any> {
    return this._http.get(this.url)
        .map((response: Response) => <any>response.json())
        // .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
  }

  post( model: any): Observable<any> {
      let body = JSON.stringify(model);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post(this.url, body, options)
          .map((response: Response) => <any>response.json())
          .catch(this.handleError);
  }

  put( id: number, model: any): Observable<any> {
      let body = JSON.stringify(model);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.put(this.url +'?id='+ id, body, options)
          .map((response: Response) => <any>response.json())
          .catch(this.handleError);
  }

  delete( id: number): Observable<any> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.delete(this.url +'?id='+ id, options)
          .map((response: Response) => <any>response.json())
          .catch(this.handleError);
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }


}
