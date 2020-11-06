//BASIC REACT IMPORTS
import React from "react";

//IMPORTS FOR THE REACT_NAVIGATOR
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

//IMPORT FOR THE ALL SCREENS USED IN THIS NAVIGATION
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import OrderDetailScreen from "../screens/shop/OrderDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
//COLORS AND ICONS IMPORT
import ColorsS from "../constants/Colors";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DefaultNavOptionsDefined = {
  headerStyle: {
    backgroundColor: ColorsS.primary,
  },
  headerTitleStyle: {
    fontFamily: "Antaro",
  },
  headerTintColor: Colors.accent,
};

const productsNavigator = createStackNavigator(
  {
    ProductOverviewScreen: ProductOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    OrderScreen: OrderScreen,
    CartScreen: CartScreen,
  },
  // {
  //   navigationOptions: {
  //     headerStyle: { backgroundColor: "purple" },

  //     // drawerIcon: (drawerConfig) => (
  //     //   <Ionicons name="md-cart" size={23} style={{ color: "#FFF" }} />
  //     // ),
  //   },
  // },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: ColorsS.primary,
      },
      headerTitleStyle: {
        fontFamily: "Antaro",
      },
      headerTintColor: Colors.accent,
    },
  }
);
const OrdersNavigator = createStackNavigator(
  {
    OrderScreen: OrderScreen,
    OrderDetailScreen: OrderDetailScreen,
  },
  // {
  //   navigationOptions: {
  //     drawerIcon: (drawerConfig) => (
  //       <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
  //     ),
  //   },
  // },

  {
    defaultNavigationOptions: DefaultNavOptionsDefined,
  }
);
const AdminNavigator = createStackNavigator(
  {
    UserProductScreen: UserProductScreen,
    EditProductScreen: EditProductScreen,
  },
  // {
  //   navigationOptions: {
  //     drawerIcon: (drawerConfig) => (
  //       <Ionicons name="md-person" size={23} color={drawerConfig.tintColor} />
  //     ),
  //   },
  // },
  {
    defaultNavigationOptions: DefaultNavOptionsDefined,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: productsNavigator,
    Orders: OrdersNavigator,
    AdminNavigator: AdminNavigator,
  },
  {
    defaultNavigationOptions: DefaultNavOptionsDefined,
  }
);

export default createAppContainer(ShopNavigator);
