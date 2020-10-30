import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import ProductItems from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsAction from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductOverviewScreen = (props) => {
  // console.log("LOADING PRODUCTS");
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loading = useCallback(async () => {
    // console.log("LOADINGGGGG");
    try {
      setError(false);
      setIsloading(true);
      await dispatch(productsAction.FetchProducts());
      setIsloading(false);
    } catch (err) {
      setError(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loading();
  }, [dispatch]);

  useEffect(() => {
    const willFocusListerner = props.navigation.addListener("willFocus", () =>
      loading()
    );
    return () => {
      willFocusListerner.remove();
    };
  }, [loading]);
  const StoreData = useSelector(
    (state) => state.ProductReducer.availableProducts
  );

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <Text>AN ERROR OCCURED</Text>
        <Button title="TRY AGAIN " onPress={() => loading()} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (!isLoading && StoreData.length === 0) {
    console.log("KUCH NAHI H ");
    return (
      <View style={styles.mainContainer}>
        <Text>No DATA PRESENT</Text>
      </View>
    );
  }

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
