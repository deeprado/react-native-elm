'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import px2dp from '../util';

class NavBar extends Component {
  static propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftPress: PropTypes.func,
    rightPress: PropTypes.func,
    style: PropTypes.object,
  };
  static topbarHeight = Platform.OS === 'ios' ? 64 : 42;

  constructor(props) {
    super(props);
    this.state = {};
  }

  pressLeft = () => {
    this.props.leftPress && this.props.leftPress();
  };

  pressRight = () => {
    this.props.leftPress && this.props.rightPress();
  };

  renderBtnItem = ({name, onPress}) => {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity onPress={() => this.pressLeft()} style={styles.btn}>
          <Icon name={name} size={px2dp(26)} color="#fff" type="ionicon" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.pressRight()} style={styles.btn}>
          <Icon name={name} size={px2dp(26)} color="#fff" type="ionicon" />
        </TouchableOpacity>
      );
    }
  };

  renderBtn(pos) {
    const {leftIcon, leftPress, rightIcon, rightPress} = this.props;
    if (pos === 'left') {
      if (leftIcon) {
        return this.renderBtnItem({
          name: leftIcon,
          onPress: leftPress,
        });
      } else {
        return <View style={styles.btn} />;
      }
    } else if (pos === 'right') {
      if (rightIcon) {
        return this.renderBtnItem({
          name: rightIcon,
          onPress: rightPress,
        });
      } else {
        return <View style={styles.btn} />;
      }
    }
  }

  render() {
    return (
      <View style={[styles.topbar, this.props.style]}>
        {this.renderBtn('left')}
        <Animated.Text
          numberOfLines={1}
          style={[styles.title, this.props.titleStyle]}>
          {this.props.title}
        </Animated.Text>
        {this.renderBtn('right')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topbar: {
    height: NavBar.topbarHeight,
    backgroundColor: '#0398ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: px2dp(10),
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: px2dp(16),
    marginLeft: px2dp(5),
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
