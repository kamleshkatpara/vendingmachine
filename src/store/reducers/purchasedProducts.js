import {
  BUY_PRODUCT_DONE,
  FETCH_PURCHASED_PRODUCTS,
  PRODUCT_RETURN,
} from "../constants";

const initialState = [];

const quantityForItem = (list, newItem) => {
  const item = list.find((item) => item.id === newItem.id);
  return (item && item.quantity) || 0;
};

const updateQuantity = (list, newItem, variation) =>
  list.map((item) => {
    if (item.id !== newItem.id) return item;
    return {
      ...item,
      price: newItem.price,
      quantity: item.quantity + variation,
    };
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_PRODUCT_DONE:
      if (quantityForItem(state, action.payload) !== 0) {
        return updateQuantity(state, action.payload, +1);
      } else {
        return [...state, action.payload];
      }
    case PRODUCT_RETURN:
      if (state.find((product) => product.id === action.payload.id) !== 0) {
        if (action.payload.quantity !== 0) {
          return state.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        }
        if (action.payload.quantity === 0) {
          return state.filter((product) => product.id !== action.payload.id);
        }
      }

    // eslint-disable-next-line no-fallthrough
    case FETCH_PURCHASED_PRODUCTS:
      return action.payload[0] === [] ? state : [...action.payload];
    default:
      return state;
  }
};

export default reducer;
