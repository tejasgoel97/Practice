export const ADD_ORDERS = "ADD OREDERS";

export const addOrders = (items, orderAmount) => {
  return {
    type: ADD_ORDERS,
    payload: {
      items: items,
      orderAmount: orderAmount,
    },
  };
};
