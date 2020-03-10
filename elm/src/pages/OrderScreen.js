import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Breakfast from './order/Breakfast';
import TakeOut from './order/TakeOut';

import {onThemeChange} from '../redex/actions/theme';

import NavBar from '../components/NavBar';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />

        <NavBar title="订单" />
        <ScrollableTabView
          // tabBarUnderlineColor="#e7e7e7"
          // tabBarInactiveTextColor="mintcream"
          // tabBarActiveTextColor="white"
          // tabBarBackgroundColor={theme.themeColor}
          ref={scrollableTabView =>
            (this.scrollableTabView = scrollableTabView)
          }
          initialPage={0}
          // renderTabBar={() => (
          //   <ScrollableTabBar
          //     style={{height: 40, borderWidth: 0, elevation: 2}}
          //     tabStyle={{height: 39}}
          //     underlineHeight={2}
          //   />
          // )}
          renderTabBar={() => <DefaultTabBar />}

          // renderTabBar={() => <TabViewBar />}
        >
          <View tabLabel="外卖">
            <TakeOut tabLabel="外卖" />
          </View>
          <View tabLabel="早餐">
            <Breakfast tabLabel="早餐" />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
