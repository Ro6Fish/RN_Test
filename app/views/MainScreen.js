import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';
import BasePage from './base/BasePage';
import Api from "../net/Api";

export default class MainScreen extends BasePage {

    constructor() {
        super();
    };

    renderPage() {
        return (
            <View>

                <TouchableOpacity
                    style={{height: 100}}
                    onPress={() =>
                        this.orderDetail()
                    }>
                    <Text style={styles.button}>
                        订单详情
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{height: 100}}
                    onPress={() =>
                        this.signIn()
                    }>
                    <Text style={styles.button}>
                        登录
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{height: 100}}
                    onPress={() =>
                        this.signOut()
                    }>
                    <Text style={styles.button}>
                        注销
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    signIn() {

        let username = '18911840331';
        let password = 'a12345';

        // this.api.signIn(username, password);
    }

    signOut() {

        // this.api.signOut();
    }

    orderDetail() {

        let orderCode = '010901803230006002';
        let pageId = '0';
        let pageCount = '1';

        Api.instance().getOrderDetail(orderCode, pageId, pageCount).then((data) => {

            console.info('orderDetail succ');

            console.info(data);

            console.info('orderDetail succ');

        }, (data) => {

            console.info('orderDetail fail');

            console.info(data);

            console.info('orderDetail fail');
        });
    }
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 36,
        paddingBottom: 32,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
})