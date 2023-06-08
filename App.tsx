// App.tsx

// Importer les dépendances nécessaires de React
import React, { useEffect, useContext } from "react";
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

// Importer les composants et le contexte personnalisés
//import { UserProvider, UserContext } from "./UserContext";
//import UserProvider, { UserContext } from "./UserContext";
//import { UserContext } from "./UserContext";
//import UserProvider from "./UserContext";
//import { UserProvider } from "./UserContext";
import UserContext, { UserProvider } from "./UserContext";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

import LoadingSpinner from "./LoadingSpinner";

// Désactiver temporairement les avertissements (à éviter en production)
//console.disableYellowBox = true;

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

  // Obtenir la largeur de l'écran (qui n'est pas utilisée actuellement)
  const screenWidth = Dimensions.get("window").width;

  // Rendre le composant
  return (
    // Fournir le contexte utilisateur à tous les composants enfants
    <UserProvider>
      <NavigationContainer>
        {/* Conditionally render AppNavigator or AuthNavigator based on user login status */}
        <NavigationWrapper />
      </NavigationContainer>
    </UserProvider>
  );
}

// Un composant wrapper qui utilise le UserContext
function NavigationWrapper() {
  // const { isLoggedIn } = useContext(UserContext);
  //const { isLoggedIn } = useContext(UserContext) as UserContextInterface;
  const { isLoggedIn } = useContext(UserContext) as { isLoggedIn: boolean };

  if (isLoggedIn === undefined) {
    // Handle the case where the context is null
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}
