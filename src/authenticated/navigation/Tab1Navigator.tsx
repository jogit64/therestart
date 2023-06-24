import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

import Tab1 from "../screens/appli/Tab1";
import SettingsScreen from "../screens/appli/settings/SettingsScreen";
import InfosPersoScreen from "../screens/appli/settings/InfosPersoScreen";
import ChangePasswordScreen from "../screens/appli/settings/ChangePasswordScreen";
import MonProfilScreen from "../screens/appli/settings/MonProfilScreen";
import ContactScreen from "../screens/appli/settings/ContactScreen";
import FaqScreen from "../screens/appli/settings/FaqScreen";
import TutorielScreen from "../screens/appli/settings/TutorielScreen";

import { Tab1ParamList } from "../../../utils/navigationTypes"; // importez Tab1ParamList

const Tab1Stack = createStackNavigator<Tab1ParamList>(); // utilisez Tab1ParamList pour créer Tab1Stack

function Tab1Navigator() {
  useBackHandler(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <Tab1Stack.Navigator initialRouteName="Tab1Home">
      <Tab1Stack.Screen
        name="Tab1Home"
        component={Tab1}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="InfosPerso"
        component={InfosPersoScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="MonProfil"
        component={MonProfilScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="Faq"
        component={FaqScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="Tutoriel"
        component={TutorielScreen}
        options={{ headerShown: false }}
      />
      <Tab1Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </Tab1Stack.Navigator>
  );
}

export default Tab1Navigator;
