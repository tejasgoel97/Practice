import React, { useState } from "react";
import {
  View,
  Text,
  Flatlist,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import * as ProductActions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const data = props.navigation.getParam("data");
  // const { id, title, imageUrl, price, description } = data;
  // console.log(id, title, imageUrl, price, description);

  if (data) {
    console.log("ok");
  }
  const [ValTitle, setValTitle] = useState(false);
  const [ValImageUrl, setValImageUrl] = useState(false);
  const [ValPrice, setValPrice] = useState(false);

  const [title, setTitle] = useState(data ? data.title : "");
  const [imageUrl, setImageUrl] = useState(data ? data.imageUrl : "");

  const [price, setPrice] = useState(data ? data.price : "");
  const [description, setDescription] = useState(data ? data.description : "");
  const id = data ? data.id : new Date().toString();
  const dispatch = useDispatch();
  const DispatchWithData = (title, description, imageUrl, price) => {
    if (ValPrice || ValTitle || ValImageUrl) {
      console.log(ValPrice, ValTitle, ValImageUrl);
      Alert.alert("SomeProperty Might Be wrong", "Please Check", [
        {
          text: "Ask Me Later",
          onPress: () => console.log("ASK me Later"),
        },
        {
          Cancel: "Cancel",
          onPress: () => console.log("Cancel"),
        },
      ]);
      return;
    }
    if (data) {
      console.log("TEST");
      dispatch(
        ProductActions.EditNewProduct(id, title, description, imageUrl, +price)
      );
    } else {
      console.log("TEST");

      dispatch(
        ProductActions.CreateNewProduct(
          id,
          title,
          description,
          imageUrl,
          +price
        )
      );
    }
    console.log("TEST@");
  };
  return (
    <View style={styles.maincontainer}>
      <ScrollView>
        <View>
          <Text style={{ ...styles.text, ...styles.textContainer }}>
            ID: {id}
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Item Name</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
              autoCorrect
              autoCapitalize="words"
              returnKeyType="next"
              onEndEditing={(text) => {
                if (!text.nativeEvent.text) {
                  setValTitle(true);
                } else {
                  setValTitle(false);
                }
              }}
            />
            {ValTitle && <Text style={{ color: "white" }}>*Enter a Title</Text>}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>IMAGEURL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
              onEndEditing={(text) => {
                if (!text.nativeEvent.text) {
                  setValImageUrl(true);
                } else {
                  setValImageUrl(false);
                }
              }}
            />
            {ValImageUrl && (
              <Text style={{ color: "white" }}>*Enter a ImaeUrl</Text>
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>PRICE</Text>
            <TextInput
              style={styles.input}
              value={`${price}`}
              onChangeText={(text) => setPrice(text)}
              onEndEditing={(text) => {
                if (!text.nativeEvent.text) {
                  setValPrice(true);
                } else {
                  setValPrice(false);
                }
              }}
            />
            {ValPrice && <Text style={{ color: "white" }}>*Give a price</Text>}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>DESCRIPTION</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>
        <Button
          title="SUBMIT"
          onPress={() => DispatchWithData(title, description, imageUrl, price)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
    marginVertical: 20,
  },
  textContainer: {
    marginHorizontal: 10,
    borderRadius: 2,
    borderColor: "grey",
    marginVertical: 5,
  },
  text: {
    fontSize: 25,
    fontFamily: "Antaro",
  },
  input: {
    fontSize: 22,
    borderLeftWidth: 3,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "black",
    paddingHorizontal: 10,
  },
});

export default EditProductScreen;
