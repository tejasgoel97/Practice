import { ADD_ORDERS, FETCH_ORDERS } from "../actions/orders";

import Order from "../../modals/OrderItem";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { orders: action.payload };

    case ADD_ORDERS:
      console.log(action.payload.items);
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.orderAmount,
        action.payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
