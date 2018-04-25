import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
 Platform,
 ViewPropTypes,
 View
} from 'react-native';

export default class BasePage extends Component<Props> {

  static propTypes = {
    ...ViewPropTypes,
    title: PropTypes.string,
    showBackButton: PropTypes.bool,
  };

  static defaultProps = {
    ...View.defaultProps,
    title: null,
    showBackButton: false,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.backListener && Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => this.onHardwareBackPress());
    }
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentWillUnmount() {
    if (this.backListener) {
      this.backListener.remove();
      this.backListener = null;
    }
    this.didMount = false;
  }

  componentWillMount() {
    if (!this.backListener && Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => this.onHardwareBackPress());
    }
  }

  //Android hardware back key handler, default is pop to prev page
  onHardwareBackPress() {
    if (!this.context.navigator) return false;
    let navigator = this.context.navigator();
    if (!navigator) return false;
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  renderPage() {
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
        {this.renderPage()}
      </View>
    );
  }

}
