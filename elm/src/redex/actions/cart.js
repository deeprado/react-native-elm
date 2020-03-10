import * as type from './actionType';

export function onAddProduct(product) {
  return dispatch => {
    dispatch(addProduct(product));
  };
}

export function onRemProduct(product) {
  return dispatch => {
    dispatch(remProduct(product));
  };
}

export function onMinusProduct(product, num = 1) {
  return dispatch => {
    dispatch(minusProduct(product, num));
  };
}

export function onPlusProduct(product, num = 1) {
  return dispatch => {
    dispatch(plusProduct(product, num));
  };
}

export function onClearProduct() {
  return dispatch => {
    dispatch(clearProduct());
  };
}

function addProduct(product) {
  return {
    type: type.ADD_PRODUCT,
    product: product,
  };
}

function remProduct(product) {
  return {
    type: type.REM_PRODUCT,
    product: product,
  };
}

function minusProduct(product, num = 1) {
  return {
    type: type.MINUS_PRODUCT,
    product: product,
    num: num,
  };
}

function plusProduct(product, num = 1) {
  return {
    type: type.PLUS_PRODUCT,
    product: product,
    num: num,
  };
}

function clearProduct() {
  return {
    type: type.CLEAR_PRODUCT,
  };
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  onAddProduct,
  onRemProduct,
  onMinusProduct,
  onPlusProduct,
  onClearProduct,
};

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
