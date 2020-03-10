/**
 * 欢迎页
 * @flow
 * **/

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  InteractionManager,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate('AppPage', {
          theme: this.theme,
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <Image
          style={{flex: 1, width: width, height: height}}
          source={require('../assets/images/LaunchScreen.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
