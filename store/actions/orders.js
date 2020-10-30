export const ADD_ORDERS = "ADD OREDERS";

export const addOrders = (items, orderAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://sopprac.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          orderAmount,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: ADD_ORDERS,
      payload: {
        date: date,
        items: items,
        orderAmount: orderAmount,
      },
    });
  };
};
