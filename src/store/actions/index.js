/**
 * Importing necessary type constants to be used for manipulating our redux
 */
import {
  FETCH_PRODUCTS_DONE,
  INCREMENT_BALANCE_DONE,
  BUY_PRODUCT_DONE,
  FETCH_CURRENT_BALANCE,
  PRODUCT_RETURNED,
  PRODUCT_RETURN,
  FETCH_PURCHASED_PRODUCTS,
  LOADING_BALANCE,
  FETCH_BALANCE_ERROR,
  INCREMENTING_BALANCE,
  INCREMENT_BALANCE_ERROR,
  DECREMENTING_BALANCE,
  DECREMENT_BALANCE_DONE,
  DECREMENTING_BALANCE_ERROR,
  LOADING_PRODUCTS,
  FETCH_PRODUCTS_ERRROR,
  BUYING_PRODUCT,
  BUY_PRODUCT_ERROR,
  RETURNING_PRODUCT,
  RETURNING_PRODUCT_ERROR,
} from "../constants";
import axios from "axios";

/**
 * Action to fetch list of products
 * @returns Array of Products
 */
export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: LOADING_PRODUCTS,
  });

  await axios
    .get(`${process.env.REACT_APP_API_URL}/products`)
    .then((products) => {
      setTimeout(() => {
        dispatch({
          type: FETCH_PRODUCTS_DONE,
          payload: products.data,
        });
      }, 1000);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PRODUCTS_ERRROR,
        payload: error.response.data,
      });
      console.error(
        "some error occurred while fetching products list =>",
        error
      );
    });
};

/**
 * Action to fetch user's balance
 * @returns User's Current Balance Object
 */
export const fetchBalance = () => async (dispatch) => {
  dispatch({
    type: LOADING_BALANCE,
  });

  await axios
    .get(`${process.env.REACT_APP_API_URL}/balance`)
    .then((response) => {
      dispatch({
        type: FETCH_CURRENT_BALANCE,
        payload: response.data.amount,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_BALANCE_ERROR,
        payload: error.response.data,
      });
      console.error(
        "some error occurred while retrieving current balance =>",
        error
      );
    });
};

/**
 * Action to fetch list purchased products
 * @returns Array of products already purchased
 */
