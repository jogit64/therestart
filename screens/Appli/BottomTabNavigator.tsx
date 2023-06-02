import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "./WelcomeScreen";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";
import DemarScreen from "./DemarScreen";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Screen2") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Screen3") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          } else if (route.name === "Screen4") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          // Vous pouvez retourner n'importe quel composant ici, pas seulement Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { display: "flex" },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={DemarScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name="Screen3" component={Screen3} />
      <Tab.Screen name="Screen4" component={Screen4} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
