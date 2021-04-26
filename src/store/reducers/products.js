import {
  FETCH_PRODUCTS_DONE,
  BUYING_PRODUCT,
  BUY_PRODUCT_DONE,
  PRODUCT_RETURNED,
  LOADING_PRODUCTS,
  FETCH_PRODUCTS_ERRROR,
  RETURNING_PRODUCT,
  RETURNING_PRODUCT_ERROR,
} from "../constants";
import keyBy from "lodash/keyBy";

const initialState = {
  isLoading: false,
  data: {},
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return { ...state, isLoading: true };
    case FETCH_PRODUCTS_DONE:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
        data: keyBy(
          action.payload.map((product) => ({
            ...product,
          })),
          "id"
        ),
      };
    case FETCH_PRODUCTS_ERRROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload,
      };

    case BUYING_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case BUY_PRODUCT_DONE:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            quantity: state.data[action.payload.id].quantity - 1,
          },
        },
      };
    case RETURNING_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_RETURNED:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: {
          ...state.data,
          [action.payload]: {
            ...state.data[action.payload],
            quantity: state.data[action.payload].quantity + 1,
          },
        },
      };
    case RETURNING_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
