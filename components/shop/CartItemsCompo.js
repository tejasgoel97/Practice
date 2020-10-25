import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PlusMinusButton from "./PlusMinusButton";

import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const CartItemsCompo = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexDefineContainer}>
        <View>
          <Text>{props.title}</Text>
        </View>
        <View>
          <Text>{props.quantity}</Text>
        </View>
        <View style={styles.PriceAndPlusMinusContainer}>
          <Text>Rs.{props.sum.toFixed(2)}</Text>
          <View>
            <PlusMinusButton
              DelFromCart={props.DelFromCart}
              onAddCart={props.onAddCart}
              quantity={props.quantity}
              DelFromCart={() => {
                console.log("ItemDeleteKarenge");
                dispatch(cartActions.DeleteFromCart(props));
              }}
              onAddCart={() => {
                console.log("OnADD CART");
                dispatch(cartActions.addToCart(props));
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "orange",
    borderRadius: 10,
    borderWidth: 3,
  },
  flexDefineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PriceAndPlusMinusContainer: {
    justifyContent: "space-around",
  },
});

export default CartItemsCompo;
