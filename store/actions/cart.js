export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product: product,
    },
  };
};
export const DeleteFromCart = (product) => {
  return {
    type: DELETE_FROM_CART,
    payload: {
      product: product,
    },
  };
};
