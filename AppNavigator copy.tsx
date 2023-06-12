// AppNavigator.tsx
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les navigateurs
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";
import MainNavigator from "./MainNavigator";

import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";
import MonProfilScreen from "./screens/Appli/StackDemarTab/Settings/MonProfilScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // Utiliser l'effet de transition iOS par défaut sur toutes les plateformes
      }}
    >
      {/* Écran BottomTabNavigator */}
      <Stack.Screen
        name="HomeTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran Settings */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran MonProfil */}
      <Stack.Screen
        name="MonProfil"
        component={MonProfilScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />
    </Stack.Navigator>
  );
}
