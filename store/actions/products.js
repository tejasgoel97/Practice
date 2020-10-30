import Product from "../../modals/product";

export const DELETE_FOR_USER = "DELETE_FOR_USER";
export const CREATE_NEW_ITEM = "CREATE_NEW_ITEM";
export const EDIT_EXISTING_ITEM = "EDIT_EXISTING_ITEM";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const FetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://sopprac.firebaseio.com/products.json"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("SOMETHING WENT WRONG");
      }
      const resData = await response.json();
      // console.log(resData);
      const loadedData = [];
      for (let key in resData) {
        const { title, description, imageUrl, price } = resData[key];
        loadedData.push(
          new Product(key, "u1", title, imageUrl, description, price)
        );
      }
      console.log(loadedData);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: loadedData,
      });
      //
    } catch (err) {
      //send to custom ANALYTICS SERVER
      console.log(err);
      throw err;
    }
  };
};

export const DeleteUserProduct = (product) => {
  return async (dispatch) => {
    const response2 = await fetch(
      `https://sopprac.firebaseio.com/products/${product}.json`,
      {
        method: "DELETE",
      }
    );
    const response = await fetch(
      "https://sopprac.firebaseio.com/products.json"
    );
    const resData = await response.json();
    // console.log(resData);
    const loadedData = [];
    for (let key in resData) {
      const { title, description, imageUrl, price } = resData[key];
      loadedData.push(
        new Product(key, "u1", title, imageUrl, description, price)
      );
    }
    dispatch({
      type: DELETE_FOR_USER,
      payload: loadedData,
    });
  };
};

export const CreateNewProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch) => {
    //any async code you want!!!
    const response = await fetch(
      "https://sopprac.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_NEW_ITEM,
      payload: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};
export const EditNewProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://sopprac.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    console.log(response);
    dispatch({
      type: EDIT_EXISTING_ITEM,
      payload: {
        id,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};
