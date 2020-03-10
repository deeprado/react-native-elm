import * as type from '../actions/actionType';

const initialCartState = {
  products: [],
  freight: 7,
  goodsPrice: 0,
  total: 0,
};

const checkExist = (products, product) => {
  let existed = false;
  for (let i = 0; i < products.length; i++) {
    let tmpPro = products[i];
    if (tmpPro.id === product.id) {
      existed = true;
      break;
    }
  }
  return existed;
};

const calTotal = products => {
  let tmpPrice = 0;
  let tmpTotal = 0;
  products.map(function(item) {
    tmpPrice += item.price * item.total;
    tmpTotal += item.total;
  });
  return {
    goodsPrice: tmpPrice.toFixed(2),
    total: tmpTotal,
  };
};

const addProduct = (products, product) => {
  products.push({
    ...product,
    totalPrice: product.price.toFixed(2),
    total: 1,
  });
  return products;
};

const remProduct = (products, product) => {
  let index = -1;
  for (let i = 0; i < products.length; i++) {
    let tmpPro = products[i];
    if (tmpPro.id === product.id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    products.splice(index, 1);
  }
  return products;
};

const addNum = (products, product, num) => {
  for (let i = 0; i < products.length; i++) {
    let tmpPro = products[i];
    if (tmpPro.id === product.id) {
      tmpPro.total += num;
      tmpPro.totalPrice += (product.price.toFixed(2) * num).toFixed(2);
      products[i] = tmpPro;
      break;
    }
  }
  return products;
};

const remNum = (products, product, num) => {
  for (let i = 0; i < products.length; i++) {
    let tmpPro = products[i];
    if (tmpPro.id === product.id) {
      tmpPro.total -= num;
      tmpPro.totalPrice += (product.price.toFixed(2) * num).toFixed(2);
      products[i] = tmpPro;
      break;
    }
  }
  return products;
};

const clearProduct = () => {
  return initialCartState;
};

const cart = (state = initialCartState, action) => {
  let products = state.products;
  switch (action.type) {
    case type.ADD_PRODUCT:
      if (checkExist(products, action.product)) {
        products = addNum(products, action.product, 1);
      } else {
        products = addProduct(products, action.product);
      }
      return {
        ...state,
        products,
        ...calTotal(products),
      };
    case type.REM_PRODUCT:
      if (!checkExist(products, action.product)) {
        return state;
      }
      products = remProduct(products, action.product);
      return {
        ...state,
        products,
        ...calTotal(products),
      };
    case type.PLUS_PRODUCT:
      if (!checkExist(products, action.product)) {
        return state;
      }
      products = addNum(products, action.product, action.num);
      return {
        ...state,
        products,
        ...calTotal(products),
      };
    case type.MINUS_PRODUCT:
      if (!checkExist(products, action.product)) {
        return state;
      }
      products = remNum(products, action.product, action.num);
      return {
        ...state,
        products,
        ...calTotal(products),
      };
    case type.CLEAR_PRODUCT:
      return {
        ...state,
        ...clearProduct(),
      };
    default:
      return state;
  }
};

export default cart;
