import React from 'react';
import Action from '../net/Action';
import ApiUtil from '../net/ApiUtil';

var apiUtil = new ApiUtil();

export default class Api {

    constructor() {

        // this.apiUtil = new ApiUtil();
    }

    // 登录
    signIn(username, password) {

        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        return apiUtil.requestAction(Action.SIGN_IN, formData)
    }

    // 注销
    signOut() {

        // 成功以后在调用
        apiUtil.removeCookie();
        return apiUtil.requestAction(Action.SIGN_OUT, '')
    }

    // 订单
    getOrderDetail(orderCode, pageId, pageCount) {

        let formData = new FormData();

        formData.append('orderCode', orderCode);
        formData.append('pageId', pageId);
        formData.append('pageCount', pageCount);

        return apiUtil.requestAction(Action.ORDER_DETAIL, formData)
    }
}