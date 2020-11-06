import React from "react";

import {
  Text,
  View,
  StyleSheet,
  Flatlist,
  Button,
  FlatList,
} from "react-native";
import Product from "../../modals/product";

const OrderDetailScreen = (props) => {
  //   console.log(props);
  const OrderData = props.navigation.getParam("data");
  //   console.log(OrderData);
  const amount = OrderData.amount;
  const Tdate = OrderData.date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const OrderItems = OrderData.items;

  console.log(OrderItems);
  const TransformedItems = [];
  for (let key in OrderItems) {
    const { productPrice, productTitle, quantity, sum } = OrderItems[key];
    let Prod = {
      id: key,
      productPrice,
      productTitle,
      quantity,
      sum,
    };
    TransformedItems.push(Prod);
  }
  console.log(TransformedItems);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}></View>
      <View style={styles.innerContainer}>
        <Text>Ordered on</Text>
        <Text>{Tdate}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text>Amount</Text>
        <Text>Rs.{amount}</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={TransformedItems}
          renderItem={(renderData) => {
            return (
              <View style={styles.cardContainer}>
                <View style={styles.innerContainer}>
                  <Text>{renderData.item.productTitle}</Text>
                  <Text>{renderData.item.quantity}</Text>
                  <Text>{renderData.item.sum}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    flex: 1,
    backgroundColor: "red",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    backgroundColor: "yellow",
    margin: 5,
  },
});

export default OrderDetailScreen;
