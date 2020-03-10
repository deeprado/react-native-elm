'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
  findNodeHandle,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {
  onAddProduct,
  onRemProduct,
  onMinusProduct,
  onPlusProduct,
} from '../redex/actions/cart';

import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {BlurView} from '@react-native-community/blur';

import Parabolic from '../components/Parabolic';

import LocalImgs from '../components/Images';
// 导航
import NavBar from '../components/NavBar';
// 购物车
import ShopBar from '../components/ShopBar';

// 评价
import Comments from './merchant/Comments';
// 商品
import Products from './merchant/Products';

import DataDetail from '../data/detail';

import px2dp from '../util';

let {width, height} = Dimensions.get('window');
let MAIN_HEIGHT = height - NavBar.topbarHeight;

const colors = {
  减: '#f07373',
  特: '#f1884f',
  新: '#73f08e',
};

class MerchantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      titleOpacity: 0,
      activeOpacity: 1,
      headOpacity: 1,
      addBtnY: -9999,
      animateBtnX: 0,
      animateBtnY: 0,
      runBtn: new Animated.Value(0),
      selected: [],
      lens: {},
      bgY: 0,
      bgScale: 1,
      viewRef: 0,
      b: {},
      detail: DataDetail,
    };
    this.addProduct = this.addProduct.bind(this);
  }

  componentDidMount() {
    // this.initState();
    this.calHeadHeight();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  // 计算高度
  calHeadHeight = () => {
    let {detail} = this.state;
    let headHeight = 18 + px2dp(80 + detail.activities.length * 18);
    this.setState({
      headHeight,
    });
  };

  // 初始化
  initState = () => {};

  // 添加购物车
  addProduct(proData) {
    let {pos} = proData;
    this.setState({
      addBtnY: proData.y,
    });
    this.parabolic.run(pos, proData);
  }

  parabolicEnd(data) {
    let {selected} = this.state;
    this.state.runBtn.setValue(0);
    this.setState({addBtnY: -9999, selected});
    this.shopbar.runAnimate();
  }

  // 商品
  renderGoods() {
    return (
      <Animated.View
        style={[
          styles.topView,
          {
            height: Platform.OS === 'android' ? height + 80 : height,
          },
        ]}>
        <View
          style={[
            {
              transform: [
                {
                  translateY: this.state.scrollY,
                },
              ],
            },
            styles.goodsBox,
          ]}>
          <ScrollableTabView
            initialPage={0}
            renderTabBar={() => <DefaultTabBar />}>
            {/* 商品列表 */}
            <Products
              tabLabel="商品"
              addProduct={this.addProduct}
              navigation={this.props.navigation}
            />
            <Comments
              headHeight={this.state.headHeight}
              tabLabel="评价(4.1分)"
              navigation={this.props.navigation}
            />
          </ScrollableTabView>
        </View>
      </Animated.View>
    );
  }

  renderActivities() {
    let {activities} = this.state.detail;
    if (!activities || !activities.length) {
      return null;
    } else {
      return (
        <Animated.View
          style={[styles.actives, {opacity: this.state.activeOpacity}]}>
          {activities.map((item, i) => {
            return (
              <View key={i} style={styles.activityBox}>
                <Text
                  style={[
                    styles.activityKey,
                    {
                      backgroundColor: colors[item.key] || '#f1884f',
                    },
                  ]}>
                  {item.key}
                </Text>
                <Text numberOfLines={1} style={styles.activityTxt}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </Animated.View>
      );
    }
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)});
  }

  render() {
    let {detail} = this.state;
    let params =
      Platform.OS === 'ios'
        ? {
            blurType: 'light',
            blurAmount: 25,
          }
        : {
            viewRef: this.state.viewRef,
            downsampleFactor: 10,
            overlayColor: 'rgba(255,255,255,.1)',
          };
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />

        <ImageBackground source={LocalImgs.bg} style={styles.bg}>
          <BlurView {...params} style={styles.blur} />
        </ImageBackground>

        <View style={styles.contentBox}>
          <View style={styles.head}>
            <Animated.View
              style={[
                styles.headAni,
                {
                  opacity: this.state.headOpacity,
                },
              ]}>
              <Image source={LocalImgs.bg} style={styles.logo} />
              <View style={styles.headBox}>
                <Text style={styles.headTxt}>{detail.name}</Text>
                <TouchableOpacity>
                  <View style={styles.sendBox}>
                    {detail.fengniao ? (
                      <Text style={[styles.label2, {marginRight: 5}]}>
                        {'蜂鸟专送'}
                      </Text>
                    ) : null}
                    <Text style={styles.sendTxt}>{detail.time}分钟送达</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.sendBtn} numberOfLines={1}>
                  {detail.bulletin}
                </Text>
              </View>
            </Animated.View>
            {this.renderActivities()}
          </View>

          <View style={{marginTop: 0}}>
            {/* 商品 */}
            {this.renderGoods()}
          </View>
        </View>
        <NavBar
          title={detail.name}
          titleStyle={{opacity: this.state.titleOpacity}}
          style={styles.navBar}
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
          rightIcon="ios-more"
          rightPress={() => {}}
        />
        <Parabolic
          ref={parabolic => (this.parabolic = parabolic)}
          style={[styles.tmpBtn, {top: this.state.addBtnY}]}
          renderChildren={() => {
            return <View style={styles.parabolicBox} />;
          }}
          animateEnd={this.parabolicEnd.bind(this)}
        />
        {/* 购物车 */}
        <ShopBar ref={shopbar => (this.shopbar = shopbar)} />
      </View>
    );
  }
}
/*
<Animated.View style={[styles.tmpBtn, {
  top: this.state.addBtnY,
  transform: [
    { translateX: this.state.animateBtnX },
    { translateY: this.state.animateBtnY }
  ]
}]}>
  <View style={{width:px2dp(14), height:px2dp(14), backgroundColor:"#3190e8", borderRadius: px2dp(7), overflow:"hidden"}}></View>
</Animated.View>
*/

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  navBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width,
  },
  contentBox: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  head: {
    paddingTop: NavBar.topbarHeight,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  headAni: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headBox: {marginLeft: 14, flex: 1},
  headTxt: {color: '#fff'},
  sendBox: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 18,
  },
  sendTxt: {
    color: '#fff',
    fontSize: px2dp(12),
  },
  sendBtn: {color: '#fff', fontSize: px2dp(12)},
  bg: {
    width,
    height: width,
    resizeMode: 'cover',
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width,
    height: width,
  },
  logo: {
    width: px2dp(80),
    height: px2dp(80),
    resizeMode: 'cover',
  },
  label2: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#00abff',
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  actives: {
    paddingTop: 4,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  topView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  goodsBox: {
    backgroundColor: '#f3f3f3',
    height: MAIN_HEIGHT,
    width: width,
  },
  tmpBtn: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parabolicBox: {
    width: px2dp(14),
    height: px2dp(14),
    backgroundColor: '#3190e8',
    borderRadius: px2dp(7),
    overflow: 'hidden',
  },
  activityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(18),
  },
  activityKey: {
    fontSize: px2dp(11),
    color: '#fff',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  activityTxt: {fontSize: px2dp(11), marginLeft: 3, color: '#fff'},
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
})(MerchantScreen);
