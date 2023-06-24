import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";

type Tab1NavigationProp = StackNavigationProp<Tab1ParamList, "Tab1P0">;

export default function Tab1P0Screen() {
  //const navigation = useNavigation();
  const navigation = useNavigation<Tab1NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tab1P1")}
      >
        <Text style={styles.buttonText}>Go to Tab1P1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6f78bd",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
