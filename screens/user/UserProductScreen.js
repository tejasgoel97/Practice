import React from "react";
import { View, Text, Flatlist, StyleSheet } from "react-native";

import { useSelector, useDispatchs, useDispatch } from "react-redux";

import UserItems from "../../components/User/UserItems";
import { FlatList } from "react-native-gesture-handler";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import * as UserProductReducer from "../../store/actions/products";

const UserProductScreen = (props) => {
  const UserData = useSelector((state) => state.ProductReducer.userProducts);
  const dispatch = useDispatch();
  console.log(props);
  const onEditClick = (id, title, imageUrl, price, description) => {
    props.navigation.navigate("EditProductScreen", {
      data: { id, title, imageUrl, price, description },
    });
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={UserData}
        keyExtractor={(givenData) => givenData.id}
        renderItem={(givenData) => (
          <UserItems
            image={givenData.item.imageUrl}
            title={givenData.item.title}
            price={givenData.item.price}
            onDelete={() => {
              console.log("OK DETETE KARDO");
              dispatch(UserProductReducer.DeleteUserProduct(givenData.item.id));
            }}
            onEdit={() =>
              onEditClick(
                givenData.item.id,
                givenData.item.title,
                givenData.item.imageUrl,
                givenData.item.price,
                givenData.item.description
              )
            }
          />
        )}
      />
    </View>
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "YOUR PRODUCTS",
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
          title="MENU"
          iconName="md-beer"
          onPress={() => {
            navData.navigation.navigate("EditProductScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "purple",
  },
});

export default UserProductScreen;
