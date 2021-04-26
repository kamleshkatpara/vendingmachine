import {
  INCREMENT_BALANCE_DONE,
  DECREMENTING_BALANCE_ERROR,
  FETCH_CURRENT_BALANCE,
  LOADING_BALANCE,
  FETCH_BALANCE_ERROR,
  INCREMENTING_BALANCE,
  INCREMENT_BALANCE_ERROR,
  DECREMENTING_BALANCE,
  DECREMENT_BALANCE_DONE,
} from "../constants";

const initialState = {
  isLoading: false,
  value: 0,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BALANCE:
      return { ...state, isLoading: true };
    case FETCH_CURRENT_BALANCE:
      return {
        ...state,
        isLoading: false,
        value: action.payload,
        isSuccess: true,
      };
    case FETCH_BALANCE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errorMessage: action.payload.error,
      };
    case INCREMENTING_BALANCE:
      return { ...state, isLoading: true };
    case INCREMENT_BALANCE_DONE:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        value: state.value + action.payload,
        isError: false,
      };
    case INCREMENT_BALANCE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case DECREMENTING_BALANCE:
      return { ...state, isLoading: true };
    case DECREMENT_BALANCE_DONE:
      return {
        ...state,
        isLoading: false,
        value: state.value - action.payload,
      };
    case DECREMENTING_BALANCE_ERROR:
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
