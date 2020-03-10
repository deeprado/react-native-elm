'use strict';

import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, StatusBar} from 'react-native';

import NavBar from '../../components/NavBar';
import MenuItem from '../../components/MenuItem';

// 用户
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <NavBar
          title="账户信息"
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
        />
        <ScrollView>
          <MenuItem name="头像" avatar={2} first={true} />
          <MenuItem name="用户名" disable={true} subName="deeprado" />
          <Text style={styles.title}>{'账号绑定'}</Text>
          <MenuItem
            name="手机"
            iconSize={20}
            type="font-awesome"
            icon="mobile"
            subName="136****1512"
          />
          <MenuItem
            name="微信"
            color="#1bce4a"
            iconSize={15}
            type="font-awesome"
            icon="wechat"
            subName="已绑定"
          />
          <MenuItem
            name="QQ"
            color="#ce3c1b"
            iconSize={15}
            type="font-awesome"
            icon="qq"
            subName="未绑定"
          />
          <MenuItem
            name="微博"
            color="#fa7d3c"
            iconSize={16}
            type="font-awesome"
            icon="weibo"
            subName="未绑定"
          />
          <Text style={styles.title}>{'安全设置'}</Text>
          <MenuItem name="登录密码" subName="未绑定" />
          <MenuItem name="支付密码" subName="未绑定" />
          <MenuItem name="小额免密支付" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#666',
  },
});

export default UserProfile;
