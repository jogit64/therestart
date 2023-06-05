import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "./SettingsScreen";
import MonProfilScreen from "./MonProfilScreen";
import TutorielScreen from "./TutorielScreen";
import FaqScreen from "./FaqScreen";
import ContactScreen from "./ContactScreen";
// Importez d'autres écrans ici

//const Stack = createStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profil" component={MonProfilScreen} />
      <Stack.Screen name="Tuto" component={TutorielScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} /> */}
      {/* Ajoutez d'autres écrans ici */}
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
