import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams,
         HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
         HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { environment } from '../../../../environments/environment';

/**
 * TOKEN拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private TokenService: TokenService ) {}

    private goLogin() {
        const router = this.injector.get(Router);
        this.injector.get(Router).navigate([ '/login' ]);
    }

    //   复制与添加token处理，修改url
    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {

        // 统一加上服务端前缀
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://') && url.indexOf('/rest') >= 0) {
            url = environment.SERVER_URL + url;
        }
        //  'Bearer ' + token
        return req.clone({ setHeaders: { Authorization: '' + token }, url: url });
    }

    //   拦截器
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // let header: HttpHeaders = null;
        //
        return next
            .handle(this.addToken(req, this.injector.get(TokenService).data.token))
                .mergeMap((event: any) => {
                    // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                    if (event instanceof HttpResponse && event.status !== 200) {
                        // observer.error 会跳转至后面的 `catch`
                        // return Observable.create(observer => observer.error(event));
                    }
                    //    token过期 未登录处理
                    if (event instanceof HttpResponse && event.status === 200 && event.body.retCode === -1 && event.body.msg === '用户未登录') {
                        //   取用户信息
                        if ('user' in this.injector.get(TokenService).user) {
                            //   有用户信息
                            const param = new HttpParams().set('user', this.injector.get(TokenService).user.user)
                                .set('pwd', this.injector.get(TokenService).user.pwd);
                            //   复制请求
                            const newLogin = req.clone({
                                params: param,
                                // headers: header,
                                url: environment.SERVER_URL + '/rest/ajax.php/login'
                            });
                            //   发起登录请求
                            return next.handle(newLogin).mergeMap((event2: any) => {
                                //   
                                if (event2 instanceof HttpResponse && event2.status === 200 && event2.body.retCode === 0) {
                                    //   重新登录成功
                                    //   保存token
                                    this.injector.get(TokenService).data = event2.body;
                                    //   用新token重发请求
                                    return next.handle(this.addToken(req, this.injector.get(TokenService).data.token))
                                        .mergeMap((event3: any) => {
                                            return Observable.create(observer => observer.next(event3));
                                        });
                                } else {
                                    //    登录失败
                                    this.goLogin();
                                    return Observable.create(observer => observer.error({ status: 401 }));
                                }
                                // return Observable.create(observer => observer.next(event2));
                            });
                        }else {
                            //   无用户信息 重新登录
                            this.goLogin();
                            return Observable.create(observer => observer.error({ status: 401 }));
                        }
                    }
                    // 若一切都正常，则后续操作
                    return Observable.create(observer => observer.next(event));
                })
                .catch((res: HttpResponse<any>) => {
                    // 一些通用操作
                    switch (res.status) {
                        case 401: // 未登录状态码
                            this.goLogin();
                            break;
                        case 200:
                            // 业务层级错误处理
                            console.log('业务错误');
                            break;
                        case 404:
                            // 404
                            break;
                    }
                    // 以错误的形式结束本次请求
                    return Observable.throw(res);
                })
                ;
    }
}
