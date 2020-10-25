import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import ColorS from "../../constants/Colors";

import { AntDesign } from "@expo/vector-icons";

const PlusMinusButton = (props) => {
  // console.log(props);

  return (
    <View style={styles.CartItemsContainer}>
      <TouchableOpacity onPress={props.DelFromCart}>
        <AntDesign name="minuscircle" size={24} color={ColorS.primary} />
      </TouchableOpacity>

      <View>
        <Text>{props.quantity}</Text>
      </View>
      <TouchableOpacity onPress={props.onAddCart}>
        <AntDesign name="pluscircle" size={24} color={ColorS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 100,
  },
});

export default PlusMinusButton;
