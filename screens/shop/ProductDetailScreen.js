import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";

import { useSelector } from "react-redux";
import ColorS from "../../constants/Colors";

const ProductDetailScreen = (props) => {
  const item_id = props.navigation.getParam("productId");
  const SelectedItem = useSelector((state) =>
    state.ProductReducer.availableProducts.find((item) => item.id === item_id)
  );
  // console.log(SelectedItem);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: SelectedItem.imageUrl }} style={styles.imageS} />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 30,
            textDecorationLine: "underline",
            fontFamily: "Antaro",
          }}
        >
          {SelectedItem.title}
        </Text>
      </View>
      <View style={styles.PriceNCartContainer}>
        <Text style={{ fontSize: 20 }}>Price: Rs.{SelectedItem.price}</Text>
        <Button
          title="ADD TO CART"
          color={ColorS.primary}
          onPress={() => console.log("added to kart")}
        />
      </View>
      <View>
        <Text>Descritpion</Text>
        <Text>{SelectedItem.description}</Text>
      </View>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("productTitle");
  return { headerTitle: title };
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: ColorS.accent,
    flex: 1,
    alignItems: "center",
  },
  imageS: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "90%",
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleContainer: {
    width: "100%",
    padding: 20,
  },
  PriceNCartContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  descriptionContainer: {
    padding: 20,
  },
});

export default ProductDetailScreen;
