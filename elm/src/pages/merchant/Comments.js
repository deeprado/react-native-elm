'use strict';

import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';

import px2dp from '../../util';
import LocalImg from '../../components/Images';
import Button from '../../components/Button';

import DataTags from '../../data/tag';
import DataComments from '../../data/comment';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: DataTags,
      comments: DataComments,
      headHeight: props.headHeight ? props.headHeight : 54,
    };
  }

  renderTags() {
    let {tags} = this.state;
    return tags.map((item, i) => {
      return (
        <View key={i} style={styles.tagBox}>
          <Button onPress={() => {}}>
            <View style={styles.tag}>
              <Text style={styles.tagTxt}>{`${item.name}(${item.total})`}</Text>
            </View>
          </Button>
        </View>
      );
    });
  }

  renderComments() {
    let {comments} = this.state;
    let scale = (1 / 5) * 55;
    return comments.map((item, i) => {
      scale = (item.scores / 5) * 55;
      return (
        <View key={i} style={styles.commentBox}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.uinfo}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.infoBox}>
                <Text style={styles.infoName}>{item.name}</Text>
                <View style={styles.starBox}>
                  <Image source={LocalImg.star2} style={styles.starImg} />
                  <View
                    style={[
                      styles.starPos,
                      {
                        width: scale,
                      },
                    ]}>
                    <Image source={LocalImg.star1} style={styles.starImg} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeTxt}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentTxt}>{item.content}</Text>
            <View style={styles.contentTagBox}>
              <Icon
                name="md-pricetags"
                size={px2dp(15)}
                color="#ddd"
                type="ionicon"
              />
              <Text style={styles.contentTagTxt}>{item.tag}</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    let {headHeight} = this.state;
    let scale1 = (4.5 / 5) * 55;
    let scale2 = (4.6 / 5) * 55;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              paddingBottom: px2dp(46) + headHeight,
            }}>
            <View style={styles.source}>
              <View style={styles.center}>
                <Text style={styles.judgeTxt}>{4.5}</Text>
                <Text style={styles.judgeTip}>{'综合评分'}</Text>
                <Text style={styles.judgeLevel}>{'高于周边商家57%'}</Text>
              </View>
              <View style={styles.goodBox} />
              <View style={[styles.center]}>
                <View style={styles.serviceBox}>
                  <Text style={styles.serviceTip}>{'服务态度'}</Text>
                  <View style={styles.serviceStarBox}>
                    <Image source={LocalImg.star2} style={styles.starImg} />
                    <View
                      style={[
                        styles.serviceStarPos,
                        {
                          width: scale1,
                        },
                      ]}>
                      <Image source={LocalImg.star1} style={styles.starImg} />
                    </View>
                  </View>
                  <Text style={styles.serviceTxt}>{'4.5'}</Text>
                </View>
                <View style={styles.shopJudgeBox}>
                  <Text style={styles.shopJudgeTip}>{'商品评分'}</Text>
                  <View style={styles.shopJudgeStarBox}>
                    <Image source={LocalImg.star2} style={styles.starImg} />
                    <View
                      style={[
                        styles.shopJudgeStarPos,
                        {
                          width: scale2,
                        },
                      ]}>
                      <Image source={LocalImg.star1} style={styles.starImg} />
                    </View>
                  </View>
                  <Text style={styles.shopJudgeTxt}>{'4.6'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.opBox}>
              <View style={styles.tags}>
                {/* 标签 */}
                {this.renderTags()}
              </View>
              <View style={styles.opContent}>
                <Icon
                  name="ios-checkmark-circle"
                  size={px2dp(20)}
                  color="#4cd964"
                  type="ionicon"
                />
                <Text style={styles.opTxt}>{'只看有内容的评论'}</Text>
              </View>
              <View style={styles.commentsBox}>
                {/* 评论列表 */}
                {this.renderComments()}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 10,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  commentBox: {
    borderTopWidth: 1,
    borderTopColor: '#f9f9f9',
    paddingVertical: 14,
    paddingRight: 16,
  },
  uinfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {width: 40, height: 40, borderRadius: 20},
  infoBox: {marginLeft: 5},
  infoName: {
    fontSize: px2dp(13),
    color: '#333',
    paddingBottom: 5,
  },
  starBox: {height: 10},
  starImg: {height: 10, width: 55},
  starPos: {
    height: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
  timeBox: {flex: 1, alignItems: 'flex-end'},
  timeTxt: {fontSize: px2dp(13), color: '#999'},
  contentBox: {paddingLeft: 45},
  contentTxt: {fontSize: px2dp(13), color: '#333'},
  contentTagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
  contentTagTxt: {fontSize: px2dp(12), color: '#bbb', marginLeft: 5},
  tagBox: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tag: {
    backgroundColor: '#ebf5ff',
    paddingHorizontal: 6,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagTxt: {
    fontSize: px2dp(13),
    color: '#333',
  },
  source: {
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodBox: {
    width: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#f1f1f1',
  },
  judgeTxt: {fontSize: 18, color: '#ff6000', fontWeight: 'bold'},
  judgeTip: {
    fontSize: px2dp(13),
    color: '#333',
    paddingVertical: 3,
  },
  judgeLevel: {
    fontSize: px2dp(13),
    color: '#999',
    paddingVertical: 3,
  },
  serviceBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTip: {
    fontSize: px2dp(13),
    color: '#333',
    paddingVertical: 3,
  },
  serviceStarBox: {height: 10, marginHorizontal: 10},
  serviceStarPos: {
    height: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
  serviceTxt: {fontSize: px2dp(14), color: '#ff6000'},
  shopJudgeBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopJudgeTip: {
    fontSize: px2dp(13),
    color: '#333',
    paddingVertical: 3,
  },
  shopJudgeStarBox: {height: 10, marginHorizontal: 10},
  shopJudgeStarPos: {
    height: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
  shopJudgeTxt: {fontSize: px2dp(14), color: '#ff6000'},
  opBox: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
  },
  opContent: {
    paddingLeft: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  opTxt: {fontSize: px2dp(13), color: '#333', marginLeft: 3},

  commentsBox: {paddingLeft: 16},
});
