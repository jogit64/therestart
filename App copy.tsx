//************************************* */
// App.tsx
//************************************** */
//
//

// Importer les dépendances nécessaires de React
import React, { useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import UserContext, { UserProvider } from "./utils/UserContext";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AppNavigator";

import LoadingSpinner from "./utils/LoadingSpinner";

export default function App() {
  // Charger les polices personnalisées
  const [fontsLoaded] = useFonts({
    lemon: require("./assets/fonts/lemon-regular.ttf"),
    roboto: require("./assets/fonts/roboto-regular.ttf"),
    roboto700: require("./assets/fonts/roboto-700.ttf"),
    roboto500: require("./assets/fonts/roboto-500.ttf"),
  });

  // Préparer l'écran de démarrage
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // Si les polices ne sont pas chargées, ne rien afficher
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    // Fournir le contexte utilisateur à tous les composants enfants
    <UserProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
