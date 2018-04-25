
import { StackNavigator } from 'react-navigation'
import { YellowBox, Easing, Animated } from 'react-native';
import MainScreen from './views/MainScreen'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const App = StackNavigator({
    Main: { screen: MainScreen }
}, {
    initialRouteName: 'Main',
    headerMode: 'none',  // float：类似iOS，screen：左右，none:无
    navigationOptions: {
        gesturesEnabled: true,
    },
    transitionConfig: () => ({
        // 只要修改最后的forVertical就可以实现不同的动画了。
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
});

export default App;