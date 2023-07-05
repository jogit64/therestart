import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import luckyDiceAnimation from "./../../../../assets/animations/lucky-dice.json";
import { useNavigation } from "@react-navigation/native";

export default function Tab2() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tab2</Text>
      <TouchableOpacity
        style={styles.lottieButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <LottieView source={luckyDiceAnimation} autoPlay />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieButton: {
    width: "100%", // ou toute autre dimension que vous voulez
    height: "100%", // ou toute autre dimension que vous voulez
    justifyContent: "center",
    alignItems: "center",
  },
});
