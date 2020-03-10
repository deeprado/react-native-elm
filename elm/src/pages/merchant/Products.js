'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  onAddProduct,
  onRemProduct,
  onMinusProduct,
  onPlusProduct,
} from '../../redex/actions/cart';

import CateData from '../../data/product';
import px2dp from '../../util';
import {Icon} from 'react-native-elements';

const logoPng = require('../../assets/images/logo.png');

const {width, height} = Dimensions.get('window');

class Products extends Component {
  constructor(props) {
    super(props);

    this._flatList = null;
    this._sectionList = null;
    this.refObjs = [];
    this.state = {
      selectedRootCate: 0,
      headHeight: props.headHeight ? props.headHeight : 54,
    };
    this.goPage = this.goPage.bind(this);
    this._renderProductItem = this._renderProductItem.bind(this);
  }

  goPage = routeName => {
    this.props.navigation.navigate(routeName);
  };

  // 添加购物车
  addItem(product, key) {
    // 动画
    let refName = 'ref' + key;
    this.refObjs[refName].measure((a, b, w, h, px, py) => {
      this.props.addProduct({
        x: px,
        y: py,
        data: product,
        pos: [px, py, 26, height - 60],
      });
    });
    // 业务
    this.props.onAddProduct({
      id: product.id,
      price: product.price,
      imgUrl: product.itemImg,
      title: product.title,
    });
  }

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();
  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderItem = item => {
    let index = item.index;
    let title = item.item.title;
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
          },
          this.state.selectedRootCate === index
            ? {
                backgroundColor: '#FFF',
                borderLeftWidth: 4,
                borderLeftColor: '#FFA93F',
              }
            : {backgroundColor: '#F5F5F5'},
        ]}
        onPress={() => {
          this.setState({selectedRootCate: index});
        }}>
        <Text
          style={{
            fontSize: 12,
            color: this.state.selectedRootCate === index ? '#FFA93F' : '#333',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  renderRootCate() {
    let data = [];
    CateData.data.map((item, index) => {
      data.push({key: index, title: item.cateName});
    });
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={flatList => (this._flatList = flatList)}
          data={data}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#FFF'}} />
          )}
          renderItem={this._renderItem}
          onEndReachedThreshold={20}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  _renderProductItem(row) {
    let data = row.item;
    let key = row.index;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.goPage('ProductPage')}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: width * 0.24,
              height: width * 0.24,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: px2dp(10),
              borderWidth: px2dp(1),
              borderColor: '#333',
              overflow: 'hidden',
            }}>
            <Image
              source={logoPng}
              style={{width: width * 0.2, height: width * 0.2}}
            />
          </View>
          <View style={{marginLeft: 10, flex: 1, paddingRight: 15}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 5,
                paddingBottom: 5,
              }}>
              <Text style={{fontSize: 14}}>{data.title}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#222',
                  }}>
                  月售28
                </Text>
                <Text style={{marginLeft: 5, fontSize: 11, color: '#222'}}>
                  评分4
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                  }}>
                  ￥
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'red',
                    marginBottom: -4,
                  }}>
                  {data.price ? data.price : 2}
                </Text>
              </View>
              <TouchableOpacity
                ref={refObj => (this.refObjs['ref' + key] = refObj)}
                onPress={this.addItem.bind(this, data, key)}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#2D2DA0',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="shopping-cart"
                    color="#fff"
                    size={12}
                    type="feather"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderItemCate() {
    let {data, cateName} = CateData.data[this.state.selectedRootCate];
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginLeft: 10,
          marginTop: 8,
        }}>
        <View>
          <ScrollView horizontal={true}>
            <View
              style={{
                width: 80,
                height: 32,
                backgroundColor: '#aaa',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                overflow: 'hidden',
                marginRight: 5,
              }}>
              <Text style={{fontSize: 12}}>推荐</Text>
            </View>
            <View
              style={{
                width: 80,
                height: 32,
                backgroundColor: '#aaa',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                overflow: 'hidden',
                marginRight: 5,
              }}>
              <Text style={{fontSize: 12}}>推荐</Text>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                color: '#333',
              }}>
              {cateName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  color: '#333',
                }}>
                销量
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 13,
                  color: '#333',
                }}>
                价格
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderProductItem}
          ItemSeparatorComponent={this._separator}
          flashScrollIndicators={true}
        />
      </View>
    );
  }

  render() {
    let {headHeight} = this.state;
    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: 260, //headHeight + px2dp(46),
          },
        ]}>
        {/* <View>
          <Text>商品列表</Text>
        </View> */}
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{backgroundColor: '#F5F5F5', width: width * 0.2}}>
            {this.renderRootCate()}
          </View>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {this.renderItemCate()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  onAddProduct: product => dispatch(onAddProduct(product)),
  onRemProduct: product => dispatch(onRemProduct(product)),
  onMinusProduct: product => dispatch(onMinusProduct(product)),
  onPlusProduct: product => dispatch(onPlusProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Products);
