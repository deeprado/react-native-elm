import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Image,
  Platform,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {Carousel} from '@ant-design/react-native';

import {onThemeChange} from '../redex/actions/theme';

import LocalImgs from '../components/Images';
import LbsModal from '../components/LbsModal';

import px2dp from '../util';

import DataDishes from '../data/time';
import HotDishes from '../data/hot';
import DataMerchants from '../data/merchant';
import DataQualities from '../data/quality';
import DataCategories from '../data/category';
import DataSearches from '../data/search';
import Merchant from '../components/Merchant';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const headH = px2dp(isIOS ? 140 : 120);
const InputHeight = px2dp(28);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '三里屯SOHO',
      scrollY: new Animated.Value(0),
      searchView: new Animated.Value(0),
      modalVisible: false,
      searchBtnShow: true,
      listLoading: false,
      isRefreshing: false,
      timeDishes: DataDishes,
      hotDishes: HotDishes,
      qualityDishes: DataQualities,
      categories: DataCategories,
      searchDishes: DataSearches,
      merchants: DataMerchants,
    };

    this.SEARCH_BOX_Y = px2dp(isIOS ? 48 : 43);
    this.SEARCH_FIX_Y = headH - px2dp(isIOS ? 64 : 44);
    this.SEARCH_KEY_P = px2dp(58);
    this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y - this.SEARCH_BOX_Y;
    this.SEARCH_FIX_DIFF_Y = headH - this.SEARCH_FIX_Y - headH;
  }

  componentDidMount() {
    // BackAndroid.addEventListener('hardwareBackPress', function() {
    //   BackAndroid.exitApp(0);
    //   return true;
    // });
  }

  goPage = routeName => {
    this.props.navigation.navigate(routeName);
  };

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 2000);
  }

  // 打开定位
  openLbs = () => {
    this.setState({modalVisible: true});
  };

  // 关闭定位
  closeLbs = () => {
    this.setState({modalVisible: false});
  };

  // 切换定位
  changeLocation(location) {
    this.setState({location});
  }

  _renderHeader() {
    let {searchDishes} = this.state;
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y],
    });
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0],
    });
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0],
    });
    return (
      <View style={styles.header}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
          <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Icon
                name="map-pin"
                size={px2dp(16)}
                color="#fff"
                type="feather"
              />
              <Text
                style={{
                  fontSize: px2dp(18),
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingHorizontal: 5,
                }}>
                {this.state.location}
              </Text>
              <Icon
                name="chevron-down"
                size={px2dp(16)}
                color="#fff"
                type="feather"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.weather}>
            <View style={{marginRight: 5}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: px2dp(11),
                  textAlign: 'center',
                }}>
                {'3°'}
              </Text>
              <Text style={{color: '#fff', fontSize: px2dp(11)}}>{'阵雨'}</Text>
            </View>
            <Icon name="zap" size={px2dp(20)} color="#fff" type="feather" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            marginTop: px2dp(15),
            transform: [
              {
                translateY: searchY,
              },
            ],
          }}>
          <TouchableOpacity onPress={() => this.goPage('SearchScreen')}>
            <View style={[styles.searchBtn, {backgroundColor: '#fff'}]}>
              <Icon name="search" size={20} color="#666" type="feather" />
              <Text style={{fontSize: 13, color: '#666', marginLeft: 5}}>
                {'输入商家，商品名称'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
          {searchDishes.map((item, i) => {
            return (
              <TouchableWithoutFeedback key={i}>
                <View style={{marginRight: 12}}>
                  <Text style={{fontSize: px2dp(12), color: '#fff'}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.View>
      </View>
    );
  }

  renderSwipeView = (types, n) => {
    const w = width / 4,
      h = w * 0.6 + 20;
    return (
      <View style={styles.typesView}>
        {types.map((item, i) => {
          let render = (
            <View style={[{width: w, height: h}, styles.typesItem]}>
              <Image
                source={LocalImgs['h' + (i + n)]}
                style={{width: w * 0.5, height: w * 0.5}}
              />
              <Text style={{fontSize: px2dp(12), color: '#666'}}>{item}</Text>
            </View>
          );
          return isIOS ? (
            <TouchableHighlight key={i} onPress={() => {}}>
              {render}
            </TouchableHighlight>
          ) : (
            <TouchableNativeFeedback key={i} onPress={() => {}}>
              {render}
            </TouchableNativeFeedback>
          );
        })}
      </View>
    );
  };

  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    // console.log('horizontal change to', index);
  }
  // 分类
  _renderCategories() {
    let {categories} = this.state;
    let firstCategories = categories[0];
    let secondCategories = categories[1];
    return (
      <View style={{backgroundColor: '#fff', paddingBottom: 10}}>
        <Carousel
          style={styles.wrapper}
          selectedIndex={0}
          autoplay={false}
          infinite
          dotActiveStyle={{}}
          afterChange={this.onHorizontalSelectedIndexChange}>
          <View>{this.renderSwipeView(firstCategories, 0)}</View>
          <View>{this.renderSwipeView(secondCategories, 1)}</View>
        </Carousel>
        <TouchableOpacity>
          <View style={{height: px2dp(90), paddingHorizontal: 10}}>
            <Image
              source={LocalImgs.ad1}
              style={{
                height: px2dp(90),
                width: width - 20,
                resizeMode: 'cover',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderFixHeader() {
    let showY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [-9999, -9999, 0, 0],
    });
    return (
      <Animated.View
        style={[
          styles.header,
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: px2dp(isIOS ? 64 : 44),
            paddingTop: px2dp(isIOS ? 25 : 10),
            transform: [{translateY: showY}],
          },
        ]}>
        <TouchableOpacity onPress={() => this.goPage('SearchScreen')}>
          <View style={[styles.searchBtn, {backgroundColor: '#fff'}]}>
            <Icon name="search" size={20} color="#666" type="feather" />
            <Text style={{fontSize: 13, color: '#666', marginLeft: 5}}>
              {'输入商家，商品名称'}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  _renderHotItem = (item, i) => {
    return (
      <View style={styles.recomWrap}>
        <View>
          <Text
            style={{
              fontSize: px2dp(14),
              color: '#333',
              marginBottom: px2dp(5),
            }}>
            {item.name}
          </Text>
          <Text style={{fontSize: px2dp(12), color: '#bbb'}}> {item.name}</Text>
        </View>
        <Image
          source={LocalImgs['hot' + i]}
          style={{width: px2dp(50), height: px2dp(50), resizeMode: 'contain'}}
        />
      </View>
    );
  };

  _renderHot() {
    let {hotDishes} = this.state;
    let styl = {
      0: {
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        borderRightWidth: 1,
        borderRightColor: '#f9f9f9',
      },
      1: {
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
      },
      2: {
        borderRightWidth: 1,
        borderRightColor: '#f9f9f9',
      },
      3: {},
    };
    return hotDishes.map((item, i) => {
      return isIOS ? (
        <View
          key={i}
          style={[styles.recomItem, styl[i], {backgroundColor: '#f5f5f5'}]}>
          <TouchableHighlight style={{flex: 1}} onPress={() => {}}>
            {this._renderHotItem(item, i)}
          </TouchableHighlight>
        </View>
      ) : (
        <View key={i} style={[styles.recomItem, styl[i]]}>
          <TouchableNativeFeedback style={{flex: 1, height: px2dp(70)}}>
            {this._renderHotItem(item, i)}
          </TouchableNativeFeedback>
        </View>
      );
    });
  }

  _renderLtime() {
    let {timeDishes} = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: px2dp(14), fontWeight: 'bold'}}>
              限时抢购
            </Text>
            <Text
              style={{
                fontSize: px2dp(11),
                color: '#aaa',
                marginLeft: px2dp(10),
                marginRight: px2dp(5),
              }}>
              距离结束
            </Text>
            <Text style={styles.time}>01</Text>
            <Text style={{fontSize: px2dp(11), color: '#aaa'}}>:</Text>
            <Text style={styles.time}>07</Text>
            <Text style={{fontSize: px2dp(11), color: '#aaa'}}>:</Text>
            <Text style={styles.time}>10</Text>
          </View>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: px2dp(12), color: '#aaa', marginRight: 3}}>
                更多
              </Text>
              <Icon
                type="feather"
                name="chevron-right"
                size={px2dp(13)}
                color="#bbb"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          {timeDishes.map((item, i) => {
            let layout = (
              <View style={styles.lTimeList}>
                <Image
                  source={LocalImgs[item.cover]}
                  style={{
                    height: px2dp(80),
                    width: px2dp(80),
                    resizeMode: 'cover',
                  }}
                />
                <Text
                  style={{
                    fontSize: px2dp(13),
                    color: '#333',
                    marginVertical: 5,
                  }}>
                  {item.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: px2dp(14),
                      fontWeight: 'bold',
                      color: '#ff6000',
                      marginRight: 2,
                    }}>
                    ￥{item.price}
                  </Text>
                  <Text
                    style={{
                      fontSize: px2dp(12),
                      color: '#aaa',
                      textDecorationLine: 'line-through',
                    }}>
                    ￥{item.orgPirce}
                  </Text>
                </View>
              </View>
            );
            return isIOS ? (
              <TouchableHighlight
                key={i}
                style={{borderRadius: px2dp(4)}}
                onPress={() => {}}>
                {layout}
              </TouchableHighlight>
            ) : (
              <View key={i} style={{}}>
                <TouchableNativeFeedback onPress={() => {}}>
                  {layout}
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  _renderQuality() {
    let {qualityDishes} = this.state;
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: px2dp(14), fontWeight: 'bold'}}>
            品质优选
          </Text>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: px2dp(12),
                  color: '#aaa',
                  marginRight: px2dp(3),
                }}>
                更多
              </Text>
              <Icon
                type="feather"
                name="chevron-right"
                size={px2dp(13)}
                color="#bbb"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingTop: px2dp(15),
          }}>
          {qualityDishes.map((item, i) => {
            let size = px2dp((width - px2dp(120)) / 4);
            let layout = (
              <View style={styles.lTimeList}>
                <Image
                  source={LocalImgs['nice' + i]}
                  style={{height: size, width: size, resizeMode: 'cover'}}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: px2dp(12),
                    width: size,
                    color: '#333',
                    marginVertical: px2dp(5),
                    alignContent: 'center',
                  }}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.qtag}>
                  {'大牌精选'}
                </Text>
              </View>
            );
            return isIOS ? (
              <View
                key={i}
                style={{
                  borderRadius: px2dp(4),
                  marginRight: px2dp(10),
                  paddingTop: i > 3 ? px2dp(30) : 0,
                }}>
                <TouchableHighlight onPress={() => {}}>
                  {layout}
                </TouchableHighlight>
              </View>
            ) : (
              <View
                key={i}
                style={{
                  paddingTop: i > 3 ? px2dp(30) : 0,
                }}>
                <TouchableNativeFeedback onPress={() => {}}>
                  {layout}
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  _renderGift() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.gift, {paddingRight: px2dp(16)}]}>
          <View>
            <Text style={{fontWeight: 'bold'}}>{'推荐有奖'}</Text>
            <Text style={{fontSize: 12, color: '#aaa'}}>{'5元现金拿不停'}</Text>
          </View>
          <Image
            source={LocalImgs.coupon0}
            style={{height: px2dp(50), width: px2dp(50), resizeMode: 'cover'}}
          />
        </View>
        <View
          style={[
            styles.gift,
            {
              borderLeftColor: '#f5f5f5',
              borderLeftWidth: px2dp(1),
              paddingLeft: px2dp(16),
            },
          ]}>
          <View>
            <Text style={{fontWeight: 'bold'}}>{'领券中心'}</Text>
            <Text style={{fontSize: 12, color: '#aaa'}}>{'代金券免费领'}</Text>
          </View>
          <Image
            source={LocalImgs.coupon1}
            style={{height: px2dp(50), width: px2dp(50), resizeMode: 'cover'}}
          />
        </View>
      </View>
    );
  }

  // 商户
  _renderMerchant = () => {
    let {navigation} = this.props;
    let {merchants} = this.state;

    return (
      <View style={styles.business}>
        <Text
          style={{
            color: '#666',
            paddingLeft: px2dp(16),
            paddingBottom: px2dp(6),
          }}>
          {'推荐商家'}
        </Text>
        {merchants.map((item, i) => {
          return (
            <Merchant
              {...item}
              key={i}
              navigation={navigation}
              onPress={() => this.goPage('MerchantScreen')}
            />
            // <TouchableOpacity
            //   activeOpacity={1}
            //   onPress={() => this.goPage('MerchantScreen')}
            //   key={i}>

            // </TouchableOpacity>
          );
        })}
        <ActivityIndicator
          style={{marginTop: px2dp(10)}}
          animating={this.state.listLoading}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}
          scrollEventThrottle={0.2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }>
          {this._renderHeader()}

          <View>
            {/* 类别 */}
            {this._renderCategories()}
          </View>
          <View style={styles.recom}>
            {/* 推荐 */}
            {this._renderHot()}
          </View>
          <View style={styles.card}>
            {/* 限时抢购 */}
            {this._renderLtime()}
          </View>
          <View style={styles.card}>
            {/* 高品质 */}
            {this._renderQuality()}
          </View>
          <View style={styles.card}>
            {/* 抢购 */}
            {this._renderGift()}
          </View>
          {this._renderMerchant()}
        </ScrollView>
        {this._renderFixHeader()}

        {/* 定位 */}
        <LbsModal
          modalVisible={this.state.modalVisible}
          location={this.state.location}
          setLocation={this.changeLocation.bind(this)}
          closeModal={() => this.closeLbs()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0398ff',
    height: headH,
    paddingTop: px2dp(isIOS ? 30 : 10),
    paddingHorizontal: px2dp(16),
  },
  typesView: {
    flex: 1,
    paddingBottom: px2dp(10),
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  typesItem: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lbsWeather: {
    height: InputHeight,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    height: InputHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  lbs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: '#fff',
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
    marginBottom: px2dp(0),
  },
  recom: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: px2dp(10),
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: px2dp(10),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
  },
  business: {
    backgroundColor: '#fff',
    marginTop: px2dp(10),
    paddingVertical: px2dp(16),
  },
  time: {
    paddingHorizontal: px2dp(3),
    backgroundColor: '#333',
    fontSize: px2dp(11),
    color: '#fff',
    marginHorizontal: px2dp(3),
  },
  recomItem: {
    width: width / 2,
    height: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recomWrap: {
    flex: 1,
    height: px2dp(70),
    paddingHorizontal: px2dp(16),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lTimeList: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: '#00abff',
    borderColor: '#00abff',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5,
  },
  gift: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  fixSearch: {
    backgroundColor: '#0398ff',
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
