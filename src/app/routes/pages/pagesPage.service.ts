import { HttpClient, HttpParams } from '@angular/common/http';
import { _HttpClient } from '../../core/services/http.client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
/**
 * 单页请求
 */
export class PagesPageService {
    //   登录
    pageLogin(user) {
        // fix laster version
        const param = new HttpParams().set('user', user.user).set('pwd', user.pwd);
        return this.http.post('/rest/ajax.php/login', param.toString())
            .catch(this.handleError);
    }


    handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    


    constructor(private http: _HttpClient) {
    }


}
