import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Tab2 from "../screens/appli/Tab2";
import Tab3 from "../screens/appli/Tab3";
import Tab4 from "../screens/appli/Tab4";

//import Tab1 from "../screens/appli/Tab1";
import Tab1Navigator from "./Tab1Navigator";

//import { StatusBarCustom } from "components/StatusBarCustom";

// Création de l'objet Tab à partir de la méthode createBottomTabNavigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // Options par défaut pour tous les écrans du Tab Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Définition de l'icône en fonction du nom de la route
          switch (route.name) {
            case "Bonjour":
              return (
                <MaterialCommunityIcons
                  name="hand-back-left"
                  size={28}
                  color={focused ? "#5b5da7" : "#b8b8b8"}
                />
              );

              break;
            case "Cultivez":
              return (
                <MaterialCommunityIcons
                  name="watering-can"
                  size={28}
                  color={focused ? "#5b5da7" : "#b8b8b8"}
                />
              );
              break;
            case "Désherbez":
              return (
                <MaterialCommunityIcons
                  name="rake"
                  size={28}
                  color={focused ? "#5b5da7" : "#b8b8b8"}
                />
              );
              break;
            case "Rêvez":
              return (
                <MaterialCommunityIcons
                  name="thought-bubble"
                  size={28}
                  color={focused ? "#5b5da7" : "#b8b8b8"}
                />
              );
              break;
            // default:
            //   iconName = "ios-home"; // or any other default icon
          }

          // Retourner le composant d'icône
          // return <Ionicons name={iconName} size={size} color={color} />;
          // Retourner le composant d'icône
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6f78bd", // Couleur de l'icône du tab actif
        tabBarInactiveTintColor: "#b8b8b8", // Couleur de l'icône du tab inactif
        tabBarStyle: { display: "flex" }, // Styles appliqués à la barre de tabs
        tabBarLabelStyle: { fontSize: 11 },
      })}
    >
      <Tab.Screen
        name="Bonjour"
        component={Tab1Navigator} // Ici vous utilisez le Stack Navigator que vous avez défini pour Tab1
        options={{ headerShown: false }} // Cacher l'en-tête pour l'écran HomeTab
      />
      <Tab.Screen
        name="Cultivez"
        component={Tab2}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Désherbez"
        component={Tab3}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Rêvez"
        component={Tab4}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
