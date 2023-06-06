import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//import WelcomeScreen from "./StackTab2/WelcomeScreen";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import DemarTab from "./DemarTab";
//import SettingsNavigator from "./StackDemarTab/SettingsNavigator";
//import SettingsNavigator from "./StackDemarTab/SettingsNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Tab2") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Tab3") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          } else if (route.name === "Tab4") {
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
        component={DemarTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Tab2" component={Tab2} />
      <Tab.Screen name="Tab3" component={Tab3} />
      <Tab.Screen name="Tab4" component={Tab4} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
