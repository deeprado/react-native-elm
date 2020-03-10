import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import {connect} from 'react-redux';

import {onThemeChange} from '../../redex/actions/theme';

import TabBarComponent from '../../components/TabBarComponent';
import NavBar from '../../components/NavBar';

// 会员中心
class Member extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />
        <NavBar
          title="会员中心"
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
        />
        <Text>Member</Text>
        <TabBarComponent />
        <Button
          title="改变主题色"
          onPress={() => {
            // let {dispatch} = this.props.navigation;
            // dispatch(onThemeChange('red'))
            this.props.onThemeChange('yellow');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Member);
