import {
  BUY_PRODUCT_DONE,
  FETCH_PURCHASED_PRODUCTS,
  PRODUCT_RETURN,
} from "../constants";

const initialState = [];

const quantityForItem = (list, newItem) => {
  const item = list.find((item) => item.refid === newItem.id);
  return (item && item.quantity) || 0;
};

const updateQuantity = (list, newItem, variation) =>
  list.map((item) => {
    if (item.refid !== newItem.id) return item;
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
        action.payload.refid = action.payload.id;
        return [...state, action.payload];
      }
    case PRODUCT_RETURN:
      if (state.find((product) => product.refid === action.payload.id) !== 0) {
        if (action.payload.quantity !== 0) {
          action.payload.refid = action.payload.id;
          return state.map((product) =>
            product.refid === action.payload.id ? action.payload : product
          );
        }
        if (action.payload.quantity === 0) {
          action.payload.refid = action.payload.id;
          return state.filter((product) => product.refid !== action.payload.id);
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
