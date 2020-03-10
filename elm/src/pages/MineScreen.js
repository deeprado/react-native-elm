import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {onThemeChange} from '../redex/actions/theme';

import MenuItem from '../components/MenuItem';

import px2dp from '../util';
import Constant from '../constant';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      user: {
        avatar: 'https://avatar.csdnimg.cn/C/7/B/2_scorpiusws.jpg',
        username: 'deeprado',
        phone: '136****1512',
      },
      balance: '999999',
      discount: 1410,
      integral: 909090,
      menus: Constant.menus,
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  goPage = routeName => {
    this.props.navigation.navigate(routeName);
  };

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500);
  }

  _renderMenus() {
    const {navigation} = this.props;
    let {menus} = this.state;
    return menus.map((item, i) => {
      if (i % 3 === 0) {
        item.first = true;
      }
      return <MenuItem key={i} {...item} navigation={navigation} />;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <View style={styles.topBox}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.goPage('Profile')}>
            <View style={styles.userHead}>
              <View style={styles.avatarBox}>
                <View>
                  <Image
                    source={{uri: this.state.user.avatar}}
                    style={{
                      width: px2dp(60),
                      height: px2dp(60),
                      borderRadius: px2dp(30),
                    }}
                  />
                </View>
                <View style={styles.userInfoBox}>
                  <Text style={styles.username}>
                    {this.state.user.username}
                  </Text>
                  <View style={styles.contactBox}>
                    <Icon
                      type="feather"
                      name="smartphone"
                      size={px2dp(14)}
                      color="#fff"
                    />
                    <Text style={styles.contact}>{this.state.user.phone}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Icon
                  type="feather"
                  name="chevron-right"
                  size={px2dp(22)}
                  color="#fff"
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.numbers}>
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.numItem}>
                <Text style={styles.leftMoney}>{this.state.balance}元</Text>
                <Text style={styles.leftMoneyTip}>{'余额'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.discountBox} />
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.numItem}>
                <Text style={styles.discountNum}>{this.state.discount}个</Text>
                <Text style={styles.discountTip}>{'优惠'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.discountBox} />
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.numItem}>
                <Text style={styles.integralNum}>{this.state.integral}分</Text>
                <Text style={styles.integralTip}>{'积分'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
          }}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#fff"
                colors={['#ddd', '#0398ff']}
                progressBackgroundColor="#ffffff"
              />
            }>
            <View style={{}}>{this._renderMenus()}</View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  userHead: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#0398ff',
  },
  avatarBox: {
    flex: 1,
    flexDirection: 'row',
  },
  topBox: {
    backgroundColor: '#f3f3f3',
    // flex: 1,
  },
  userInfoBox: {
    marginLeft: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  username: {color: '#fff', fontSize: px2dp(18)},
  contactBox: {marginTop: px2dp(10), flexDirection: 'row'},
  contact: {color: '#fff', fontSize: 13, paddingLeft: 5},
  numbers: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 74,
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBox: {
    width: px2dp(1),
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  discountNum: {
    color: '#ff5f3e',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  discountTip: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 5,
  },
  leftMoney: {
    color: '#f90',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  leftMoneyTip: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 5,
  },
  integralNum: {
    color: '#6ac20b',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  integralTip: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 5,
  },
  scrollView: {
    flex: 1,
    paddingBottom: px2dp(46),
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
