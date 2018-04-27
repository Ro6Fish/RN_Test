import React from 'react';
import AppConfig from '../common/AppConfig';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

var storage = new Storage({

    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    // sync: require('你可以另外写一个文件专门处理sync')
})

let appConfig = new AppConfig();
let urlPrefix = appConfig.getUrlPrefix();
let apiUtil;

export default class ApiUtil {

    constructor() {
        apiUtil = this;
        apiUtil.cookie = apiUtil.loadCookie(); // 从缓存中获取cookie
    }

    requestAction(action, formData) {

        let url = action.url;
        let method = action.method;

        console.info("url:" + url);
        console.info("method:" + method);

        const promise = new Promise(function (resolve, reject) {

            let request_url = urlPrefix + url;

            console.info("promise:" + request_url);

            let opts;

            if (method == 'POST') {

                opts = {

                    method: method,
                    headers: {

                        'Accept': 'application/json',
                        // 'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': apiUtil.cookie,
                    },
                    body: formData,
                    // credentials: 'include',
                }

            } else if (method == 'GET') {

                opts = {

                    method: method,
                    headers: {

                        'Accept': 'application/json',
                        // 'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': apiUtil.cookie,
                    },
                    // credentials: 'include',
                }

                if (formData) {

                    let paramsArray = [];
                    //拼接参数
                    Object.keys(formData).forEach(key => paramsArray.push(key + '=' + formData[key]))
                    if (request_url.search(/\?/) === -1) {
                        request_url += '?' + paramsArray.join('&')
                    } else {
                        request_url += '&' + paramsArray.join('&')
                    }
                }

                console.info("opts:" + request_url);
            }

            fetch(urlPrefix + url, opts).then((response) => apiUtil.handleCookie(response)).then((response) => response.json()).then((responseJson) => {

                console.info('返回结果：');
                console.info(responseJson);

                let stateCode = responseJson.state.stateCode;

                if (stateCode == 0) {
                    resolve(responseJson);
                } else {

                    // todo 处理返回4035 token失效 使用 Events 传送token失效事件

                    reject(responseJson);
                }

            }).catch((error) => {

                console.info('产生错误' + error);

                // todo 根据错误code细化网络错误
                let responseStr = {'state': {'stateCode': 9999, 'stateMessage': "网络错误"}, 'data': {}};

                reject(responseStr);

            });
        });

        return promise;
    }

    // https://github.com/sunnylqm/react-native-storage 本地化存储
    saveCookie(cookieStr) {

        storage.save({

            key: 'responseheaders',  // 注意:请不要在key中使用_下划线符号!
            data: {
                cookie: cookieStr,
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });

        console.info("saveCookie:" + cookieStr);
    }

    loadCookie() {

        let storageCookie = '';

        storage.load({

            key: 'responseheaders',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {

                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {

                // 如果找到数据，则在then方法中返回
                // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
                // 你只能在then这个方法内继续处理ret数据
                // 而不能在then以外处理
                // 也没有办法“变成”同步返回
                // 你也可以使用“看似”同步的async/await语法

                storageCookie = ret.cookie;

                console.log('loadCookie:' + storageCookie);
                this.cookie = storageCookie;
            }
        ).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.info(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })

        return storageCookie;
    }

    removeCookie() {

        storage.remove({
            key: 'responseheaders'
        });
    }

    handleCookie(response) {

        // console.info(response);
        let cookieHeader = response.headers.map['set-cookie'];

        if (!cookieHeader) {
            console.info("handleCookie: 不是登录没有返回cookie");
        } else {
            // 存储cookie，判断存储的cookie是否存在，并且不和新cookie相同，则更新存储
            this.saveCookie(cookieHeader[0]);
            console.info("handleCookie:cookie:" + cookieHeader[0]);
        }

        return response
    }
}