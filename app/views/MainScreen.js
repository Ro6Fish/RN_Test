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
                    style={{height:100}}
                    onPress={() =>
                        this.props.navigation.navigate('Register', { name : "Hello world" })
                    }>
                    <Text>
                        hello\n world
                    </Text>
                </TouchableHighlight>
            </View>
        )
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