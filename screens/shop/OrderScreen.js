import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const OrderScreen = (props) => {
  const OrdersData = useSelector((state) => state.OrderReducer.orders);

  console.log(OrdersData);
  return (
    <FlatList
      data={OrdersData}
      renderItem={(OrdersData) => <Text>OrdersData.item.amount</Text>}
    />
  );
};

OrderScreen.navigationOptions = () => {
  return {
    headerTitle: "Your Orders",
  };
};

export default OrderScreen;
