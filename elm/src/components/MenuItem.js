'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import px2dp from '../util';
import Button from './Button';

const itemHeight = px2dp(45);

class ItemButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={{marginTop: this.props.first ? 10 : 0}}
        onPress={this.props.onPress}>
        <View style={styles.button}>
          <Text style={{color: this.props.color || '#f00'}}>
            {this.props.name}
          </Text>
        </View>
      </Button>
    );
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    subName: PropTypes.string,
    color: PropTypes.string,
    first: PropTypes.bool,
    avatar: PropTypes.number,
    disable: PropTypes.bool,
    iconSize: PropTypes.number,
    type: PropTypes.string,
    onPress: PropTypes.func,
  };

  _render() {
    let {
      icon,
      type,
      iconSize,
      name,
      subName,
      color,
      first,
      avatar,
      disable,
    } = this.props;

    return (
      <View style={styles.listItem}>
        {icon ? (
          <View style={styles.iconBox}>
            <Icon
              name={icon}
              type={type ? type : 'ionicon'}
              size={px2dp(iconSize || 20)}
              style={styles.icon}
              color={color || '#4da6f0'}
            />
          </View>
        ) : null}
        <View style={[styles.listInfo, {borderTopWidth: !first ? 1 : 0}]}>
          <View style={styles.itemNameBox}>
            <Text>{name}</Text>
          </View>
          <View style={styles.listInfoRight}>
            {subName ? <Text style={styles.subNameTxt}>{subName}</Text> : null}
            {avatar ? <Image source={avatar} style={styles.avatar} /> : null}
            {disable ? null : (
              <Icon
                type="feather"
                name="chevron-right"
                size={px2dp(18)}
                color="#bbb"
                style={{marginLeft: 10}}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  onPress = ({routeName}) => {
    if (this.props.navigation && routeName) {
      this.props.navigation.navigate(routeName);
    }
  };

  render() {
    let {onPress, first, disable} = this.props;
    onPress = onPress || this.onPress;
    return disable ? (
      this._render()
    ) : (
      <Button
        style={{marginTop: first ? 10 : 0}}
        onPress={() => onPress(this.props)}>
        {this._render()}
      </Button>
    );
  }
}

MenuItem.Button = ItemButton;

const styles = StyleSheet.create({
  listItem: {
    height: itemHeight,
    paddingLeft: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    width: 30,
  },
  button: {
    height: itemHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listInfo: {
    flex: 1,
    height: itemHeight,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#f5f5f5',
    // backgroundColor: 'red',
  },
  listInfoRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameBox: {flex: 1, marginLeft: 5},
  subNameTxt: {color: '#aaa', fontSize: 12},
  icon: {width: 22, marginRight: 5, textAlign: 'center'},
  avatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 18,
  },
});

export default MenuItem;
