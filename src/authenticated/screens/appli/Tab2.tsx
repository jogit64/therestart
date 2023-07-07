import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import rondBleuAnimation from "./../../../../assets/animations/rondbleu.json";
import { useNavigation } from "@react-navigation/native";

export default function Tab2() {
  const navigation = useNavigation();

  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text>Tab2</Text>
    //   <TouchableOpacity
    //     style={styles.lottieButton}
    //     //onPress={() => navigation.navigate("Tab2Game")}
    //   >
    //     <LottieView source={rondBleuAnimation} autoPlay />
    //   </TouchableOpacity>
    // </View>
    // <LottieView source={rondBleuAnimation} autoPlay />

    <View style={styles.container}>
      <TouchableOpacity
        style={styles.lottieButton}
        onPress={() => navigation.navigate("ScreenRandomMemory")}
      >
        <LottieView
          source={rondBleuAnimation}
          autoPlay
          style={styles.animation}
        />
        <View style={styles.overlay}>
          <Text style={styles.text}>random</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lottieButton}
        onPress={() => navigation.navigate("ScreenManageMemory")}
      >
        <LottieView
          source={rondBleuAnimation}
          autoPlay
          style={styles.animation}
        />
        <View style={styles.overlay}>
          <Text style={styles.text}>edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // lottieButton: {
  //   width: "100%", // ou toute autre dimension que vous voulez
  //   height: "50%", // ou toute autre dimension que vous voulez
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieButton: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "roboto",
    color: "#ffffff",
  },
});
