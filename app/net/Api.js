import React from 'react';
import AppConfig from '../common/AppConfig';
import Action from '../net/Action';

export default class Api {

    constructor() {

        let appConfig = new AppConfig();
        this.urlPrefix = appConfig.getUrlPrefix();
        // this.cookie = 'SESSION=61d31e8e-88a8-4cf8-b70b-bd07ea659588; Path=/merchant_api/; HttpOnly';
        this.cookie = ''; // todo 从缓存中获取cookie
    }

    requestAction(action, formData) {

        let url = action.url;
        let method = action.method;

        console.info("url:" + url);
        console.info("method:" + method);

        return fetch(this.urlPrefix + url, {

            method: method,
            headers: {

                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': this.cookie,
            },
            body: formData,
            // credentials: 'include',

        }).then((response) => this.getCookie(response)).then((response) => response.json()).then((responseJson) => {
            console.info('返回结果：');
            console.info(responseJson);
        }).catch((error) => {
            console.error('产生错误' + error);
        });
    }

    getCookie(response) {

        console.info(response);
        let cookieHeader = response.headers.map['set-cookie'];

        if (!cookieHeader) {
            console.info("cookie: 不存在");
        } else {
            // todo 存储cookie，判断存储的cookie是否存在，并且不和新cookie相同，则更新存储
            console.info("cookie:" + cookieHeader[0]);
        }

        // let content_type = header.map.data;
        console.info(cookieHeader);
        return response
    }

    // 登录
    signIn(username, password) {

        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        return this.requestAction(Action.SIGN_IN, formData)
    }

    // 注销
    signOut() {

        return this.requestAction(Action.SIGN_OUT, '')
    }

    // 订单
    getOrderDetail(orderCode, pageId, pageCount) {

        let formData = new FormData();

        formData.append('orderCode', orderCode);
        formData.append('pageId', pageId);
        formData.append('pageCount', pageCount);

        return this.requestAction(Action.ORDER_DETAIL, formData)
    }
}