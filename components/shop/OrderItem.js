import React from "react";

import { Text, View, StyleSheet, Flatlist, Button } from "react-native";

const OrderItem = (props) => {
  console.log(props.data);
  const { amount, date, id, items } = props.data;
  const Tdate = date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(Tdate);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text>Ordered on</Text>
        <Text>{Tdate}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text>Amount</Text>
        <Text>Rs.{amount}</Text>
      </View>
      <Button
        style={{ color: "red" }}
        title="ViewDetails"
        onPress={props.onViewDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderItem;
