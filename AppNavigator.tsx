import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccueilScreen from "./src/unauthenticated/screens/AccueilScreen";
import LoginScreen from "./src/unauthenticated/screens/LoginScreen";
import SignUpScreen from "./src/unauthenticated/screens/SignUpScreen";
import BottomTabNavigator from "./src/authenticated/navigation/BottomTabNavigator";

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
        name="App"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