export const fetchPurchasedProducts = () => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/purchasedproducts`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: FETCH_PURCHASED_PRODUCTS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      console.error(
        "some error occurred while retrieving purchased products =>",
        error
      );
    });
};

/**
 * Action to credit balance to user's wallet
 * @param {*} amount takes number input
 * @returns amount object
 */
export const incrementBalance = (amount) => async (dispatch, getState) => {
  dispatch({
    type: INCREMENTING_BALANCE,
  });

  const addedAmount = amount + getState().balance.value;

  await axios
    .post(`${process.env.REACT_APP_API_URL}/balance`, {
      amount: addedAmount,
    })
    .then(() => {
      setTimeout(() => {
        dispatch({
          type: INCREMENT_BALANCE_DONE,
          payload: amount,
        });
      }, 1000);
    })
    .catch((error) => {
      dispatch({
        type: INCREMENT_BALANCE_ERROR,
        payload: error.response.data,
      });
      console.error("some error occurred while adding the balance =>", error);
    });
};

/**
 * Action to debit balance to user's wallet
 * @param {*} amount takes number input
 * @returns amount object
 */
export const decrementBalance = (amount) => async (dispatch, getState) => {
  dispatch({
    type: DECREMENTING_BALANCE,
  });

  const updatedBalance = getState().balance.value - amount;
  await axios
    .put(`${process.env.REACT_APP_API_URL}/balance`, {
      amount: updatedBalance,
    })
    .then(() => {
      dispatch({
        type: DECREMENT_BALANCE_DONE,
        payload: amount,
      });
    })
    .catch((error) => {
      dispatch({
        type: DECREMENTING_BALANCE_ERROR,
        payload: error.response.data,
      });
      console.error(
        "some error occurred while deducting the balance =>",
        error
      );
    });
};

/**
 * Action to buy a particular product
 * @param {*} product takes product object
 * @returns it will deduct the quantity for the product being purchaed and add the product to purchased products list
 */
export const buyProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: BUYING_PRODUCT,
    payload: product.id,
  });

  await axios
    .put(`${process.env.REACT_APP_API_URL}/products/${product.id}`, {
      name: product.name,
      price: product.price,
      quantity: product.quantity - 1,
      image: product.image,
    })
    .then(() => {
      dispatch(decrementBalance(getState().products.data[product.id].price));
    })
    .catch((error) => {
      dispatch({
        type: BUY_PRODUCT_ERROR,
        payload: error.response.data,
      });
      console.error(
        "some error occurred while making product purchase =>",
        error
      );
    });

  await axios
    .get(`${process.env.REACT_APP_API_URL}/purchasedproducts/${product.id}`)
    .then((response) => {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/purchasedproducts/${product.id}`,
          {
            name: response.data.name,
            price: product.price + response.data.price,
            quantity: response.data.quantity + 1,
            image: response.data.image,
          }
        )
        .then((resp) => {
          dispatch({
            type: BUY_PRODUCT_DONE,
            payload: {
              id: resp.data.id,
              name: resp.data.name,
              price: resp.data.price,
              quantity: resp.data.quantity,
              image: resp.data.image,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: BUY_PRODUCT_ERROR,
            payload: error.response.data,
          });
          console.error(
            "some error occurred while making product purchase =>",
            error
          );
        });
    })
    .catch((error) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/purchasedproducts`, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        })
        .then((res) => {
          dispatch({
            type: BUY_PRODUCT_DONE,
            payload: {
              id: res.data.id,
              name: res.data.name,
              price: res.data.price,
              quantity: res.data.quantity,
              image: res.data.image,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: BUY_PRODUCT_ERROR,
            payload: error.response.data,
          });
          console.error(
            "some error occurred while making product purchase =>",
            error
          );
        });
    });
};

/**
 * Action to return the purchased product
 * @param {*} product takes product object
 * @returns it will deduct the quantity for the purchased product and add it back to products list
 */
export const returnProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: RETURNING_PRODUCT,
  });

  await axios
    .get(`${process.env.REACT_APP_API_URL}/purchasedproducts/${product.id}`)
    .then((response) => {
      if (response.data.quantity > 1) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/purchasedproducts/${product.id}`,
            {
              name: response.data.name,
              price:
                response.data.price -
                response.data.price / response.data.quantity,
              quantity: response.data.quantity - 1,
              image: response.data.image,
            }
          )
          .then((productreturned) => {
            dispatch(
              incrementBalance(getState().products.data[product.id].price)
            );
            dispatch({
              type: PRODUCT_RETURNED,
              payload: product.id,
            });

            axios.put(
              `${process.env.REACT_APP_API_URL}/products/${product.id}`,
              {
                name: product.name,
                price: getState().products.data[product.id].price,
                quantity: getState().products.data[product.id].quantity,
                image: product.image,
              }
            );
            dispatch({
              type: PRODUCT_RETURN,
              payload: {
                id: productreturned.data.id,
                name: productreturned.data.name,
                price: productreturned.data.price,
                quantity: productreturned.data.quantity,
                image: productreturned.data.image,
              },
            });
          })
          .catch((error) => {
            dispatch({
              type: RETURNING_PRODUCT_ERROR,
              payload: error.response.data,
            });
            console.error(
              `Some error occurred while returning the product => ${error}`
            );
          });
      } else {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/purchasedproducts/${product.id}`
          )
          .then(() => {
            dispatch({
              type: PRODUCT_RETURN,
              payload: {
                id: product.id,
                name: product.name,
                price: 0,
                quantity: 0,
                image: product.image,
              },
            });
            dispatch(
              incrementBalance(getState().products.data[product.id].price)
            );
            dispatch({
              type: PRODUCT_RETURNED,
              payload: product.id,
            });

            axios.put(
              `${process.env.REACT_APP_API_URL}/products/${product.id}`,
              {
                name: product.name,
                price: getState().products.data[product.id].price,
                quantity: getState().products.data[product.id].quantity,
                image: product.image,
              }
            );
          })
          .catch((error) => {
            dispatch({
              type: RETURNING_PRODUCT_ERROR,
              payload: error.response.data,
            });
            console.error(
              "Error removing product from purchasedproducts =>", error
            );
          });
      }
    });
};
