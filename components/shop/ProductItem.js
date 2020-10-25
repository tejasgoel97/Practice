import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import PlusMinusButton from "./PlusMinusButton";

import { useSelector } from "react-redux";

import ColorS from "../../constants/Colors";

const ProductItems = (props) => {
  // console.log(props);
  const cartData = useSelector((state) => state.CartReducer.items);
  // console.log(cartData[props.pid]);
  const AddToCartButton = () => {
    if (cartData[props.pid]) {
      return (
        <PlusMinusButton
          DelFromCart={props.DelFromCart}
          onAddCart={props.onAddCart}
          quantity={cartData[props.pid].quantity}
        />

        // <View style={styles.CartItemsContainer}>
        //   <TouchableOpacity onPress={props.DelFromCart}>
        //     <AntDesign name="minuscircle" size={24} color={ColorS.primary} />
        //   </TouchableOpacity>

        //   <View>
        //     <Text>{cartData[props.pid].quantity}</Text>
        //   </View>
        //   <TouchableOpacity onPress={props.onAddCart}>
        //     <AntDesign name="pluscircle" size={24} color={ColorS.primary} />
        //   </TouchableOpacity>
        // </View>
      );
    }
    return (
      <Button
        color={ColorS.primary}
        title="To Cart"
        onPress={props.onAddCart}
      />
    );
  };

  return (
    <View style={styles.product}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <View style={styles.titleNPriceContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.priceText}>Rs.{props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={ColorS.primary}
          title="View Details"
          onPress={props.onViewDetails}
        />

        <AddToCartButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    //FOR IOS
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    //FOR ANDROID
    elevation: 30,

    backgroundColor: "orange",
    borderRadius: 10,
    // height: 300,
    height: 300,

    margin: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titleNPriceContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  priceText: {
    fontSize: 14,
    textAlign: "center",
  },
  CartItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 100,
    borderWidth: 3,
    borderColor: "black",
  },
});

export default ProductItems;
