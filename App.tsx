import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import UserContext, { UserProvider } from "./utils/UserContext";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

import LoadingSpinner from "./utils/LoadingSpinner";

export default function App() {
  // Charger les polices personnalisées
  const [fontsLoaded] = useFonts({
    lemon: require("./assets/fonts/lemon-regular.ttf"),
    roboto: require("./assets/fonts/roboto-regular.ttf"),
    roboto700: require("./assets/fonts/roboto-700.ttf"),
    roboto500: require("./assets/fonts/roboto-500.ttf"),
  });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }

  //   prepare();
  // }, []);

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // Si les polices ne sont pas chargées, afficher le composant de chargement
  // if (!fontsLoaded) {
  //   return <LoadingSpinner />;
  // }

  return (
    // Fournir le contexte utilisateur à tous les composants enfants
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
