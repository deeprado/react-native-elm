import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
// 发现
import DiscoverScreen from '../../pages/DiscoverScreen';
// 订单
import OrderScreen from '../../pages/OrderScreen';
// 搜索
import SearchScreen from '../../pages/SearchScreen';
// 商家
import MerchantScreen from '../../pages/MerchantScreen';
// 商品
import ProductPage from '../../pages/ProductPage';

// 外卖
import TakeawayScreen from '../../pages/HomeScreen';

// 我的模块
import MineScreen from '../../pages/MineScreen';
import Favorite from '../../pages/mine/Favorite';
import Album from '../../pages/mine/Album';
import Award from '../../pages/mine/Award';
import Integral from '../../pages/mine/Integral';
import Member from '../../pages/mine/Member';
import Setting from '../../pages/mine/Setting';
import Feedback from '../../pages/mine/Feedback';
import Cooperation from '../../pages/mine/Cooperation';

// 地址
import Address from '../../pages/mine/Address';
import AddressOption from '../../pages/mine/AddressOption';
// 关于
import About from '../../pages/mine/About';
// 账号
import Account from '../../pages/mine/Account';
// 用户信息
import Profile from '../../pages/mine/UserProfile';

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    TakeawayScreen: {
      screen: TakeawayScreen,
      navigationOptions: () =>
        bottomTabOptions('外卖', {
          iconName: 'social-github',
          typeName: 'foundation',
        }),
    },
    DiscoverScreen: {
      screen: DiscoverScreen,
      navigationOptions: () =>
        bottomTabOptions('发现', {
          iconName: 'compass',
          typeName: 'foundation',
        }),
    },
    OrderScreen: {
      screen: OrderScreen,
      navigationOptions: () =>
        bottomTabOptions('订单', {
          iconName: 'shopping-cart',
          typeName: 'foundation',
        }),
    },
    MineScreen: {
      screen: MineScreen,
      navigationOptions: () =>
        bottomTabOptions('我的', {iconName: 'torso', typeName: 'foundation'}),
    },
  },
  {
    initialRouteName: 'TakeawayScreen',
    tabBarOptions: {
      activeTintColor: '#3496f0',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    // 我的模块
    Profile: {
      screen: Profile,
      navigationOptions: commonNavigationOptions,
    },
    Account: {
      screen: Account,
      navigationOptions: commonNavigationOptions,
    },
    About: {
      screen: About,
      navigationOptions: commonNavigationOptions,
    },
    // 收获地址
    Address: {
      screen: Address,
      navigationOptions: commonNavigationOptions,
    },
    AddressOption: {
      screen: AddressOption,
      navigationOptions: commonNavigationOptions,
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: commonNavigationOptions,
    },
    Album: {
      screen: Album,
      navigationOptions: commonNavigationOptions,
    },
    Award: {
      screen: Award,
      navigationOptions: commonNavigationOptions,
    },
    Integral: {
      screen: Integral,
      navigationOptions: commonNavigationOptions,
    },
    Member: {
      screen: Member,
      navigationOptions: commonNavigationOptions,
    },
    Setting: {
      screen: Setting,
      navigationOptions: commonNavigationOptions,
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: commonNavigationOptions,
    },
    Cooperation: {
      screen: Cooperation,
      navigationOptions: commonNavigationOptions,
    },
    // 搜索
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: commonNavigationOptions,
    },
    // 搜索
    MerchantScreen: {
      screen: MerchantScreen,
      navigationOptions: commonNavigationOptions,
    },
    ProductPage: {
      screen: ProductPage,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';

export default SplashStack;
