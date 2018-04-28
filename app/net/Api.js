import React from 'react';
import Action from '../net/Action';
import ApiUtil from '../net/ApiUtil';

var _api;

export default class Api {

    constructor() {

        if (_api) {
            return _api
        }
        this.apiUtil = new ApiUtil();
        return this;
    }

    static instance() {
        let singleton = new Api();
        return singleton;
    }

    // 登录
    signIn(username, password) {

        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        return this.apiUtil.requestAction(Action.SIGN_IN, formData)
    }

    // 注销
    signOut() {

        // 成功以后在调用 todo
        this.apiUtil.removeCookie();
        return this.apiUtil.requestAction(Action.SIGN_OUT, '')
    }

    // 订单
    getOrderDetail(orderCode, pageId, pageCount) {

        let formData = new FormData();

        formData.append('orderCode', orderCode);
        formData.append('pageId', pageId);
        formData.append('pageCount', pageCount);

        return this.apiUtil.requestAction(Action.ORDER_DETAIL, formData)
    }
}

