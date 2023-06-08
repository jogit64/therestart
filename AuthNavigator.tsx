import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les écrans
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";

// Importer le BottomTabNavigator
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";

import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home" // Définir l'écran par défaut
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // Utiliser l'effet de transition iOS par défaut sur toutes les plateformes
      }}
    >
      {/* Écran HomeScreen */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran LoginScreen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran SignUpScreen */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran BottomTabNavigator */}
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran SettingsScreen */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />
    </Stack.Navigator>
  );
}
