import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import luckyDiceAnimation from "../../../../../assets/animations/lucky-dice.json";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import rondBleuAnimation from "./../../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../../assets/animations/rondvert.json";

export default function ScreenRandomMemory() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Contenu de votre ScrollView</Text>
        {/* Ajoutez ici le reste de votre contenu qui sera dans le ScrollView */}
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.navigate("ScreenRandomMemory")}
          >
            <LottieView
              source={rondBleuAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={40}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.navigate("ScreenManageMemory")}
          >
            <LottieView
              source={rondVertAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons name="shovel" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 0.75,
    backgroundColor: "#f5f5f5", // Changer la couleur de fond si nécessaire
  },
  bottomBar: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff", // Changer la couleur de fond si nécessaire
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  lottieButton: {
    //width: "100%",
    //height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: 250,
    height: 250,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
