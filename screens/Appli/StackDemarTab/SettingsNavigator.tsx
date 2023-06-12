import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Importer les écrans
import MonProfilScreen from "./Settings/MonProfilScreen";
import TutorielScreen from "./Settings/TutorielScreen";
import FaqScreen from "./Settings/FaqScreen";
//import CGUScreen from "../../../screens/Conditions/CGUScreen";
import ContactScreen from "./Settings/ContactScreen";
//import PolitiqueScreen from "../../../screens/Conditions/PolitiqueScreen";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      {/* Écran MonProfilScreen */}
      <Stack.Screen
        name="MonProfil"
        component={MonProfilScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran TutorielScreen */}
      <Stack.Screen
        name="Tutoriel"
        component={TutorielScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran FaqScreen */}
      <Stack.Screen
        name="Faq"
        component={FaqScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran CGUScreen */}
      {/* <Stack.Screen
        name="CGU"
        component={CGUScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      /> */}

      {/* Écran ContactScreen */}
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      />

      {/* Écran PolitiqueScreen */}
      {/* <Stack.Screen
        name="Politique"
        component={PolitiqueScreen}
        options={{ headerShown: false }} // Cacher l'entête pour cet écran
      /> */}
    </Stack.Navigator>
  );
}
