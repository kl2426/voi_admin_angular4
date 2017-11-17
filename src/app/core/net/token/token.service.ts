import { Injectable } from '@angular/core';
import { TokenData, UserInfo } from './token.type';

/** 存储键 */
const KEY = '_user';
const USER_INFO = '_user_info';
/**
 * 基于Token认证，在前后端分离非常普通，本身只提供一个接口的形式展示如果优雅处理HTTP请求
 */
@Injectable()
export class TokenService {
    /**
     * 保存
     */
    set data(token: TokenData) {
        localStorage.setItem(KEY, JSON.stringify(token));
    }

    /**
     * 获取
     */
    get data(): TokenData {
        return (JSON.parse(localStorage.getItem(KEY) || '{}') || {}) as TokenData;
    }

    logout() {
        localStorage.removeItem(KEY);
        localStorage.removeItem(USER_INFO);
        console.log('logout');
    }

    /**
     * 保存用户账号信息用于重新登录
     */
    set user(obj: UserInfo) {
        localStorage.setItem(USER_INFO, JSON.stringify(obj));
    }
    /**
     * 获取用户账号信息用于重新登录
     */
    get user(): UserInfo {
        return (JSON.parse(localStorage.getItem(USER_INFO) || '{}') || {}) as UserInfo;
    }
}
