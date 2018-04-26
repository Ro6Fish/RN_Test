import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import BasePage from './base/BasePage';

export default class MainScreen extends BasePage {

    constructor() {
        super();
    };

    renderPage() {
        return (
            <View>

                <TouchableHighlight
                    style={{height: 100}}
                    onPress={() =>
                        this.doNet()
                    }>
                    <Text>
                        订单详情
                    </Text>
                </>

                <TouchableHighlight
                    style={{height: 100}}
                    onPress={
                        // this.doNet()
                    }>
                    <Text>
                        登录
                    </Text>

                </TouchableHighlight>

                <TouchableHighlight
                    style={{height: 100}}
                    onPress={
                        // this.doNet()
                    }>
                    <Text>
                        退出
                    </Text>

                </TouchableHighlight>

            </View>
        )
    }

    doNet() {

        let orderCode = '010901803230006002';
        let pageId = '0';
        let pageCount = '1';

        this.api.getOrderDetail(orderCode, pageId, pageCount);
    }
}