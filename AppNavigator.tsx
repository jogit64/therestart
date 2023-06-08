import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les écrans
import CGUScreen from "./screens/Conditions/CGUScreen";
import PolitiqueScreen from "./screens/Conditions/PolitiqueScreen";
import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";

// Importer le BottomTabNavigator
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTab" // Définir l'écran par défaut
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

      {/* Écran CGUScreen */}
      <Stack.Screen
        name="CGU"
        component={CGUScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran PolitiqueScreen */}
      <Stack.Screen
        name="Politique"
        component={PolitiqueScreen}
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
