//BASIC IMPORTS
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//IMPORT FOR FONTS
import { AppLoading } from "expo";
import * as Font from "expo-font";

//IMPORTS FOR REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/RootReducer";

//IMPORT ALL COMPONENTS USED HERE
import ProductOverviewScreen from "./screens/shop/ProductOverviewScreen";

//IMPORT NAVIGATOR
import ShopNavigator from "./navigation/ShopNavigator";

//IMPORT THUNK
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    Antaro: require("./assets/fonts/Antaro.ttf"),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      {/* <View style={styles.container}>
        <ProductOverviewScreen />
      </View> */}
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
