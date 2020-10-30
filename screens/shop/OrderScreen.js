import React from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
const OrderScreen = (props) => {
  const OrdersData = useSelector((state) => state.OrderReducer.orders);

  console.log(OrdersData);
  return (
    <FlatList
      data={OrdersData}
      renderItem={(OrdersData) => {
        console.log(OrdersData);
        return <Text>OrdersData.item.amount</Text>;
      }}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="MENU"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrderScreen;
