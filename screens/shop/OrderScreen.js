import React, { useEffect } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as OrdersAction from "../../store/actions/orders";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props) => {
  const OrdersData = useSelector((state) => state.OrderReducer.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrdersAction.fetchOrdres());
  }, []);

  if (OrdersData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>NO ORDERS TILL NOW</Text>
      </View>
    );
  }
  console.log(OrdersData);
  return (
    <FlatList
      data={OrdersData}
      renderItem={(OrdersData) => {
        console.log(OrdersData.item);
        return (
          <OrderItem
            data={OrdersData.item}
            onViewDetails={() =>
              props.navigation.navigate("OrderDetailScreen", {
                data: OrdersData.item,
              })
            }
          />
        );
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
