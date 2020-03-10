'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  Easing,
  Animated,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {connect} from 'react-redux';
import {
  onAddProduct,
  onRemProduct,
  onMinusProduct,
  onPlusProduct,
  onClearProduct,
} from '../redex/actions/cart';
import {Modal, Toast, Provider} from '@ant-design/react-native';

import {Icon} from 'react-native-elements';

import px2dp from '../util';
import {TouchableOpacity} from 'react-native-gesture-handler';

// const logoPng = require('../assets/images/logo.png');

let {width} = Dimensions.get('window');

class ShopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0),
      cartVisible: false,
    };
    this.showCartModal = this.showCartModal.bind(this);
    this.closeCartModal = this.closeCartModal.bind(this);
    this.plusProduct = this.plusProduct.bind(this);
    this.minusProduct = this.minusProduct.bind(this);
  }

  runAnimate() {
    this.state.scale.setValue(0);
    Animated.timing(this.state.scale, {
      toValue: 2,
      duration: 320,
      easing: Easing.elastic(3),
    }).start();
  }

  // 打开性别模态矿
  showCartModal() {
    this.setState({
      cartVisible: true,
    });
  }

  // 关闭性别模态矿
  closeCartModal() {
    this.setState({
      cartVisible: false,
    });
  }

  clickBar = () => {
    let {cart} = this.props;
    let {total} = cart;
    if (total > 0) {
      this.showCartModal();
    }
  };

  _renderModalBar = () => {
    let {cart} = this.props;
    let {products, total} = cart;
    return (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.9)',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.closeCartModal()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginLeft: 20,
                position: 'relative',
                alignItems: 'center',
              }}>
              <View style={[styles.iconView, styles.iconViewActive]}>
                <Icon
                  type="feather"
                  name="shopping-cart"
                  size={px2dp(14)}
                  color={products.length ? '#fff' : '#666'}
                />
              </View>
              <View style={[styles.count]}>
                <Text style={styles.totalTxt}>{total}</Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 20,
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: px2dp(14),
                  }}>
                  ￥
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: px2dp(16),
                  }}>
                  {cart.goodsPrice}
                </Text>
              </View>

              <Text style={styles.sendTxt}>
                {'另加' + cart.freight + '元配送费'}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#00c257',
              paddingTop: 6,
              paddingBottom: 6,
            }}>
            <Text style={[styles.price, styles.priceBox]}>{'去结算'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _renderBar = () => {
    let {cart} = this.props;
    let {products, total} = cart;
    return (
      <View style={styles.cartBar}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.clickBar()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View style={styles.tipBox}>
            {cart.products.length > 0 ? (
              [
                <Text style={styles.priceTxt}>￥{cart.goodsPrice}</Text>,
                <Text style={styles.sendTxt}>
                  {'另加' + cart.freight + '元配送费'}
                </Text>,
              ]
            ) : (
              <Text style={styles.emptyTxt}>{'购物车为空'}</Text>
            )}
          </View>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: cart.goodsPrice
                ? '#00c257'
                : 'rgba(255,255,255,.1)',
            }}>
            {cart.goodsPrice ? (
              <Text style={[styles.price, styles.priceBox]}>{'去结算'}</Text>
            ) : (
              <Text style={styles.price}>{'￥6元起'}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  minusProduct = item => {
    this.props.onMinusProduct(item);
  };

  plusProduct = item => {
    this.props.onPlusProduct(item);
  };

  clearProduct = () => {
    this.props.onClearProduct();
    this.closeCartModal();
  };

  // 满额提示
  _renderTip = () => {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: -30,
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'yellow',
          paddingTop: 5,
          paddingBottom: 5,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          overflow: 'hidden',
        }}>
        <Text style={{fontSize: 13}}>还差</Text>
        <Text style={{fontSize: 15, color: 'red'}}>6</Text>
        <Text style={{fontSize: 13}}>元起送（按优惠后金额计算）</Text>
        <TouchableOpacity
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, color: 'red'}}>去凑单</Text>
          <Icon name="chevron-right" type="feather" size={14} color="red" />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    let that = this;
    let {cart} = this.props;
    let {products, total} = cart;
    return (
      <Provider>
        <View style={styles.cartView}>
          <Modal
            popup
            maskClosable
            visible={this.state.cartVisible}
            animationType="slide-up"
            onClose={this.closeCartModal}>
            <View>
              {/* 订单信息 */}
              <View style={{position: 'relative'}}>
                {/* 凑单提示 */}
                {this._renderTip()}
                <View
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  {/* 统计信息 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{fontSize: 18}}>共{total}件商品</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon
                            name="gift"
                            type="feather"
                            color="red"
                            size={14}
                          />
                          <Text style={{marginLeft: 5, fontSize: 14}}>
                            领券
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{marginLeft: 20}}
                        onPress={() => this.clearProduct()}>
                        <Text>清空</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* 商品列表 */}
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    {products.map(function(item, index) {
                      return (
                        <View
                          key={'product' + index}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                          }}>
                          <View>
                            <Image
                              source={{uri: item.imgUrl}}
                              style={{width: 60, height: 60}}
                            />
                          </View>
                          <View style={{flex: 1, marginLeft: 10}}>
                            <View>
                              <Text>{item.title}</Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'flex-end',
                                }}>
                                <Text style={{fontSize: 12, color: 'red'}}>
                                  ￥
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: 'red',
                                    marginBottom: -3,
                                  }}>
                                  {item.price}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={() => that.minusProduct(item)}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#fff',
                                    borderWidth: 1,
                                    borderColor: 'blue',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: '700',
                                      fontSize: 16,
                                      color: 'blue',
                                    }}>
                                    —
                                  </Text>
                                </TouchableOpacity>
                                <View
                                  style={{paddingLeft: 15, paddingRight: 15}}>
                                  <Text>{item.total}</Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() => that.plusProduct(item)}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    backgroundColor: 'blue',
                                    borderWidth: 1,
                                    borderColor: 'blue',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 11,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontWeight: '700',
                                      fontSize: 16,
                                    }}>
                                    +
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  {/* 其他信息 */}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      paddingTop: 5,
                      paddingBottom: 5,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={{fontSize: 14}}>包装费</Text>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 14,
                      }}>
                      另需
                    </Text>
                    <Text style={{fontSize: 12, color: 'red'}}>￥</Text>
                    <Text style={{fontSize: 14, color: 'red'}}>0.5</Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{marginLeft: 10, alignItems: 'center'}}>
                      <Icon
                        name="help-circle"
                        color="#222"
                        size={16}
                        type="feather"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this._renderModalBar()}
            </View>
          </Modal>

          {this._renderBar()}

          <Animated.View
            style={[
              styles.iconWrap,
              {
                transform: [
                  {
                    scale: this.state.scale.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [1, 0.8, 1],
                    }),
                  },
                ],
              },
            ]}>
            <View
              style={[
                styles.iconView,
                products.length ? styles.iconViewActive : null,
              ]}>
              <Icon
                type="feather"
                name="shopping-cart"
                size={px2dp(14)}
                color={products.length ? '#fff' : '#666'}
              />
            </View>
            <View
              style={[
                styles.count,
                {
                  transform: [{translateX: cart.total ? 0 : -9999}],
                },
              ]}>
              <Text style={styles.totalTxt}>{cart.total}</Text>
            </View>
          </Animated.View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  cartView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height: px2dp(46) + 10,
  },
  count: {
    backgroundColor: '#f00',
    height: px2dp(16),
    width: px2dp(16),
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 4,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconWrap: {
    position: 'absolute',
    left: 16,
    top: 24,
    width: px2dp(30),
    height: px2dp(30),
  },
  iconView: {
    backgroundColor: '#333',
    overflow: 'hidden',
    borderRadius: px2dp(23),
    width: px2dp(30),
    height: px2dp(30),
    borderWidth: 4,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconViewActive: {
    backgroundColor: '#3190e8',
  },
  cartBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    width,
    backgroundColor: 'rgba(0,0,0,.9)',
  },
  price: {
    alignItems: 'center',
    color: '#999',
    fontWeight: 'bold',
    fontSize: px2dp(16),
    paddingHorizontal: 20,
  },
  priceBox: {
    color: '#fff',
  },
  blur: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipBox: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: px2dp(70),
  },
  emptyTxt: {color: '#999', fontWeight: 'bold'},

  priceTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: px2dp(16),
  },
  sendTxt: {color: '#fff', fontSize: px2dp(10)},
  totalTxt: {fontSize: px2dp(10), color: '#fff'},
});

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  onAddProduct: product => dispatch(onAddProduct(product)),
  onRemProduct: product => dispatch(onRemProduct(product)),
  onMinusProduct: product => dispatch(onMinusProduct(product)),
  onPlusProduct: product => dispatch(onPlusProduct(product)),
  onClearProduct: product => dispatch(onClearProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopBar);
