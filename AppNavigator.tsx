import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccueilScreen from "./src/unauthenticated/screens/AccueilScreen";
import LoginScreen from "./src/unauthenticated/screens/LoginScreen";
import SignUpScreen from "./src/unauthenticated/screens/SignUpScreen";
import BottomTabNavigator from "./src/authenticated/navigation/BottomTabNavigator";

import SettingsScreen from "./src/authenticated/screens/appli/settings/SettingsScreen";
import InfosPersoScreen from "./src/authenticated/screens/appli/settings/InfosPersoScreen";
import ChangePasswordScreen from "./src/authenticated/screens/appli/settings/ChangePasswordScreen";
import MonProfilScreen from "./src/authenticated/screens/appli/settings/MonProfilScreen";
import ContactScreen from "./src/authenticated/screens/appli/settings/ContactScreen";
import FaqScreen from "./src/authenticated/screens/appli/settings/FaqScreen";
import TutorielScreen from "./src/authenticated/screens/appli/settings/TutorielScreen";

import { RootStackParamList } from "./utils/navigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Accueil">
      <Stack.Screen
        name="Accueil"
        component={AccueilScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="InfosPerso" component={InfosPersoScreen} />
      <Stack.Screen name="MonProfil" component={MonProfilScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="Tutoriel" component={TutorielScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
