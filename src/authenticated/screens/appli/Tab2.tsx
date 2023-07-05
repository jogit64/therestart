// Tab2.tsx
import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import luckyDiceAnimation from "./../../../../assets/animations/lucky-dice.json";

export default function Tab2() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tab2</Text>
      <LottieView source={luckyDiceAnimation} autoPlay loop />
    </View>
  );
}
