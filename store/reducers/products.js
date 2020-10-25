//IMPORTING REDUX DEPENDENCIES
import { combineReducers } from "redux";
//IMPORTING THE DATA LOCALLY
import PRODUCTS from "../../data/dummy-data";

import {
  DELETE_FOR_USER,
  CREATE_NEW_ITEM,
  EDIT_EXISTING_ITEM,
} from "../actions/products";
import ProductModal from "../../modals/product";

const initialstate = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const ProductReducer = (state = initialstate, action) => {
  switch (action.type) {
    case DELETE_FOR_USER:
      console.log(action.payload.itemId);
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload.itemId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload.itemId
        ),
      };
    case CREATE_NEW_ITEM:
      const { id, title, description, imageUrl, price } = action.payload;

      const newItem = new ProductModal(
        id,
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      console.log(newItem);
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newItem),
        userProducts: state.userProducts.concat(newItem),
      };

    case EDIT_EXISTING_ITEM:
      console.log("PURANA EDIT KARENGE");
      return state;
  }
  return state;
};

// const rootReducer = combineReducers({
//   ProductReducer: ProductReducer,
// });

export default ProductReducer;
