import { combineReducers } from "redux";
import ProductReducer from "./products";
import CartReducer from "./cart";
import OrderReducer from "./orders";

const rootReucer = combineReducers({
  ProductReducer,
  CartReducer,
  OrderReducer,
});

export default rootReucer;
