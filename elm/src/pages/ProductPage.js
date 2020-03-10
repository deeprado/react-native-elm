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
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

// 导航
import NavBar from '../components/NavBar';

let {width, height} = Dimensions.get('window');

class ProductPage extends Component {
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
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0398ff"
          barStyle="light-content"
        />

        <NavBar
          title={'详情'}
          titleStyle={{opacity: this.state.titleOpacity}}
          style={styles.navBar}
          leftIcon="ios-arrow-back"
          leftPress={() => this.goBack()}
          rightIcon="ios-more"
          rightPress={() => {}}
        />
        <Text>商品详情页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f3f3f3'},
  navBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width,
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
