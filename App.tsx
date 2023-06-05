// App.tsx
//import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { StatusBar } from "expo-status-bar";

//import { Component, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
//import Toast from "react-native-toast-message";
//import Toast from "react-native-root-toast";

//import { useFonts } from "expo-font";

// import * as SplashScreen from "expo-splash-screen";

// import Swiper from "react-native-swiper";

// // * imports pour le bas
// import MaterialButtonViolet1 from "./components/screenLancement/bottompart/MaterialButtonViolet1";
// import MaterialButtonViolet3 from "./components/screenLancement/bottompart/MaterialButtonViolet3";

// // * imports pour le haut p1
// import Swiper1 from "./components/screenLancement/swiper1/swiper1";

// // * imports pour le haut p2
// import Swiper2 from "./components/screenLancement/swiper2/swiper2";

// // * imports pour le haut p3
// import Swiper3 from "./components/screenLancement/swiper3/swiper3";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "./App"; // Votre composant actuel
// import LoginScreen from "./screens/LoginScreen";
// import SignUpScreen from "./screens/SignUpScreen";

import React, { Component, useState, useEffect } from "react";
import { AppState } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home/HomeScreen"; // import your HomeScreen component
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";

//console.disableYellowBox = true;

export default function App() {
  //* ------------------------------------------------------------
  //* A CONSERVER GESTION SPLASHSCREEN ET FONTS
  //* ------------------------------------------------------------

  const [fontsLoaded] = useFonts({
    lemon: require("./assets/fonts/lemon-regular.ttf"),
    roboto: require("./assets/fonts/roboto-regular.ttf"),
    roboto700: require("./assets/fonts/roboto-700.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  //* ------------------------------------------------------------
  //* FIN DE A CONSERVER
  //* ------------------------------------------------------------

  const Stack = createStackNavigator();
  const screenWidth = Dimensions.get("window").width;

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
