import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Tab2 from "../screens/appli/Tab2";
import Tab3 from "../screens/appli/Tab3";
import Tab4 from "../screens/appli/Tab4";

//import Tab1 from "../screens/appli/Tab1";
import Tab1Navigator from "./Tab1Navigator";

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
            case "Accueil":
              iconName = focused ? "ios-home" : "ios-home-outline";
              break;
            case "Emotions":
              iconName = focused ? "ios-heart-half" : "ios-heart-half-outline";
              break;
            case "Désidentification":
              iconName = focused ? "ios-people" : "ios-people-outline";
              break;
            case "Projets":
              iconName = focused ? "ios-today" : "ios-today-outline";
              break;
            // default:
            //   iconName = "ios-home"; // or any other default icon
          }

          // Retourner le composant d'icône
          // return <Ionicons name={iconName} size={size} color={color} />;
          // Retourner le composant d'icône
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato", // Couleur de l'icône du tab actif
        tabBarInactiveTintColor: "gray", // Couleur de l'icône du tab inactif
        tabBarStyle: { display: "flex" }, // Styles appliqués à la barre de tabs
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={Tab1Navigator} // Ici vous utilisez le Stack Navigator que vous avez défini pour Tab1
        options={{ headerShown: false }} // Cacher l'en-tête pour l'écran HomeTab
      />
      <Tab.Screen name="Emotions" component={Tab2} />
      <Tab.Screen name="Désidentification" component={Tab3} />
      <Tab.Screen name="Projets" component={Tab4} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
