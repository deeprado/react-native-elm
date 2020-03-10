import React from 'react';
import {StyleSheet, Text, StatusBar, View, Button} from 'react-native';
import {connect} from 'react-redux';

import {onThemeChange} from '../../redex/actions/theme';

import TabBarComponent from '../../components/TabBarComponent';
import NavBar from '../../components/NavBar';

// 美食相册
class Album extends React.Component {
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
          title="美食相册"
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Album);
