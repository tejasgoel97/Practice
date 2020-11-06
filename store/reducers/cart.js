import CartItems from "../../modals/cart-item";
import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart";
import { DELETE_FOR_USER } from "../actions/products";
import _ from "lodash";
import { ADD_ORDERS } from "../actions/orders";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      return initialState;

    case ADD_TO_CART:
      const addedProduct = action.payload.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let prodSum = prodPrice;
      let newQuantity = 1;
      let newTotal = state.totalAmount + prodPrice;
      if (state.items[addedProduct.id]) {
        // console.log("PAHLE SE HAI YE");
        newQuantity = state.items[addedProduct.id].quantity + 1;
        // console.log(newQuantity);
        prodSum = prodPrice * newQuantity;
      }
      let newItemToAdd = new CartItems(
        newQuantity,
        prodPrice,
        prodTitle,
        prodSum
      );

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newItemToAdd },
        totalAmount: newTotal,
      };
    case DELETE_FROM_CART:
      const ToDeletePrduct = action.payload.product;
      const DelprodPrice = ToDeletePrduct.price;
      const DelprodTitle = ToDeletePrduct.title;
      const DelId = ToDeletePrduct.id;
      newTotal = DelprodPrice;
      if (state.items[DelId].quantity < 2) {
        console.log("old Data", state.items);
        let newList = _.omit(state.items, [DelId]);

        console.log(state);
        return {
          ...state,
          items: { ...newList },
          totalAmount: newTotal,
        };
      }
      const DelnewQuantity = state.items[DelId].quantity - 1;
      const DelprodSum = prodPrice * newQuantity;
      newItemToAdd = new CartItems(
        DelnewQuantity,
        DelprodPrice,
        DelprodTitle,
        DelprodSum
      );
      return {
        ...state,
        items: { ...state.items, [ToDeletePrduct.id]: newItemToAdd },
        totalAmount: newTotal,
      };
    case DELETE_FOR_USER:
      const ToDeletePrductId = action.payload.itemId;
      if (state.items[ToDeletePrductId]) {
        console.log("Rducer se delete kr denge");
        newTotal = state.totalAmount - state.items[ToDeletePrductId].sum;
        let newList = _.omit(state.items, [ToDeletePrductId]);
        return {
          ...state,
          items: newList,
          totalAmount: newTotal,
        };
      }
      return state;
  }
  return state;
};

export default cartReducer;
