import React from 'react';
import AppConfig from '../common/AppConfig';
import Action from '../net/Action';

export default class Api {

    constructor() {

        let appConfig = new AppConfig();
        this.urlPrefix = appConfig.getUrlPrefix();
        this.cookie = 'SESSION=61d31e8e-88a8-4cf8-b70b-bd07ea659588; Path=/merchant_api/; HttpOnly';
    }

    requestNet(action, formData) {

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
        }).then((response) => this.getCookie(response)).then((response) => response.json()).then((responseJson) => {
            console.info('返回结果：');
            console.info(responseJson);
        }).catch((error) => {
            console.error('产生错误' + error);
        });
    }

    getCookie(response) {

        console.info(response);
        let headers = response.headers.map.cookie;
        // let content_type = header.map.data;
        console.info(headers);
        return response
    }

    // 订单
    getOrderDetail(orderCode, pageId, pageCount) {

        let formData = new FormData();

        formData.append('orderCode', orderCode);
        formData.append('pageId', pageId);
        formData.append('pageCount', pageCount);

        return this.requestNet(Action.ORDER_DETAIL, formData)
    }
}