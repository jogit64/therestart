import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les écrans
import CGUScreen from "./screens/Conditions/CGUScreen";
import PolitiqueScreen from "./screens/Conditions/PolitiqueScreen";
//import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";

// Importer le BottomTabNavigator
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";

// Importer le SettingsNavigator
import SettingsNavigator from "./screens/Appli/StackDemarTab/SettingsNavigator";
import SettingsScreen from "./screens/Appli/StackDemarTab/SettingsScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   ...TransitionPresets.SlideFromRightIOS,
    // }}
    >
      {/* Écran BottomTabNavigator */}
      {/* <Stack.Screen
        name="HomeTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      /> */}

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

      {/* // ! Navigateur Settings */}
      <Stack.Screen
        name="SettingsNav"
        component={SettingsNavigator}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />
    </Stack.Navigator>
  );
}
