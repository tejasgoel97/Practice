import React from "react";
import { FlatList, View, StyleSheet, Text, Button, Image } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import ProductItems from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductOverviewScreen = (props) => {
  const dispatch = useDispatch();

  const StoreData = useSelector(
    (state) => state.ProductReducer.availableProducts
  );
  console.log(StoreData);
  return (
    <View style={styles.mainContainer}>
      <View style={{ backgroundColor: "red", flex: 1, width: "100%" }}>
        <Button
          title="VIEW CART"
          onPress={() => props.navigation.navigate("OrderScreen")}
        />
        <FlatList
          data={StoreData}
          renderItem={(itemData) => (
            <ProductItems
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              pid={itemData.item.id}
              onViewDetails={() =>
                props.navigation.navigate("ProductDetailScreen", {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title,
                })
              }
              onAddCart={() => {
                // console.log("OnADD CART");
                dispatch(cartActions.addToCart(itemData.item));
              }}
              DelFromCart={() => {
                // console.log("ItemDeleteKarenge");
                dispatch(cartActions.DeleteFromCart(itemData.item));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "PRODUCTS",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="CART"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate("CartScreen")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "yellow",
    height: 900,
    alignItems: "center",
  },
});
export default ProductOverviewScreen;
