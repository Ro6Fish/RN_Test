import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import BasePage from './base/BasePage'

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
                        hello\n world
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    doNet() {

        var formData = new FormData();
        formData.append("orderCode", "010901803230006002");
        formData.append("pageId", "0");
        formData.append("pageCount", "1");

        fetch('http://stdev.hlvan.cn/merchant_api/backOrderController/orderInfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'SESSION=dd9c6d6d-a5a9-4f68-a74f-02ce280d28d1; Path=/merchant_api/; HttpOnly'
            },
            // body: JSON.stringify({
            //     orderCode: '010901803230006002',
            //     pageId: '0',
            //     pageCount: '1'
            // }),
            // body: "orderCode=010901803230006002&pageId=0&pageCount=1",
            body: formData,
        }).then((response) => response.json()).then((responseJson) => {
            console.info(responseJson)
        }).catch((error) => {
            console.error("请求错误" + error);
        });
    }
}

// import React, {Component} from 'react';
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
//
// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>
//                     Welcome to React Native!
//                 </Text>
//                 <Text style={styles.instructions}>
//                     To get started, edit App.js
//                 </Text>
//                 <Text style={styles.instructions}>
//                     {instructions}
//                 </Text>
//                 <Text style={styles.black}>
//                     this is my test
//                 </Text>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
//     black: {
//         fontSize: 12,
//         textAlign: 'right',
//         margin: 12,
//     },
// });