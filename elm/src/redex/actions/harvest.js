import * as type from './actionType';

export function onAddAddress(address) {
  return dispatch => {
    dispatch(addAddress(address));
  };
}

export function onRemAddress(address) {
  return dispatch => {
    dispatch(remAddress(address));
  };
}

export function onEditAddress(address) {
  return dispatch => {
    dispatch(editAddress(address));
  };
}

export function onClearAddress() {
  return dispatch => {
    dispatch(clearAddress());
  };
}

function addAddress(address) {
  return {
    type: type.ADD_ADDRESS,
    address: address,
  };
}

function remAddress(address) {
  return {
    type: type.REM_ADDRESS,
    address: address,
  };
}

function editAddress(address) {
  return {
    type: type.EDIT_ADDRESS,
    address: address,
  };
}

function clearAddress() {
  return {
    type: type.CLEAR_ADDRESS,
  };
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  onAddAddress,
  onRemAddress,
  onEditAddress,
  onClearAddress,
};

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
