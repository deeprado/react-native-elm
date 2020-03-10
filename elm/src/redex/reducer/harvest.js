import * as type from '../actions/actionType';

const initialHarvestState = {
  addresses: [],
  tags: ['家', '公司', '学校'],
  genders: ['男', '女'],
};

const getLastId = addresses => {
  return addresses.length + 1;
};

const checkExist = (addresses, address) => {
  let existed = false;
  // for (let i = 0; i < addresses.length; i++) {
  //   let tmpPro = addresses[i];
  //   if (tmpPro.address === address.address) {
  //     existed = true;
  //     break;
  //   }
  // }
  return existed;
};

const addAddress = (addresses, address) => {
  addresses.push({
    ...address,
    id: getLastId(addresses),
  });
  return addresses;
};

const remAddress = (addresses, address) => {
  let index = -1;
  for (let i = 0; i < addresses.length; i++) {
    let tmpPro = addresses[i];
    if (tmpPro.id === address.id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    addresses.splice(index, 1);
  }
  return addresses;
};

const editAddress = (addresses, address) => {
  for (let i = 0; i < addresses.length; i++) {
    let tmpPro = addresses[i];
    if (tmpPro.id === address.id) {
      addresses[i] = address;
      break;
    }
  }
  return addresses;
};

const clearAddress = () => {
  return [];
};

const harvest = (state = initialHarvestState, action) => {
  let addresses = state.addresses;
  switch (action.type) {
    case type.ADD_ADDRESS:
      if (checkExist(addresses, action.address)) {
        return state;
      }
      addresses = addAddress(addresses, action.address);
      return {
        ...state,
        addresses,
      };
    case type.REM_ADDRESS:
      if (!checkExist(addresses, action.address)) {
        return state;
      }
      addresses = remAddress(addresses, action.address);
      return {
        ...state,
        addresses,
      };
    case type.EDIT_ADDRESS:
      // if (!checkExist(addresses, action.address)) {
      //   return state;
      // }
      addresses = editAddress(addresses, action.address);
      return {
        ...state,
        addresses,
      };
    case type.CLEAR_ADDRESS:
      addresses = clearAddress();
      return {
        ...state,
        addresses,
      };
    default:
      return state;
  }
};

export default harvest;
