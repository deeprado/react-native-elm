'use strict';

import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import NavBar from '../../components/NavBar';
import MenuItem from '../../components/MenuItem';

// 设置
class Setting extends Component {
  constructor(props) {
    super(props);
    // this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  goProfile() {
    this.props.navigation.navigate('Profile', {
      args: {},
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <NavBar
          title="设置"
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
        />
        <ScrollView>
          <MenuItem
            navigation={navigation}
            routeName="Profile"
            name="账户安全"
            first={true}
            onPress={this.goProfile.bind(this)}
          />
          <MenuItem navigation={navigation} routeName="Profile" name="通用" />
          <MenuItem
            navigation={navigation}
            routeName="About"
            name="关于饿了么"
            first={true}
          />
          <MenuItem.Button name="退出登录" first={true} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
