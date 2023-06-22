import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";

import MaterialButtonViolet1 from "./accueil/bottompart/MaterialButtonViolet1";
import MaterialButtonViolet3 from "./accueil/bottompart/MaterialButtonViolet3";

import Swiper1 from "./accueil/swiper1/swiper1";
import Swiper2 from "./accueil/swiper2/swiper2";
import Swiper3 from "./accueil/swiper3/swiper3";

import { RootStackParamList } from "../../../utils/navigationTypes";

// Define color constants
const COLORS = {
  dot: "#dcdeeb",
  activeDot: "#6f78bd",
  gradientStart: "#e9f6ff",
  gradientEnd: "#f8fcff",
  button1Bg: "rgba(111,120,189,1)",
  button2Bg: "rgba(255,255,255,1)",
  button2Shadow: "#000",
  statusBarBg: "rgba(111,120,189,1)",
};

export default function AccueilScreen() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Accueil">>();

  return (
    <View style={styles.container}>
      {/* Swiper area */}
      <View style={{ flex: 3 }}>
        <Swiper
          showsButtons={false}
          showsPagination={true}
          dotColor={COLORS.dot}
          activeDotColor={COLORS.activeDot}
          loop={false}
        >
          {/* Each child view of Swiper represents a page */}
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="1"
          >
            <Swiper1 />
          </LinearGradient>
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="2"
          >
            <Swiper2 />
          </LinearGradient>
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            style={styles.page}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            key="3"
          >
            <Swiper3 />
          </LinearGradient>
        </Swiper>
      </View>

      {/* Button area */}
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={COLORS.statusBarBg} />
        <MaterialButtonViolet1
          style={styles.materialButtonViolet1}
          onPress={() => navigation.navigate("SignUp")}
        ></MaterialButtonViolet1>
        <MaterialButtonViolet3
          style={styles.materialButtonViolet3}
          onPress={() => navigation.navigate("Login")}
        ></MaterialButtonViolet3>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialButtonViolet1: {
    height: 55,
    width: 312,
    backgroundColor: COLORS.button1Bg,
    borderRadius: 11,
    marginTop: 5,
    alignSelf: "center",
  },
  materialButtonViolet3: {
    height: 55,
    width: 312,
    backgroundColor: COLORS.button2Bg,
    shadowColor: COLORS.button2Shadow,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 11,
    marginTop: 21,
    alignSelf: "center",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
});
