import OrderItem from "../../modals/OrderItem";

export const ADD_ORDERS = "ADD OREDERS";
export const FETCH_ORDERS = "FETCH_ORDERS";

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
        id: resData.name,
        date: date,
        items: items,
        orderAmount: orderAmount,
      },
    });
  };
};

export const fetchOrdres = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://sopprac.firebaseio.com/orders/u1.json"
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("SOMETHING WENT WRONG");
    }
    const resData = await response.json();
    // console.log(resData);
    const loadedData = [];
    for (let key in resData) {
      const { items, orderAmount, date } = resData[key];
      console.log(resData[key]);
      loadedData.push(new OrderItem(key, items, orderAmount, new Date(date)));
    }
    console.log(loadedData);
    dispatch({
      type: FETCH_ORDERS,
      payload: loadedData,
    });
    //
  } catch (err) {
    //send to custom ANALYTICS SERVER
    console.log(err);
    throw err;
  }
};
