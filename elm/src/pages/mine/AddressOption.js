'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {
  onAddAddress,
  onRemAddress,
  onEditAddress,
  onClearAddress,
} from '../../redex/actions/harvest';

import {Toast, Provider} from '@ant-design/react-native';

import px2dp from '../../util';
import NavBar from '../../components/NavBar';
import Button from '../../components/Button';

// 地址操作
class AddressOption extends Component {
  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    console.log('params', params);
    let address = params
      ? params.address
      : {
          name: '',
          phone: '',
          tag: null,
          gender: null,
          addressShort: '',
          addressDetail: '',
          houseNumber: '',
        };
    let title = params ? params.title : {};
    let pageType = params ? params.pageType : {};
    this.state = {
      ...address,
      title,
      pageType,
    };
  }

  componentDidMount() {
    // this.intState();
  }

  // 确定
  onSubmit() {
    let {
      name,
      phone,
      tag,
      gender,
      addressShort,
      addressDetail,
      houseNumber,
    } = this.state;
    if (!name) {
      Toast.info('请输入姓名');
      return;
    }
    if (!phone) {
      Toast.info('请输入电话');
      return;
    }
    if (!gender && gender !== 0) {
      Toast.info('请选择性别');
      return;
    }
    if (!addressShort) {
      Toast.info('请输入参考地址');
      return;
    }
    if (!addressDetail) {
      Toast.info('请输入详细地址');
      return;
    }
    if (!houseNumber) {
      Toast.info('请输入门牌号');
      return;
    }
    if (!tag && tag !== 0) {
      Toast.info('请选择标签');
      return;
    }

    let addressObj;
    if (this.state.pageType) {
      // 修改
      addressObj = {
        id: this.state.id,
        name,
        phone,
        tag,
        gender,
        addressShort,
        addressDetail,
        houseNumber,
      };
      this.props.onEditAddress(addressObj);
      Toast.info(
        '修改成功',
        1,
        () => {
          this.goBack();
        },
        true,
      );
    } else {
      addressObj = {
        name,
        phone,
        tag,
        gender,
        addressShort,
        addressDetail,
        houseNumber,
      };
      this.props.onAddAddress(addressObj);
      Toast.info(
        '添加成功',
        1,
        () => {
          this.goBack();
        },
        true,
      );
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    let that = this;
    const {tags, genders} = this.props.harvest;

    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar
            hidden={false}
            backgroundColor="#0398ff"
            barStyle="light-content"
          />
          <NavBar
            title={this.state.title}
            leftIcon="ios-arrow-back"
            leftPress={() => this.goBack()}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={{marginTop: 10, backgroundColor: '#fff', paddingLeft: 16}}>
              <View style={styles.item}>
                <Text style={styles.label}>{'联系人'}</Text>
                <View style={{flex: 1}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    autoCapitalize={'none'}
                    ref={username => (this.username = username)}
                    onChangeText={name =>
                      this.setState({
                        name,
                      })
                    }
                    defaultValue={this.state.name}
                    style={styles.textInput}
                    placeholder="姓名"
                    placeholderTextColor="#aaa"
                  />
                  <View
                    style={{
                      paddingTop: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      borderTopWidth: 1,
                      borderTopColor: '#f8f8f8',
                    }}>
                    {genders.map(function(item, index) {
                      return (
                        <Button
                          key={'gender' + index}
                          style={{marginLeft: 10}}
                          onPress={() => {
                            that.setState({gender: index});
                          }}>
                          <Text
                            style={[
                              styles.radio,
                              that.state.gender === index
                                ? styles.active
                                : null,
                            ]}>
                            {item}
                          </Text>
                        </Button>
                      );
                    })}
                  </View>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>{'电话'}</Text>
                <View style={{flex: 1}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    keyboardType={'numeric'}
                    style={styles.textInput}
                    onChangeText={phone =>
                      this.setState({
                        phone,
                      })
                    }
                    defaultValue={this.state.phone}
                    placeholder="收货人电话"
                    placeholderTextColor="#aaa"
                  />
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>{'地址'}</Text>
                <View style={{flex: 1}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    onChangeText={addressShort =>
                      this.setState({
                        addressShort,
                      })
                    }
                    defaultValue={this.state.addressShort}
                    placeholder="小区/写字楼/学校"
                    placeholderTextColor="#aaa"
                  />
                  <View
                    style={{
                      paddingTop: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      borderTopWidth: 1,
                      borderTopColor: '#f8f8f8',
                    }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={styles.textInput}
                      onChangeText={addressDetail =>
                        this.setState({
                          addressDetail,
                        })
                      }
                      defaultValue={this.state.addressDetail}
                      placeholder="详细地址"
                      placeholderTextColor="#aaa"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>{'门牌号'}</Text>
                <View style={{flex: 1}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    onChangeText={houseNumber =>
                      this.setState({
                        houseNumber,
                      })
                    }
                    defaultValue={this.state.houseNumber}
                    placeholder="例：2号楼6C021"
                    placeholderTextColor="#aaa"
                  />
                </View>
              </View>
              <View style={[styles.item, {alignItems: 'center'}]}>
                <Text
                  style={{fontSize: px2dp(13), color: '#222', minWidth: 45}}>
                  {'标签'}
                </Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                  {tags.map(function(item, index) {
                    return (
                      <Button
                        key={'标签' + index}
                        style={{marginLeft: 10}}
                        onPress={() => {
                          that.setState({tag: index});
                        }}>
                        <Text
                          style={[
                            styles.radio,
                            that.state.tag === index ? styles.active : null,
                          ]}>
                          {item}
                        </Text>
                      </Button>
                    );
                  })}
                </View>
              </View>
            </View>
            <Button
              style={{
                marginTop: 20,
                marginHorizontal: 16,
                borderRadius: 6,
                overflow: 'hidden',
              }}
              onPress={this.onSubmit.bind(this)}>
              <View
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: '#56d176',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>{'确定'}</Text>
              </View>
            </Button>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  active: {
    borderColor: '#81c2ff',
    color: '#0096ff',
  },
  label: {
    minWidth: 45,
    fontSize: px2dp(13),
    color: '#222',
    paddingTop: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  radio: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#666',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: px2dp(13),
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  harvest: state.harvest,
});

const mapDispatchToProps = dispatch => ({
  onAddAddress: address => dispatch(onAddAddress(address)),
  onRemAddress: address => dispatch(onRemAddress(address)),
  onEditAddress: address => dispatch(onEditAddress(address)),
  onClearAddress: () => dispatch(onClearAddress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressOption);
