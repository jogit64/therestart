// AuthNavigator.tsx
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les écrans
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import CGUScreen from "./screens/Conditions/CGUScreen";
import FaqScreen from "./screens/Appli/StackDemarTab/Settings/FaqScreen";
import ContactScreen from "./screens/Appli/StackDemarTab/Settings/ContactScreen";
import TutorielScreen from "./screens/Appli/StackDemarTab/Settings/TutorielScreen";
import PolitiqueScreen from "./screens/Conditions/PolitiqueScreen";

// Importer le BottomTabNavigator
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";
// import MainNavigator from "./MainNavigator";

import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";
// import SettingsNavigator from "./screens/Appli/StackDemarTab/SettingsNavigator";
import MonProfilScreen from "./screens/Appli/StackDemarTab/Settings/MonProfilScreen";

const Stack = createStackNavigator();
//console.log("le stact est :", Stack);

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

      {/* Écran CGU */}
      <Stack.Screen
        name="CGU"
        component={CGUScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran Politique */}
      <Stack.Screen
        name="Politique"
        component={PolitiqueScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

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
        //  options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran Faq */}
      <Stack.Screen
        name="Faq"
        component={FaqScreen}
        //  options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran Tuto */}
      <Stack.Screen
        name="Tuto"
        component={TutorielScreen}
        //  options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran Contact */}
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        //  options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />
    </Stack.Navigator>
  );
}
