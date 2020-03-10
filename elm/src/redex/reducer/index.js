import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 主题
import theme from './theme';
// 购物车
import cart from './cart';
// 收获地址
import harvest from './harvest';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  cart: cart,
  harvest: harvest,
});

// const redu = combineReducers({
//   nav: nav,
//   theme: theme,
// });

// export default redu;
