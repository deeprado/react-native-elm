import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import NavBar from '../components/NavBar';

import {onThemeChange} from '../redex/actions/theme';

import MyWebView from '../components/MyWebView';

class PopularScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <NavBar title="发现" />
        <MyWebView
          source={{uri: 'https://www.baidu.com'}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularScreen);
