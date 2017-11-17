import { HttpClient, HttpParams } from '@angular/common/http';
import { _HttpClient } from '../../core/services/http.client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServerService {
    //   取服务列表
    getList(args?: any) {
        // fix laster version
        let param = new HttpParams();
        console.log(args);
        if (args) {
            Object.keys(args).forEach(key => {
                param = param.append(key, args[key]);
            });
        }

        return this.http.post('/rest/ajax.php/cliStatus', param.toString())
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
