import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import CGUScreen from "./screens/Conditions/CGUScreen";
import PolitiqueScreen from "./screens/Conditions/PolitiqueScreen";
//import DemarScreen from "./screens/Appli/DemarScreen";
import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";
//import BottomTabNavigator from "./screens/Appli/BottomTabNavigator";

//import { BottomTabNavigator } from "./screen/Appli/BottomTabNavigator";

import { UserProvider } from "./UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <UserProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS, // Utiliser l'effet de transition iOS par défaut sur toutes les plateformes
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
          name="CGU"
          component={CGUScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Politique"
          component={PolitiqueScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
        name="Demar"
        component={DemarScreen}
        options={{ headerShown: false }}
      /> */}
        {/* <Stack.Screen
          name="Demar"
          component={DemarScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </UserProvider>
  );
}

// export function BottomTabNavigator() {
//   return (
//     <Tab.Navigator initialRouteName="Demar">
//       <Stack.Screen
//         name="Demar"
//         component={DemarScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen name="Screen2" component={Screen2} />
//       <Tab.Screen name="Screen3" component={Screen3} />
//       <Tab.Screen name="Screen4" component={Screen4} />
//     </Tab.Navigator>
//   );
// }
