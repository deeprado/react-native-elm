'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  onAddAddress,
  onRemAddress,
  onEditAddress,
  onClearAddress,
} from '../../redex/actions/harvest';

import px2dp from '../../util';
import NavBar from '../../components/NavBar';
import Button from '../../components/Button';

// 地址
class Address extends Component {
  constructor(props) {
    super(props);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  add() {
    this.props.navigation.navigate('AddressOption', {
      pageType: 0,
      title: '新增地址',
    });
  }

  edit(address) {
    this.props.navigation.navigate('AddressOption', {
      pageType: 1,
      title: '修改地址',
      address,
    });
  }

  render() {
    const {harvest} = this.props;
    const {addresses, tags} = harvest;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <NavBar
          title="收货地址"
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
        />
        <ScrollView>
          {addresses.map((item, i) => {
            return (
              <Button key={i} onPress={this.edit.bind(this, item)}>
                <View style={styles.address}>
                  <View>
                    <Text style={{color: '#333', fontSize: px2dp(14)}}>
                      {item.name + ' ' + item.phone}
                    </Text>
                    <View style={styles.ads1List}>
                      <Text
                        style={[
                          styles.tag,
                          {backgroundColor: item.color || '#0096ff'},
                        ]}>
                        {tags[item.tag]}
                      </Text>
                      <Text style={{color: '#bbb', fontSize: px2dp(13)}}>
                        {item.addressShort}
                      </Text>
                    </View>
                  </View>
                  <Icon
                    name="md-create"
                    size={22}
                    color="#ccc"
                    type="ionicon"
                  />
                </View>
              </Button>
            );
          })}
        </ScrollView>
        <Button
          style={{position: 'absolute', bottom: 0, left: 0, right: 0, flex: 1}}
          onPress={this.add.bind(this)}>
          <View
            style={{
              height: px2dp(45),
              flexDirection: 'row',
              backgroundColor: '#fff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="ios-add-circle-outline"
              size={18}
              color="#0096ff"
              type="ionicon"
            />
            <Text
              style={{color: '#0096ff', fontSize: px2dp(14), marginLeft: 8}}>
              {'新增地址'}
            </Text>
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  address: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fbfbfb',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingVertical: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
