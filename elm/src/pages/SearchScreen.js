/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import px2dp from '../util';

import HistoryDishes from '../data/history';

let {width, height} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';
const headH = px2dp(isIOS ? 140 : 120);
const InputHeight = px2dp(28);

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show ? this.props.show : true,
      userHistoryDishes: HistoryDishes.user,
      hotHistoryDishes: HistoryDishes.hot,
    };
  }
  render() {
    let {userHistoryDishes, hotHistoryDishes} = this.state;
    return (
      <Animated.View style={[styles.container]}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => {}}>
            <View style={[styles.searchBtn, {backgroundColor: '#fff'}]}>
              <Icon name="search" size={20} color="#666" type="feather" />
              <Text style={{fontSize: 13, color: '#666', marginLeft: 5}}>
                {'输入商家，商品名称'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.head}>
            <Text style={{fontSize: px2dp(13), color: '#333'}}>
              {'历史搜索'}
            </Text>
            <TouchableOpacity>
              <Icon
                name={'trash'}
                size={px2dp(16)}
                color="#333"
                type="feather"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.queryList}>
            {userHistoryDishes.map((item, i) => {
              return (
                <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                  <TouchableOpacity>
                    <Text style={styles.queryItem}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View style={styles.head}>
            <Text style={{fontSize: px2dp(13), color: '#333'}}>
              {'热门搜索'}
            </Text>
          </View>
          <View style={styles.queryList}>
            {hotHistoryDishes.map((item, i) => {
              return (
                <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                  <TouchableOpacity>
                    <Text style={styles.queryItem}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  queryList: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  queryItem: {
    flex: 1,
    fontSize: px2dp(13),
    color: '#666',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
  scrollView: {},
  header: {
    backgroundColor: '#0398ff',
    paddingTop: px2dp(isIOS ? 30 : 10),
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
