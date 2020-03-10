'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';

import px2dp from '../util';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

import DataAddress from '../data/address';
import DataNear from '../data/near';

export default class LbsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      address: DataAddress,
      near: DataNear,
    };
  }
  closeModal() {
    this.props.closeModal();
  }

  // 定位
  getLocation() {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.props.setLocation('中关村');
    }, 1200);
    /*
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log("title",initialPosition)
        this.setState({initialPosition});
      },
      (error) => AlertIOS.alert("title",JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )*/
  }
  render() {
    return (
      <Modal
        style={styles.wrap}
        animationType={'slide'}
        onRequestClose={() => {}}
        visible={this.props.modalVisible}>
        <NavBar
          title="选择收货地址"
          leftIcon="ios-close"
          leftPress={() => this.closeModal()}
        />
        <View style={styles.searchView}>
          <TextInput
            ref={search => (this.search = search)}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="请输入地址"
            placeholderTextColor="#666"
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{'当前地址'}</Text>
          <View style={styles.address}>
            <Text>{this.props.location}</Text>
            <TouchableOpacity onPress={this.getLocation.bind(this)}>
              <View style={styles.loadingBox}>
                {this.state.loading ? (
                  <ActivityIndicator style={styles.aior} />
                ) : (
                  <Icon
                    name="crosshair"
                    size={22}
                    color="#0398ff"
                    type="feather"
                  />
                )}
                <Text style={styles.posTxt}>{'重新定位'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{'收货地址'}</Text>
          {this.state.address.map((item, i) => {
            return (
              <Button key={i} onPress={() => {}}>
                <View style={styles.address1}>
                  <Text style={styles.contactTxt}>
                    {item.name + ' ' + item.phone}
                  </Text>
                  <View style={styles.ads1List}>
                    <Text
                      style={[
                        styles.tag,
                        {backgroundColor: item.color || '#0096ff'},
                      ]}>
                      {item.tag}
                    </Text>
                    <Text style={styles.addressTxt}>{item.address}</Text>
                  </View>
                </View>
              </Button>
            );
          })}
          <Text style={styles.title}>{'附近地址'}</Text>
          {this.state.near.map((item, i) => {
            return (
              <Button key={i} onPress={() => {}}>
                <View style={[styles.address, styles.addressBtm]}>
                  <Text>{item}</Text>
                </View>
              </Button>
            );
          })}
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    color: '#666',
  },
  scrollView: {
    backgroundColor: '#f3f3f3',
  },
  tag: {
    color: '#fff',
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: 'center',
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  ads1List: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  searchView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0398ff',
  },
  textInput: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 0,
    height: px2dp(28),
    borderRadius: px2dp(6),
    backgroundColor: '#fff',
  },
  address: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: px2dp(45),
    backgroundColor: '#fff',
  },
  address1: {
    borderBottomWidth: 1,
    borderBottomColor: '#fbfbfb',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  posTxt: {
    color: '#0398ff',
    fontSize: px2dp(13),
    marginLeft: 5,
  },
  contactTxt: {color: '#333', fontSize: px2dp(14)},
  loadingBox: {flexDirection: 'row', alignItems: 'center'},
  addressTxt: {color: '#bbb', fontSize: px2dp(13)},
  addressBtm: {borderBottomWidth: 1, borderBottomColor: '#f5f5f5'},
});
