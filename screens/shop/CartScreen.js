import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as OrdersAction from "../../store/actions/orders";

import CartItemsCompo from "../../components/shop/CartItemsCompo";

import ColorS from "../../constants/Colors";

const CartScreen = (props) => {
  const [isLoaading, setIsLoading] = useState(false);

  const cartItems = useSelector((state) => state.CartReducer);
  const StoreData = useSelector(
    (state) => state.ProductReducer.availableProducts
  );
  const OrderData = useSelector((state) => state.OrderReducer);
  console.log(OrderData);

  const dispatch = useDispatch();
  const transformedDataArray = [];
  for (const key in cartItems.items) {
    transformedDataArray.push({
      pId: key,
      productTitle: cartItems.items[key].productTitle,
      productQuantity: cartItems.items[key].quantity,
      productSum: cartItems.items[key].sum,
      prodPrice: cartItems.items[key].productPrice,
    });

    // console.log("ok")
    const transformedDataSorted = transformedDataArray.sort();
  }

  // console.log(cartItems.items);
  const NoOfItems = Object.keys(cartItems.items).length;

  const sendOrders = async () => {
    setIsLoading(true);
    dispatch(OrdersAction.addOrders(cartItems.items, cartItems.totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.totalContainer}>
        <View style={styles.numberOfItemsContainer}>
          <Text>You have {NoOfItems} items in cart</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text>
            Total <Text>{cartItems.totalAmount.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
      <View>
        {isLoaading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button title="ORDER NOW" onPress={sendOrders} />
        )}
      </View>
      <View style={{ width: "100%", justifyContent: "center" }}>
        <FlatList
          data={transformedDataArray}
          renderItem={(itemData) => {
            return (
              <CartItemsCompo
                title={itemData.item.productTitle}
                quantity={itemData.item.productQuantity}
                sum={itemData.item.productSum}
                price={itemData.item.prodPrice}
                id={itemData.item.pId}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = (navdata) => {
  return {
    headerTitle: "YOUR CART",
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
  },
  totalContainer: {
    margin: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    //FOR ANDROID
    elevation: 30,

    backgroundColor: "orange",
    borderRadius: 10,
    // height: 300,
    height: 100,
    borderWidth: 3,
    borderColor: "red",
    margin: 10,
    overflow: "hidden",
  },
});

export default CartScreen;
